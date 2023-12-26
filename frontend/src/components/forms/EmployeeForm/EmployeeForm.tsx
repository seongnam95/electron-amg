import { Button, Divider, Flex, Form, Select, Tag, Typography } from 'antd';

import { HintText } from '~/components/dashboard/MonthlyAttendanceTable/styled';
import { EmployeeData, EmployeeUpdateBody } from '~/types/employee';
import { SALARY } from '~/types/position';
import { TeamData } from '~/types/team';

import { employeeFormConfig } from './config';
import { EmployeeFormStyled } from './styled';

export interface EmployeeFormProps {
  team: TeamData;
  employee?: EmployeeData;
  onSubmit?: (formData: EmployeeUpdateBody) => void;
  onCancel?: () => void;
}

const EmployeeForm = ({ team, employee, onSubmit, onCancel }: EmployeeFormProps) => {
  const initValues: EmployeeUpdateBody = {
    name: employee?.name,
    phone: employee?.phone,
    ssn: employee?.ssn,
    bank: employee?.bank,
    bankNum: employee?.bankNum,
    positionId: employee?.positionId,
  };

  const positionOptions = team.positions.map(position => ({
    value: position.id,
    label: (
      <Flex align="center" justify="space-between" gap={8} style={{ paddingRight: 6 }}>
        {position.name}
        <Flex align="center" gap={4}>
          <HintText>{position.standardPay.toLocaleString()}원</HintText>
          <Tag bordered={false} style={{ fontWeight: 'normal', marginInlineEnd: 0 }}>
            {SALARY[position.salaryCode].slice(0, 1)}
          </Tag>
        </Flex>
      </Flex>
    ),
  }));

  return (
    <EmployeeFormStyled className="EmployeeForm">
      <Form
        colon={false}
        labelCol={{ span: 9 }}
        initialValues={initValues}
        labelAlign="left"
        autoComplete="off"
        validateTrigger="onSubmit"
        onFinish={onSubmit}
      >
        <Form.Item name="positionId" label="직위">
          <Select options={positionOptions} />
        </Form.Item>

        <Divider />

        {employeeFormConfig.map((item, idx) => (
          <Form.Item key={`item-${idx}`} name={item.name} label={item.label}>
            {item.component}
          </Form.Item>
        ))}

        <Divider />

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
