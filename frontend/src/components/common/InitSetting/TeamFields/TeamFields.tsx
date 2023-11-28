import { useRef, useEffect } from 'react';

import { InputRef, ColorPicker, Form, Input, InputNumber, FormInstance } from 'antd';

interface CreateTeamFormData {
  name?: string;
  teamColor?: string;
  mealCost?: number;
}

const TeamFields = ({ form }: { form: FormInstance }) => {
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [inputRef]);

  const handleFinish = (data: CreateTeamFormData) => {};

  const formDefaultValues: CreateTeamFormData = {
    name: '',
    mealCost: 7000,
  };

  return (
    <Form
      form={form}
      colon={false}
      labelCol={{ span: 12 }}
      labelAlign="left"
      autoComplete="off"
      initialValues={formDefaultValues}
      onFinish={handleFinish}
    >
      {/* 업체 명칭 */}
      <Form.Item
        label="명칭"
        name="name"
        rules={[
          {
            required: true,
            message: '업체명은 필수입니다',
          },
          {
            min: 2,
            max: 12,
            message: '2-12글자 사이어야 합니다',
          },
        ]}
      >
        <Input ref={inputRef} placeholder="(업체명)" />
      </Form.Item>

      {/* 식대 */}
      <Form.Item
        label="식대"
        name="mealCost"
        rules={[
          {
            required: true,
            message: '식대 입력은 필수입니다.',
          },
        ]}
      >
        <InputNumber style={{ width: '100%' }} min={0} />
      </Form.Item>

      {/* 팀 구분 색상 */}
      <Form.Item
        label="팀 구분 색상"
        name="color"
        rules={[
          {
            required: true,
            message: '팀 색상은 필수입니다.',
          },
        ]}
      >
        <ColorPicker defaultFormat="rgb" />
      </Form.Item>
    </Form>
  );
};

export default TeamFields;
