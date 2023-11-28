import { ReactNode, useEffect, useRef, useState } from 'react';

import { InputRef, Form, InputNumber, Input, FormInstance, Button, Space, Flex } from 'antd';
import { useRecoilValue } from 'recoil';

import ColorSelector from '~/components/common/ColorSelector';
import { useTeamCreateMutation, useTeamUpdateMutation } from '~/hooks/queryHooks/useTeamQuery';
import { userStore } from '~/stores/user';
import { TeamCreateBody, TeamData } from '~/types/team';

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

const defaultValues: Partial<TeamData> = {
  name: '',
  color: '#4C53FF',
  mealCost: 7000,
};

export interface TeamFormProps {
  values?: Partial<TeamData>;
  footer?: ReactNode;
  onSubmit?: (data: Partial<TeamData>) => void;
}

const TeamForm = ({ values, footer, onSubmit }: TeamFormProps) => {
  const inputRef = useRef<InputRef>(null);
  const { user } = useRecoilValue(userStore);
  const [form] = Form.useForm();

  useEffect(() => {
    inputRef.current?.focus();
    if (values) {
      const { name, mealCost, color } = values;
      form.setFieldsValue({
        name: name,
        mealCost: mealCost,
        color: color,
      });
    }
  }, [values]);

  const { createTeamMutate, isCreateTeamLoading } = useTeamCreateMutation({
    userId: user.id,
    onSuccess: onSubmit,
  });

  const { updateTeamMutate, isUpdateTeamLoading } = useTeamUpdateMutation({
    userId: user.id,
    teamId: values?.id,
    enabled: !!values,
    onSuccess: onSubmit,
  });

  const handleFinish = (data: TeamCreateBody) => {
    if (values) updateTeamMutate(data);
    else createTeamMutate(data);

    // form.resetFields();
  };

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
    <Space>
      <Form
        form={form}
        initialValues={defaultValues}
        colon={false}
        labelCol={{ span: 12 }}
        labelAlign="left"
        autoComplete="off"
        onFinish={handleFinish}
        style={{ minWidth: '34rem' }}
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
            <Button
              type="primary"
              htmlType="submit"
              loading={isCreateTeamLoading || isUpdateTeamLoading}
            >
              팀 생성
            </Button>
          )}
        </Flex>
      </Form>
    </Space>
  );
};

export default TeamForm;
