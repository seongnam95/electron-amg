import { useState } from 'react';
import { BsClockHistory } from 'react-icons/bs';

import {
  Flex,
  Form,
  Button,
  Select,
  Space,
  Typography,
  DrawerProps,
  Skeleton,
  Drawer,
  App,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import AntDateRangePicker from '~/components/common/DateRangePicker';
import { useDraftCreateMutation } from '~/hooks/queryHooks/useDraftQuery';
import { useSoundApp } from '~/hooks/useSoundApp';
import { DraftCreateBody, DraftData } from '~/types/draft';
import { TeamData } from '~/types/team';

import DraftResultBox from './DraftResultBox/DraftResultBox';

export interface DraftCreateDrawerProps extends DrawerProps {
  team?: TeamData;
  onCopy?: (id: string) => void;
  onClose?: () => void;
  onHistory?: () => void;
}

const DraftCreateDrawer = ({
  team,
  onCopy,
  onClose,
  onHistory,
  children,
  ...props
}: DraftCreateDrawerProps) => {
  const existTeam = !!team;

  const [draft, setDraft] = useState<DraftData | undefined>();
  const [showResultBox, setShowResultBox] = useState<boolean>(false);

  const [form] = Form.useForm();
  const { soundMessage, modal } = useSoundApp();

  // DatePicker 기본 값 [ 오늘 날짜, 이번달 마지막 날짜 ]
  const currentDate = dayjs();
  const lastDate = currentDate.endOf('month');
  const defaultPickerValue: [Dayjs, Dayjs] = [currentDate, lastDate];

  const { createDraftMutate, isCreateDraftLoading } = useDraftCreateMutation({
    teamId: team?.id,
    enabled: existTeam,
  });

  // 폼 초기화
  const resetForm = () => {
    form.resetFields();
    setDraft(undefined);
    setShowResultBox(false);
  };

  // Drawer 닫기 핸들러
  const handleClose = () => {
    resetForm();
    onClose?.();
  };

  // 직위 변경 핸들러
  const handleChangePosition = (positionId: string) => {
    const pay = team?.positions.find(pos => pos.id == positionId)?.pay ?? 0;
    form.setFieldValue('unitPay', pay);
  };

  // 폼 서브밋 핸들러
  const handleFinish = (values: { position: string; period: [Dayjs, Dayjs] }) => {
    const createBody: DraftCreateBody = {
      positionId: values.position,
      startPeriod: values.period[0].format('YYYY-MM-DD'),
      endPeriod: values.period[1].format('YYYY-MM-DD'),
    };

    createDraftMutate(createBody, {
      onSuccess: draft => {
        setDraft(draft);
        setShowResultBox(true);
        form.resetFields();
      },
      onError: v => {
        soundMessage.error('생성 실패. 잠시후 다시 시도해주세요.');
      },
    });
  };

  // 결과 박스 닫기 핸들러
  const handleCloseResult = () => setShowResultBox(false);

  const RenderExtra = existTeam ? (
    <Button
      type="text"
      icon={<BsClockHistory size="1.8rem" style={{ marginTop: 2 }} />}
      onClick={onHistory}
    />
  ) : (
    <Skeleton.Button active size="small" />
  );

  const RenderTitle = existTeam ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <span
        style={{
          width: '0.7rem',
          height: '1.5rem',
          borderRadius: '0.2rem',
          backgroundColor: team?.color,
        }}
      />
      {team?.name}
    </div>
  ) : (
    <Skeleton.Input active size="small" />
  );

  const { Option } = Select;
  return (
    <Drawer
      getContainer={false}
      extra={RenderExtra}
      title={RenderTitle}
      closable={false}
      onClose={handleClose}
      {...props}
    >
      {existTeam ? (
        <Space direction="vertical" size={34} style={{ width: '100%' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Title className="view-title" level={5}>
              계약서 폼 생성
            </Typography.Title>

            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              onFinish={handleFinish}
              initialValues={{ period: defaultPickerValue }}
            >
              <Form.Item
                label="직위 구분"
                colon={false}
                name="position"
                rules={[{ required: true, message: '직위를 선택해주세요.' }]}
              >
                <Select placeholder="( 직위 선택 )" onChange={handleChangePosition}>
                  {team.positions.map(pos => {
                    return (
                      <Option key={pos.id} value={pos.id}>
                        {pos.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                colon={false}
                label="계약일"
                name="period"
                rules={[{ required: true, message: '계약일을 선택해주세요.' }]}
              >
                <AntDateRangePicker fullWidth />
              </Form.Item>

              <Flex flex={1} style={{ justifyContent: 'end' }}>
                <Button type="primary" htmlType="submit" loading={isCreateDraftLoading}>
                  생성하기
                </Button>
              </Flex>
            </Form>
          </Space>

          <DraftResultBox
            show={showResultBox}
            draft={draft}
            onCopy={onCopy}
            onClose={handleCloseResult}
          />
        </Space>
      ) : (
        <Skeleton active />
      )}
    </Drawer>
  );
};

export default DraftCreateDrawer;
