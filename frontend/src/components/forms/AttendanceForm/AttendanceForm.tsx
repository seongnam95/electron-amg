import { ReactNode, useEffect } from 'react';

import { Button, Flex, Form, Input, InputNumber, Switch, FormInstance } from 'antd';

import { AttendanceUpdateBody } from '~/types/attendance';

export interface AttendanceFormProps {
  initValues?: AttendanceUpdateBody;
  loading?: boolean;
  extraBtn?: ReactNode;
  cancelBtnText?: string;
  submitBtnText?: string;
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
  initValues,
  loading,
  extraBtn,
  cancelBtnText,
  submitBtnText,
  onSubmit,
  onCancel,
}: AttendanceFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initValues) form.setFieldsValue(initValues);
    else form.setFieldsValue(defaultValues);
  }, [initValues]);

  return (
    <Form
      form={form}
      labelCol={{ span: 10 }}
      labelAlign="left"
      colon={false}
      autoComplete="off"
      style={{ marginTop: 24 }}
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
  );
};

export default AttendanceForm;
