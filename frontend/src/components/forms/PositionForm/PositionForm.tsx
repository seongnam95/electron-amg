import { useEffect, useRef } from 'react';
import { MdOutlineAdd } from 'react-icons/md';

import { Button, Form, Input, InputNumber, InputRef, Select, Switch } from 'antd';
import { FormInstance } from 'antd/lib';

import ColorSelector from '~/components/common/ColorSelector';
import { PositionCreateBody } from '~/types/position';

const formRules = {
  name: [
    {
      required: true,
      message: '직위명은 필수입니다',
    },
    {
      min: 2,
      max: 5,
      message: '2-5글자 사이어야 합니다',
    },
  ],
  salary: [
    {
      required: true,
      message: '급여 선택은 필수입니다',
    },
  ],
  pay: [
    {
      required: true,
      message: '단가 입력은 필수입니다',
    },
  ],
  color: [
    {
      required: true,
      message: '색상 선택은 필수입니다',
    },
  ],
};

const defaultValues: PositionCreateBody = {
  name: '',
  color: '#4C53FF',
  salaryCode: 1,
  isChild: false,
  standardPay: 0,
};

export interface PositionFormProps {
  form?: FormInstance;
  initialValues?: Partial<PositionCreateBody>;
  onSubmit?: (data: PositionCreateBody) => void;
}

const PositionForm = ({ form, initialValues, onSubmit }: PositionFormProps) => {
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    console.log(initialValues);
    if (initialValues) {
      console.log(initialValues);
      form?.setFieldsValue(['name', 'test']);
    }
    focusNameInput();
  }, [initialValues]);

  const focusNameInput = () => inputRef.current?.focus();

  const handleFinish = (data: PositionCreateBody) => {
    form?.resetFields();
    onSubmit?.(data);
    setTimeout(() => focusNameInput(), 0);
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      colon={false}
      labelCol={{ span: 12 }}
      labelAlign="left"
      autoComplete="off"
      onFinish={handleFinish}
      style={{ minWidth: '30rem' }}
    >
      {/* 직위 명칭 */}
      <Form.Item label="직위 명칭" name="name" rules={formRules.name}>
        <Input ref={inputRef} placeholder="(직위명)" />
      </Form.Item>

      {/* 급여 */}
      <Form.Item label="급여" name="salaryCode" rules={formRules.salary}>
        <Select
          options={[
            { label: '일급', value: 1 },
            { label: '주급', value: 2 },
            { label: '월급', value: 3 },
          ]}
        />
      </Form.Item>

      {/* 단가 */}
      <Form.Item label="단가" name="standardPay" rules={formRules.pay}>
        <InputNumber style={{ width: '100%' }} min={0} />
      </Form.Item>

      {/* 팀 구분 색상 */}
      <Form.Item label="직위 구분 색상" name="color" rules={formRules.color}>
        <ColorSelector onChange={color => form?.setFieldValue('color', color)} />
      </Form.Item>

      {/* 팀장 인센 포함 */}
      <Form.Item label="팀장 인센티브 포함" name="isChild" required>
        <Switch />
      </Form.Item>

      <Button type="text" htmlType="submit" style={{ width: '100%', color: '#326CF9' }}>
        추가 <MdOutlineAdd />
      </Button>
    </Form>
  );
};

export default PositionForm;
