import { useRef, useState } from 'react';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { BsClockHistory } from 'react-icons/bs';

import { Drawer, DrawerProps, Form, Button, Select, Input, Space, InputRef, message } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import AntDateRangePicker from '~/components/common/DateRangePicker';
import TeamSelector from '~/components/employee/TeamSelector';
import { useDraftMutation, useDraftQuery } from '~/hooks/queryHooks/useDraftQuery';
import { DraftCreateBody, DraftData } from '~/types/draft';
import { TeamData } from '~/types/team';

import { DraftCreateDrawerStyled } from './styled';

export interface DraftCreateDrawerProps extends DrawerProps {
  teams: Array<TeamData>;
  selectedTeamId: string;
}

interface FormData {
  position: string;
  period: [Dayjs, Dayjs];
}

const DraftCreateDrawer = ({
  teams,
  selectedTeamId,
  onClose,
  ...props
}: DraftCreateDrawerProps) => {
  const [form] = Form.useForm();
  const linkInputRef = useRef<InputRef>(null);

  const [messageApi, contextHolder] = message.useMessage({ top: 46, maxCount: 1 });
  const [openHistoryDrawer, setOpenHistoryDrawer] = useState<boolean>(false);
  const [draft, setDraft] = useState<DraftData>();

  const currentDate = dayjs();
  const lastDate = currentDate.endOf('month');
  const defaultPickerValue: [Dayjs, Dayjs] = [currentDate, lastDate];

  const selectedTeam = teams.find(team => team.id == selectedTeamId);
  const { mutate } = useDraftMutation({ teamId: selectedTeamId });

  // 기타 핸들러
  const handleShowDraftDrawer = () => setOpenHistoryDrawer(true);
  const handleCloseDraftDrawer = () => setOpenHistoryDrawer(false);
  const resetForm = () => {
    form.resetFields();
    setDraft(undefined);
  };

  // 직위 변경 핸들러
  const handleChangePosition = (positionId: string) => {
    const pay = selectedTeam?.positions.find(pos => pos.id == positionId)?.unitPay;
    form.setFieldValue('unitPay', pay);
  };

  // 폼 서브밋 핸들러
  const handleFinish = (values: FormData) => {
    const createBody: DraftCreateBody = {
      positionId: values.position,
      startPeriod: values.period[0].format('YYYY-MM-DD'),
      endPeriod: values.period[1].format('YYYY-MM-DD'),
    };

    mutate(createBody, {
      onSuccess: v => {
        setDraft(v.result);
        form.resetFields();
      },
    });
  };

  const handleCopyClick = () => {
    try {
      const el = linkInputRef.current;
      el?.select();
      document.execCommand('copy');

      messageApi.open({
        type: 'success',
        content: '클립보드에 저장되었습니다.',
      });
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: `클립보드 복사에 실패했습니다. \nErr: ${err}`,
      });
    }
  };

  const RenderExtra = (
    <>
      <Button
        type="text"
        icon={<BsClockHistory size="1.8rem" />}
        onClick={handleShowDraftDrawer}
      ></Button>
    </>
  );

  const RenderFooter = (
    <Space.Compact style={{ width: '100%', padding: '1.4rem 0' }}>
      <Input ref={linkInputRef} readOnly value={`http://amgcom.site/${draft?.id}`} size="large" />
      <Button
        icon={<AiOutlinePaperClip size="2rem" style={{ paddingTop: '0.2rem' }} />}
        type="primary"
        size="large"
        onClick={handleCopyClick}
      />
    </Space.Compact>
  );

  const { Option } = Select;
  return (
    <DraftCreateDrawerStyled
      className="DraftCreateDrawer"
      closable={false}
      onClose={e => {
        resetForm();
        onClose?.(e);
      }}
      extra={RenderExtra}
      footer={!!draft && RenderFooter}
      {...props}
    >
      <TeamSelector teams={teams} selectedTeamId={selectedTeamId} />

      <Form
        form={form}
        layout="vertical"
        name="trigger"
        autoComplete="off"
        style={{ marginTop: '2.4rem' }}
        onFinish={handleFinish}
        initialValues={{
          period: defaultPickerValue,
        }}
      >
        <Form.Item
          label="직위 구분"
          name="position"
          rules={[{ required: true, message: '직위를 선택해주세요.' }]}
        >
          <Select placeholder="( 직위 선택 )" onChange={handleChangePosition}>
            {selectedTeam?.positions.map(pos => {
              return (
                <Option key={pos.id} value={pos.id}>
                  {pos.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="계약일"
          name="period"
          rules={[{ required: true, message: '계약일을 선택해주세요.' }]}
        >
          <AntDateRangePicker />
        </Form.Item>

        <Button style={{ marginTop: '2rem' }} size="large" type="primary" htmlType="submit">
          생성하기
        </Button>
      </Form>

      {/* 히스토리 Drawer */}
      <Drawer closable={false} open={openHistoryDrawer} onClose={handleCloseDraftDrawer}>
        두번째
      </Drawer>

      {contextHolder}
    </DraftCreateDrawerStyled>
  );
};

export default DraftCreateDrawer;
