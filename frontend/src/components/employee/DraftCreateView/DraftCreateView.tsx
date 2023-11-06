import { useState } from 'react';
import { AiFillCheckCircle, AiOutlinePaperClip } from 'react-icons/ai';

import {
  Flex,
  Form,
  Button,
  Select,
  Space,
  Divider,
  Typography,
  Skeleton,
  Alert,
  Tag,
  Descriptions,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';

import AntDateRangePicker from '~/components/common/DateRangePicker';
import { useDraftCreate as useDraftCreateMutation } from '~/hooks/queryHooks/useDraftQuery';
import { DraftCreateBody, DraftData } from '~/types/draft';
import { POSITION_CODE } from '~/types/position';
import { TeamData } from '~/types/team';

import { DraftCreateViewStyled } from './styled';

export interface DraftCreateViewProps {
  team?: TeamData;
  onCopy?: (id: string) => void;
}

const DraftCreateView = ({ team, onCopy }: DraftCreateViewProps) => {
  if (!team) return <Skeleton active style={{ padding: '2rem' }} />;

  const [form] = Form.useForm();
  const [draft, setDraft] = useState<DraftData | undefined>();

  const currentDate = dayjs();
  const lastDate = currentDate.endOf('month');
  const defaultPickerValue: [Dayjs, Dayjs] = [currentDate, lastDate];

  // 쿼리
  const { createDraftMutate } = useDraftCreateMutation({ teamId: team.id });
  const resetForm = () => {
    form.resetFields();
    setDraft(undefined);
  };

  // 직위 변경 핸들러
  const handleChangePosition = (positionId: string) => {
    const pay = team.positions.find(pos => pos.id == positionId)?.unitPay ?? 0;
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
      onSuccess: v => {
        setDraft(v.result);
        form.resetFields();
      },
    });
  };

  const { Option } = Select;
  return (
    <DraftCreateViewStyled className="DraftCreateView">
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
            <Button type="primary" htmlType="submit">
              생성하기
            </Button>
          </Flex>
        </Form>
      </Space>

      <AnimatePresence>
        {!!draft ? (
          <motion.div
            className="result-wrap"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ marginTop: '3.4rem' }}
          >
            <Flex justify="space-between" align="center">
              <Flex align="center" gap={8}>
                <AiFillCheckCircle size={16} color="#52c41a" />
                <span>폼 생성 완료!</span>
              </Flex>

              <Button size="small" type="link">
                <Flex align="center" gap="0.5rem" style={{ paddingTop: '1px' }}>
                  <AiOutlinePaperClip size="1.6rem" />
                  링크복사
                </Flex>
              </Button>
            </Flex>
            <Divider />
            <Descriptions
              column={1}
              colon={false}
              contentStyle={{
                display: 'inline-block',
                textAlign: 'right',
              }}
            >
              <Descriptions.Item label="직위">
                {POSITION_CODE[draft.position.positionCode]}
              </Descriptions.Item>
              <Descriptions.Item label="단가">
                {draft.position.unitPay.toLocaleString()}원
              </Descriptions.Item>
              <Descriptions.Item label="계약일">
                {draft.startPeriod} ~ {draft.endPeriod}
              </Descriptions.Item>
            </Descriptions>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </DraftCreateViewStyled>
  );
};

export default DraftCreateView;
