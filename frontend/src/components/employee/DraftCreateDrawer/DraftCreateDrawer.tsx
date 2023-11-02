import { useEffect, useRef, useState } from 'react';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { BsClockHistory } from 'react-icons/bs';

import { Flex, DrawerProps, Form, Button, Select, message, Alert } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';

import AntDateRangePicker from '~/components/common/DateRangePicker';
import TeamSelector from '~/components/employee/TeamSelector';
import {
  useDraftCreate as useDraftCreateMutation,
  useDraftQuery,
} from '~/hooks/queryHooks/useDraftQuery';
import { DraftCreateBody } from '~/types/draft';
import { TeamData } from '~/types/team';

import HistoryDrawer from './HistoryDrawer';
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
  const [messageApi, contextHolder] = message.useMessage({ top: 46, maxCount: 1 });

  const linkInputRef = useRef<HTMLInputElement>(null);
  const [openHistoryDrawer, setOpenHistoryDrawer] = useState<boolean>(false);
  const [draftId, setDraftId] = useState<string>();
  const [teamId, setTeamId] = useState<string>(selectedTeamId);

  useEffect(() => setTeamId(selectedTeamId), [selectedTeamId]);

  const currentDate = dayjs();
  const lastDate = currentDate.endOf('month');
  const defaultPickerValue: [Dayjs, Dayjs] = [currentDate, lastDate];
  const selectedTeam = teams.find(team => team.id == teamId);

  // 쿼리
  const { drafts } = useDraftQuery({ teamId: teamId });
  const { createDraftMutate } = useDraftCreateMutation({ teamId: teamId });

  // 기타 핸들러
  const handleShowDraftDrawer = () => setOpenHistoryDrawer(true);
  const handleCloseDraftDrawer = () => setOpenHistoryDrawer(false);
  const resetForm = () => {
    form.resetFields();
    setDraftId(undefined);
  };

  const handleChangeTeam = (id: string) => setTeamId(id);

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

    createDraftMutate(createBody, {
      onSuccess: v => {
        setDraftId(v.result.id);
        form.resetFields();
      },
    });
  };

  const copyInputLink = (id: string) => {
    if (!linkInputRef.current) return;
    linkInputRef.current.value = `http://amgcom.site/${id}`;

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
      {...props}
    >
      <TeamSelector teams={teams} selectedTeamId={teamId} onChange={handleChangeTeam} />

      <Flex vertical justify="space-between" gap="2.4rem">
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

        <AnimatePresence>
          {!!draftId ? (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Alert
                message="생성 완료!"
                type="success"
                showIcon
                closable
                onClose={resetForm}
                action={
                  <Button size="small" type="link" onClick={() => copyInputLink(draftId)}>
                    <Flex align="center" gap="0.5rem" style={{ paddingTop: '3px' }}>
                      <AiOutlinePaperClip size="1.6rem" />
                      링크복사
                    </Flex>
                  </Button>
                }
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Flex>

      {/* 히스토리 Drawer */}
      <HistoryDrawer
        title={selectedTeam?.name}
        open={openHistoryDrawer}
        drafts={drafts}
        onClose={handleCloseDraftDrawer}
        onClickCopy={copyInputLink}
      />

      {contextHolder}
      <input ref={linkInputRef} style={{ position: 'absolute', top: '100%' }} />
    </DraftCreateDrawerStyled>
  );
};

export default DraftCreateDrawer;
