import { Button, Divider, Flex, Form, FormInstance, Select, Tag, Typography } from 'antd';

import { HintText } from '~/components/dashboard/MonthlyAttendanceTable/styled';
import { EmployeeData, EmployeeUpdateBody } from '~/types/employee';
import { SALARY } from '~/types/position';
import { TeamData } from '~/types/team';

import { employeeFormConfig } from './config';
import { EmployeeFormStyled } from './styled';

export interface EmployeeFormProps {
  team: TeamData;
  employee?: EmployeeData;
  form?: FormInstance;
  loading?: boolean;
  onSubmit?: (formData: EmployeeUpdateBody) => void;
  onCancel?: () => void;
}

const EmployeeForm = ({
  team,
  employee,
  loading,
  form = Form.useForm<EmployeeUpdateBody>()[0],
  onSubmit,
  onCancel,
}: EmployeeFormProps) => {
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
        form={form}
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
          <Button type="text" htmlType="button" onClick={onCancel} disabled={loading}>
            취소
          </Button>
          <Button type="primary" htmlType="submit" block loading={loading}>
            저장
          </Button>
        </Flex>
      </Form>
    </EmployeeFormStyled>
  );
};

export default EmployeeForm;
