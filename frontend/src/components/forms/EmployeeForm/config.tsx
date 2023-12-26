import { Flex, Input, Form, Select, InputNumber } from 'antd';

import FormatterInput from '~/components/common/FormatterInput';
import { FormItemData } from '~/types/common';

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

export const employeeFormConfig: FormItemData[] = [
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
];
