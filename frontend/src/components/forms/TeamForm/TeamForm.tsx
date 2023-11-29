import { ReactNode, useEffect, useRef, cloneElement, FormEventHandler } from 'react';

import { InputRef, Form, Button, Flex, Space } from 'antd';

import { TeamUpdateBody } from '~/types/team';

import { formItems } from './teamFormConfig';

const defaultValues: TeamUpdateBody = {
  name: '',
  color: '#4C53FF',
  mealCost: 7000,
};

export interface TeamFormProps {
  values?: TeamUpdateBody;
  submitBtnText?: string;
  onSubmit?: (data: TeamUpdateBody) => void;
}

const TeamForm = ({ values = defaultValues, submitBtnText, onSubmit }: TeamFormProps) => {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm<TeamUpdateBody>();

  useEffect(() => inputFocus(), []);
  const inputFocus = () => inputRef.current?.focus();

  const handleFinish = (data: TeamUpdateBody) => {
    onSubmit?.(data);
    form.resetFields();
    setTimeout(() => inputFocus(), 0);
  };

  return (
    <Space direction="vertical">
      <Form
        form={form}
        initialValues={values}
        colon={false}
        labelCol={{ span: 12 }}
        labelAlign="left"
        autoComplete="off"
        style={{ minWidth: '34rem' }}
        onFinish={handleFinish}
      >
        {/* 아이템 렌더링 */}
        {formItems.map((item, idx) => (
          <Form.Item key={item.name} label={item.label} name={item.name} rules={item.rules}>
            {cloneElement(item.component, {
              ref: idx === 0 ? inputRef : null,
            })}
          </Form.Item>
        ))}

        {/* 서브밋 버튼 */}
        <Flex gap={8} justify="end">
          <Button type="primary" htmlType="submit" style={{ width: '8rem' }}>
            {submitBtnText ? submitBtnText : '팀 생성'}
          </Button>
        </Flex>
      </Form>
    </Space>
  );
};

export default TeamForm;
