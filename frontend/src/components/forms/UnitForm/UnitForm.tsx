import { useEffect, useRef, cloneElement, useState, ReactNode } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdOutlineAdd } from 'react-icons/md';

import { InputRef, Form, Button, Flex, Space, Input, InputNumber } from 'antd';

import { UnitCreateBody } from '~/types/unit';

import { initUnits } from './formConfig';
import { UnitFormStyled } from './styled';

export interface UnitFormProps {
  values?: UnitCreateBody[];
  subBtn?: ReactNode;
  submitBtnText?: string;
  onSubmit?: (data: UnitCreateBody) => void;
}

const UnitForm = ({ values = initUnits, subBtn, submitBtnText, onSubmit }: UnitFormProps) => {
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
      <Form form={form} initialValues={{ units: values }} onFinish={handleFinish}>
        <Space direction="vertical" size={24}>
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
                          <InputNumber
                            placeholder="단가"
                            min={0}
                            style={{ width: '100%' }}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          />
                        </Form.Item>
                        <Button
                          htmlType="button"
                          type="text"
                          danger
                          icon={<FaTrash />}
                          onClick={() => remove(field.name)}
                        />
                      </Flex>
                    ))}
                  </div>
                  <Button type="dashed" onClick={handleAdd} block>
                    <MdOutlineAdd style={{ marginRight: 8 }} />
                    추가하기
                  </Button>
                </Space>
              );
            }}
          </Form.List>

          <Flex justify="end" gap={8}>
            {subBtn}
            <Button type="primary" htmlType="submit" style={{ width: '8rem' }}>
              {submitBtnText ? submitBtnText : '저장'}
            </Button>
          </Flex>
        </Space>
      </Form>
    </UnitFormStyled>
  );
};

export default UnitForm;
