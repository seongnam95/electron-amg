import { useState } from 'react';

import { Modal, Form, Input, InputNumber, Switch, Flex, Button } from 'antd';

import { useAttendanceUpdate } from './queryHooks/useAttendanceQuery';

interface FormData {
  includeMealCost?: boolean;
  isPaid?: boolean;
  otCount?: number;
  memo?: string;
}

export const useAttendanceUpdateModal = (teamId?: string, date?: string) => {
  const [form] = Form.useForm();
  const [attendanceIds, setAttendanceIds] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleFinish = (data: FormData) => {
    updateAttendanceMutate({ ids: attendanceIds, body: data });
  };

  const { updateAttendanceMutate, isUpdateAttendanceLoading } = useAttendanceUpdate({
    teamId: teamId,
    date: date,
    onSuccess: handleCancel,
  });

  const renderFooter = (
    <Flex justify="end">
      <Button type="text" onClick={handleCancel}>
        취소
      </Button>
      <Button type="primary" loading={isUpdateAttendanceLoading} onClick={() => form.submit()}>
        저장
      </Button>
    </Flex>
  );

  const AttendanceUpdateModal = () => (
    <Modal
      title="출근"
      width={340}
      centered
      open={open}
      onCancel={handleCancel}
      footer={renderFooter}
    >
      <Form
        form={form}
        labelCol={{ span: 10 }}
        labelAlign="left"
        colon={false}
        autoComplete="off"
        style={{ marginTop: 24 }}
        initialValues={{ mealIncluded: false, incentive: 0, prePay: 0 }}
        onFinish={handleFinish}
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
          <Input maxLength={20} />
        </Form.Item>
      </Form>
    </Modal>
  );

  const openModal = (ids: string[], values?: FormData) => {
    if (values) form.setFieldsValue(values);
    else form.resetFields();

    setAttendanceIds(ids);
    setOpen(true);
  };

  return { openModal, AttendanceUpdateModal };
};
