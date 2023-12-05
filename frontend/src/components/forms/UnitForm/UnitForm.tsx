import { useEffect, useRef, cloneElement, useState } from 'react';

import { InputRef, Form, Button, Flex, Space, Input, InputNumber } from 'antd';

import { UnitCreateBody } from '~/types/unit';

import { formItems, initUnits } from './formConfig';
import { UnitFormStyled } from './styled';

const defaultValues: UnitCreateBody = {
  name: '',
  unitPay: 0,
};

export interface UnitFormProps {
  values?: UnitCreateBody;
  submitBtnText?: string;
  onSubmit?: (data: UnitCreateBody) => void;
}

const UnitForm = ({ values = defaultValues, submitBtnText, onSubmit }: UnitFormProps) => {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm<UnitCreateBody>();

  useEffect(() => inputFocus(), []);
  const inputFocus = () => inputRef.current?.focus();

  const handleFinish = (data: UnitCreateBody) => {
    console.log(data);
    onSubmit?.(data);
    // form.resetFields();
    // setTimeout(() => inputFocus(), 0);
  };

  return (
    <UnitFormStyled>
      <Form form={form} initialValues={{ units: initUnits }} onFinish={handleFinish}>
        <Form.List name="units">
          {(fields, { add, remove }) => {
            const handleAdd = () => {
              add();
            };
            return (
              <Space direction="vertical" size={34}>
                <div className="form-list">
                  {fields.map((field, idx) => (
                    <Flex className="item-wrap" key={idx} gap={8} align="center">
                      <Form.Item
                        name={[field.name, 'name']}
                        rules={[{ required: true, message: '명칭 입력은 필수입니다.' }]}
                      >
                        <Input placeholder="Name" style={{ width: '12rem' }} />
                      </Form.Item>
                      <Form.Item
                        name={[field.name, 'unitPay']}
                        rules={[{ required: true, message: '단가 입력은 필수입니다.' }]}
                      >
                        <InputNumber placeholder="Unit Pay" style={{ width: '12rem' }} />
                      </Form.Item>
                      <Button onClick={() => remove(field.name)}></Button>
                    </Flex>
                  ))}
                </div>
                <Button type="dashed" onClick={handleAdd} block>
                  단가 추가
                </Button>
              </Space>
            );
          }}
        </Form.List>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </UnitFormStyled>
  );
};

export default UnitForm;
