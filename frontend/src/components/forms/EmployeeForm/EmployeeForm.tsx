import { ReactNode, useState } from 'react';

import { Button, Divider, Flex, Form, Input, Select, Space } from 'antd';
import clsx from 'clsx';

import { EmployeeData, EmployeeUpdateBody } from '~/types/employee';
import { TeamData } from '~/types/team';
import { UnitData } from '~/types/unit';

import { formItems } from './formConfig';
import { EmployeeFormStyled } from './styled';

export interface EmployeeFormProps {
  team: TeamData;
  employee?: EmployeeUpdateBody;
  onCancel?: () => void;
}

const EmployeeForm = ({ team, employee, onCancel }: EmployeeFormProps) => {
  const handleAddressClick = () => {};

  const initValues = {
    name: employee?.name,
    phone: employee?.phone && employee?.phone.slice(3),
    ssn: employee?.ssn,
    address: employee?.address,
    bank: {
      name: employee?.bank,
      bankNum: employee?.bankNum,
    },
    position: employee?.position?.id,
  };

  const positionOptions = team.positions.map(position => ({
    value: position.id,
    label: position.name,
  }));

  return (
    <EmployeeFormStyled className="EmployeeForm">
      <Form
        colon={false}
        labelCol={{ span: 10 }}
        initialValues={initValues}
        labelAlign="left"
        autoComplete="off"
        validateTrigger="onSubmit"
        onFinish={v => console.log(v)}
      >
        {formItems.map(item => (
          <Form.Item key={item.name} name={item.name} label={item.label}>
            {item.component}
          </Form.Item>
        ))}

        <Divider />

        <Form.Item name="position" label="직위">
          <Select options={positionOptions} />
        </Form.Item>

        <Flex gap={12}>
          <Button type="text" htmlType="button" onClick={onCancel}>
            취소
          </Button>
          <Button type="primary" htmlType="submit" block>
            저장
          </Button>
        </Flex>
      </Form>
    </EmployeeFormStyled>
  );
};

export default EmployeeForm;
