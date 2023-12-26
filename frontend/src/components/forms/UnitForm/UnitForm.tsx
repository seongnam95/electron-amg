import { useEffect, useRef } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdOutlineAdd } from 'react-icons/md';

import { InputRef, Form, Button, Flex, Space, Input, InputNumber } from 'antd';

import { UnitCreateBody } from '~/types/unit';

import { initUnits } from './config';
import { UnitFormStyled } from './styled';

export interface UnitFormProps {
  values?: UnitCreateBody[];
  cancelBtnText?: string;
  submitBtnText?: string;
  isLoading?: boolean;
  onSubmit?: (data: UnitCreateBody[]) => void;
  onChange?: (data: UnitCreateBody[]) => void;
  onCancel?: () => void;
}

const UnitForm = ({
  values = initUnits,
  cancelBtnText,
  submitBtnText,
  isLoading,
  onSubmit,
  onChange,
  onCancel,
}: UnitFormProps) => {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm<{ units: UnitCreateBody[] }>();

  useEffect(() => inputFocus(), []);
  const inputFocus = () => inputRef.current?.focus();
  const handleFinish = (data: { units: UnitCreateBody[] }) => onSubmit?.(data.units);
  const handleChange = () => onChange?.(form.getFieldValue('units'));

  return (
    <UnitFormStyled>
      <Form
        form={form}
        initialValues={{ units: values }}
        onFinish={handleFinish}
        disabled={isLoading}
        validateTrigger="onSubmit"
        onChange={handleChange}
      >
        <Space direction="vertical" size={24}>
          <Form.List name="units">
            {(fields, { add, remove }) => {
              const handleAdd = () => {
                add();
                handleChange();
              };

              const handleRemove = (fieldIdx: number) => {
                remove(fieldIdx);
                handleChange();
              };

              return (
                <Space direction="vertical" size={24}>
                  <div className="form-list">
                    {fields.map((field, idx) => (
                      <Flex className="item-wrap" key={idx} gap={8} align="center">
                        <Form.Item
                          name={[field.name, 'name']}
                          rules={[{ required: true, message: '' }]}
                        >
                          <Input
                            placeholder="(명칭)"
                            style={{ width: '12rem' }}
                            readOnly={idx === 0}
                          />
                        </Form.Item>
                        <Form.Item
                          name={[field.name, 'unitPay']}
                          rules={[{ required: true, message: '' }]}
                        >
                          <InputNumber
                            placeholder="(단가)"
                            min={0}
                            style={{ width: '100%' }}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          />
                        </Form.Item>
                        <Button
                          htmlType="button"
                          disabled={idx === 0}
                          type="text"
                          danger
                          icon={<FaTrash />}
                          onClick={() => handleRemove(field.name)}
                        />
                      </Flex>
                    ))}
                    <Button
                      type="dashed"
                      onClick={handleAdd}
                      disabled={isLoading}
                      block
                      style={{ marginTop: 8 }}
                    >
                      <MdOutlineAdd style={{ marginRight: 8 }} />
                      추가하기
                    </Button>
                  </div>
                </Space>
              );
            }}
          </Form.List>

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
              {submitBtnText ? submitBtnText : '저장'}
            </Button>
          </Flex>
        </Space>
      </Form>
    </UnitFormStyled>
  );
};

export default UnitForm;
