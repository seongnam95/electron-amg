import { MouseEvent, useEffect } from 'react';

import { Button, Flex, Form, Input, InputNumber, Modal, ModalProps, Switch } from 'antd';

import { AttendanceData } from '~/types/attendance';

export interface AttendanceEditModalProps extends ModalProps {
  attendances?: AttendanceData[];
  type?: 'single' | 'multi';
}

const AttendanceEditModal = ({
  open,
  attendances,
  onCancel,
  ...props
}: AttendanceEditModalProps) => {
  const [form] = Form.useForm();
  // const attendance = attendances.length === 1 ? attendances[0] : undefined;

  // useEffect(() => {
  //   if (attendance) {
  //     console.log('in');
  //     form.setFieldValue('meal', attendance.isMealIncluded);
  //     form.setFieldValue('incentive', attendance.incentive);
  //     form.setFieldValue('deduct', attendance.deduct);
  //     form.setFieldValue('memo', attendance.memo);
  //   }
  // }, [attendances]);

  const handleFinish = (v: any) => {
    console.log(v);
  };

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    onCancel?.(e);
  };

  const RenderFooter = (
    <Flex justify="end">
      <Button type="text" onClick={handleCancel}>
        닫기
      </Button>
      <Button type="primary" onClick={() => form.submit()}>
        저장
      </Button>
    </Flex>
  );

  return (
    // <Modal
    //   centered
    //   open={open}
    //   title="수당 변경"
    //   width={340}
    //   footer={RenderFooter}
    //   onCancel={handleCancel}
    //   {...props}
    // >
    <Form
      form={form}
      labelCol={{ span: 7 }}
      labelAlign="left"
      colon={false}
      autoComplete="off"
      style={{ marginTop: 24 }}
      initialValues={{ meal: false, incentive: 0, deduct: 0 }}
      onFinish={handleFinish}
    >
      <Form.Item label="식대 포함" name="meal" valuePropName="checked">
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

      <Form.Item label="페널티" name="deduct">
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
    // </Modal>
  );
};

export default AttendanceEditModal;
