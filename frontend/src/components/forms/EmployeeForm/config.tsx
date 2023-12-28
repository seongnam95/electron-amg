import { Flex, Input, Form, Select, Divider } from 'antd';

import FormatterInput from '~/components/common/FormatterInput';
import { HintText } from '~/components/dashboard/MonthlyAttendanceTable/styled';
import { FormItemData } from '~/types/common';
import { SalaryType } from '~/types/employee';
import { TeamData } from '~/types/team';

export const getFormConfig = (team: TeamData): FormItemData[] => {
  const positionOptions = team.positions.map(position => ({
    value: position.id,
    label: (
      <Flex align="center" justify="space-between" gap={8} style={{ paddingRight: 6 }}>
        {position.name}
        <HintText>{position.standardPay.toLocaleString()}원</HintText>
      </Flex>
    ),
  }));

  const bankOptions = [
    {
      label: '카카오',
      value: '카카오',
    },
    {
      label: '신한',
      value: '신한',
    },
  ];

  const salaryOptions = [
    { value: 1 as SalaryType, label: '일급' },
    { value: 2 as SalaryType, label: '주급' },
    { value: 3 as SalaryType, label: '월급' },
  ];

  return [
    {
      name: 'name',
      label: '이름',
      component: <Input maxLength={5} />,
    },
    {
      name: 'phone',
      label: '연락처',
      component: <FormatterInput inputType="phone" />,
    },
    {
      name: 'ssn',
      label: '주민등록번호',
      component: <FormatterInput inputType="ssn" />,
    },
    {
      label: '계좌번호',
      component: (
        <Flex vertical gap={8}>
          <Form.Item name="bank" style={{ marginBlockEnd: 0 }}>
            <Select options={bankOptions} placeholder="( 은행명 선택 )" />
          </Form.Item>
          <Form.Item name="bankNum" style={{ marginBlockEnd: 0 }}>
            <Input />
          </Form.Item>
        </Flex>
      ),
    },
    {
      name: 'divider',
      component: <Divider />,
    },
    {
      name: 'positionId',
      label: '직위',
      component: <Select options={positionOptions} />,
    },
    {
      name: 'salaryCode',
      label: '급여 형태',
      component: <Select options={salaryOptions} />,
    },
    {
      name: 'preset',
      label: '프리셋',
      tooltip: '"일일 수당 x 프리셋" 으로 계산',
      component: <FormatterInput onlyNum />,
    },
  ];
};
