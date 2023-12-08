import { Button, Flex, Form, Input, InputNumber, Switch } from 'antd';

import { AttendanceUpdateBody } from '~/types/attendance';

export interface AttendanceFormProps {
  values?: AttendanceUpdateBody;
  cancelBtnText?: string;
  submitBtnText?: string;
  isLoading?: boolean;
  onSubmit?: (data: AttendanceUpdateBody) => void;
  onCancel?: () => void;
}

const defaultValues: AttendanceUpdateBody = {
  isPaid: false,
  includeMealCost: false,
  otCount: 0,
  memo: '',
};

const AttendanceForm = ({
  values,
  cancelBtnText,
  submitBtnText,
  isLoading,
  onSubmit,
  onCancel,
}: AttendanceFormProps) => {
  const [form] = Form.useForm();
  const isEditing = !!values;

  return (
    <Form
      form={form}
      labelCol={{ span: 10 }}
      labelAlign="left"
      colon={false}
      autoComplete="off"
      style={{ marginTop: 24 }}
      initialValues={values ? values : defaultValues}
      onFinish={onSubmit}
    >
      <Form.Item label="식대 포함" name="includeMealCost" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label="선지급" name="isPaid" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label="OT" name="otCount">
        <InputNumber min={0} max={12} style={{ width: '100%' }} addonAfter="시간" />
      </Form.Item>

      <Form.Item label="한줄 메모" name="memo">
        <Input maxLength={20} placeholder="(일일 한줄 메모)" />
      </Form.Item>

      <Flex justify="end" gap={8}>
        <Button disabled={isLoading} type="text" htmlType="button" onClick={onCancel}>
          {cancelBtnText ? cancelBtnText : '취소'}
        </Button>
        <Button
          loading={isLoading}
          type="primary"
          htmlType="submit"
          style={{ padding: '0 2.4rem' }}
        >
          {submitBtnText ? submitBtnText : isEditing ? '변경' : '저장'}
        </Button>
      </Flex>
    </Form>
  );
};

export default AttendanceForm;
