import { ReactNode, useEffect, useRef } from 'react';

import { InputRef, Form, InputNumber, Input, Button, Flex, FormProps } from 'antd';

import ColorSelector from '~/components/common/ColorSelector';
import { TeamData } from '~/types/team';

export type TeamFormData = Partial<Omit<TeamData, 'createDate' | 'positions'>>;

const formRules = {
  name: [
    {
      required: true,
      message: '팀 명칭은 필수입니다',
    },
    {
      min: 2,
      max: 12,
      message: '2-12글자 사이어야 합니다',
    },
  ],
  mealCost: [
    {
      required: true,
      message: '식대 입력은 필수입니다.',
    },
  ],
  color: [
    {
      required: true,
      message: '팀 색상은 필수입니다.',
    },
  ],
};

const defaultValues: TeamFormData = {
  name: '',
  color: '#4C53FF',
  mealCost: 7000,
};

export interface TeamFormProps extends FormProps {
  values?: TeamFormData;
  footer?: ReactNode;
}

const TeamForm = ({ values, footer, ...props }: TeamFormProps) => {
  const inputRef = useRef<InputRef>(null);
  useEffect(() => inputRef.current?.focus(), []);

  const formItems = [
    {
      name: 'name',
      label: '명칭',
      ref: inputRef,
      rules: formRules.name,
      component: <Input ref={inputRef} placeholder="(팀 이름)" />,
    },
    {
      name: 'mealCost',
      label: '식대',
      rules: formRules.mealCost,
      component: (
        <InputNumber
          min={0}
          style={{ width: '100%' }}
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        />
      ),
    },
    {
      name: 'color',
      label: '팀 구분 색상',
      component: <ColorSelector />,
    },
  ];

  return (
    <Form
      initialValues={defaultValues}
      colon={false}
      labelCol={{ span: 12 }}
      labelAlign="left"
      autoComplete="off"
      style={{ minWidth: '34rem' }}
      {...props}
    >
      {/* 아이템 렌더링 */}
      {formItems.map(item => (
        <Form.Item key={item.name} label={item.label} name={item.name} rules={item.rules}>
          {item.component}
        </Form.Item>
      ))}

      {/* 서브밋 버튼 */}
      <Flex justify="end" style={{ marginTop: '3rem' }}>
        {footer ? (
          footer
        ) : (
          <Button type="primary" htmlType="submit">
            팀 생성
          </Button>
        )}
      </Flex>
    </Form>
  );
};

export default TeamForm;
