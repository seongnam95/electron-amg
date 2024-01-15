import { ReactNode } from 'react';

import {
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  Switch,
  FormInstance,
  Space,
  Select,
  Checkbox,
  Tag,
} from 'antd';
import { useRecoilValue } from 'recoil';

import { HintText } from '~/components/dashboard/MonthlyAttendanceTable/styled';
import { teamStore } from '~/stores/team';
import { AttendanceCreateBody, AttendanceUpdateBody } from '~/types/attendance';

export interface AttendanceFormProps {
  form?: FormInstance;
  description?: ReactNode;
  initValues?: AttendanceUpdateBody;
  loading?: boolean;
  extraBtn?: ReactNode;
  cancelBtnText?: string;
  submitBtnText?: string;
  onSubmit?: (data: AttendanceCreateBody) => void;
  onCancel?: () => void;
}

const defaultValues: AttendanceCreateBody = {
  positionId: 'default',
  preset: 1,
  isPrepaid: false,
  includeMealCost: false,
  otCount: 0,
  memo: '',
  earnsIncentive: false,
};

const AttendanceForm = ({
  form,
  description,
  loading,
  extraBtn,
  cancelBtnText,
  submitBtnText,
  onSubmit,
  onCancel,
}: AttendanceFormProps) => {
  const team = useRecoilValue(teamStore);

  const positionOptions = [
    {
      value: 'default',
      label: '기본 직위',
    },
    ...team.positions.map(position => ({
      value: position.id,
      label: (
        <Flex align="center" justify="space-between" gap={8} style={{ paddingRight: 6 }}>
          {position.name}
          <HintText>{position.standardPay.toLocaleString()}원</HintText>
        </Flex>
      ),
    })),
  ];

  return (
    <Flex vertical>
      <div>{description}</div>

      <Form
        form={form}
        labelCol={{ span: 10 }}
        labelAlign="left"
        colon={false}
        autoComplete="off"
        initialValues={defaultValues}
        style={{ marginTop: 24 }}
        onFinish={onSubmit}
      >
        <Form.Item label="OT" name="otCount">
          <InputNumber min={0} max={12} style={{ width: '100%' }} addonAfter="시간" />
        </Form.Item>

        <Form.Item label="직위" name="positionId">
          <Select options={positionOptions} />
        </Form.Item>

        <Form.Item label="한줄 메모" name="memo">
          <Input maxLength={20} placeholder="(일일 한줄 메모)" />
        </Form.Item>

        <Form.Item label="">
          <Flex gap={40} justify="end">
            <Form.Item label="식대 포함" name="includeMealCost" valuePropName="checked">
              <Checkbox />
            </Form.Item>

            <Form.Item label="선지급" name="isPrepaid" valuePropName="checked">
              <Checkbox />
            </Form.Item>
          </Flex>
        </Form.Item>

        <Flex justify={extraBtn ? 'space-between' : 'end'} gap={8}>
          {extraBtn}
          <Flex gap={8}>
            <Button disabled={loading} type="text" htmlType="button" onClick={onCancel}>
              {cancelBtnText ? cancelBtnText : '닫기'}
            </Button>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              style={{ padding: '0 2.4rem' }}
            >
              {submitBtnText ? submitBtnText : '저장'}
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  );
};

export default AttendanceForm;
