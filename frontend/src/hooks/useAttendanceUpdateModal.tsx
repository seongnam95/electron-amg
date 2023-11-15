import { useState } from 'react';

import { Modal, Form, Input, InputNumber, Switch, Flex, Button } from 'antd';

import { useAttendanceUpdateMutation } from './queryHooks/useAttendanceQuery';

interface FormData {
  isMealIncluded?: boolean;
  incentive?: number;
  deduct?: number;
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

  const { updateAttendanceMutate, isUpdateAttendanceLoading } = useAttendanceUpdateMutation({
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

  const contextHolder = (
    <Modal
      title="수당 변경"
      width={340}
      centered
      open={open}
      onCancel={handleCancel}
      footer={renderFooter}
    >
      <Form
        form={form}
        labelCol={{ span: 7 }}
        labelAlign="left"
        colon={false}
        autoComplete="off"
        style={{ marginTop: 24 }}
        initialValues={{ isMealIncluded: false, incentive: 0, deduct: 0 }}
        onFinish={handleFinish}
      >
        <Form.Item label="식대 포함" name="isMealIncluded" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="인센티브" name="incentive">
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            addonBefore="+"
            addonAfter="원"
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Form.Item>

        <Form.Item label="공제" name="deduct">
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            addonBefore="-"
            addonAfter="원"
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
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

  return { openModal, contextHolder };
};
