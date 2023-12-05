import { useEffect, useRef } from 'react';

import { InputRef, Form, Button, Space, Input, InputNumber } from 'antd';

import { UnitCreateBody } from '~/types/unit';

import { defaultValues, UnitFormProps } from './UnitForm';
import { initUnits } from './formConfig';

export const UnitForm = ({ values = defaultValues, submitBtnText, onSubmit }: UnitFormProps) => {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm<UnitCreateBody>();

  useEffect(() => inputFocus(), []);
  const inputFocus = () => inputRef.current?.focus();

  const handleFinish = (data: UnitCreateBody) => {
    console.log(data);
    // onSubmit?.(data);
    // form.resetFields();
    // setTimeout(() => inputFocus(), 0);
  };

  return (
    <UnitFormStyled>
      <Form form={form} initialValues={{ units: initUnits }} onFinish={handleFinish}>
        <div className="form-list">
          <Form.List name="units">
            {(fields, { add, remove }) => {
              const handleAdd = () => {
                add();
              };
              return (
                <>
                  {fields.map((field, idx) => (
                    <Space key={idx} align="baseline">
                      <Form.Item
                        name={[field.name, 'name']}
                        rules={[{ required: true, message: '명칭 입력은 필수입니다.' }]}
                      >
                        <Input placeholder="Name" />
                      </Form.Item>
                      <Form.Item
                        name={[field.name, 'unitPay']}
                        rules={[{ required: true, message: '단가 입력은 필수입니다.' }]}
                      >
                        <InputNumber placeholder="Unit Pay" />
                      </Form.Item>
                      <Button onClick={() => remove(field.name)}></Button>
                    </Space>
                  ))}
                  <Button type="dashed" onClick={handleAdd} block>
                    Add Unit
                  </Button>
                </>
              );
            }}
          </Form.List>
        </div>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </UnitFormStyled>
  );
};
