import { Flex, Input, Form, Select } from 'antd';

import { FormItemData } from '~/types/common';

const bankOptions = [
  {
    label: '카카오',
    value: 'kakao',
  },
];

export const formItems: FormItemData[] = [
  {
    name: 'name',
    label: '이름',
    component: <Input maxLength={5} />,
  },
  {
    name: 'phone',
    label: '연락처',
    component: <Input addonBefore="010" maxLength={8} />,
  },
  {
    name: 'ssn',
    label: '주민등록번호',
    component: <Input maxLength={13} />,
  },
  {
    name: 'address',
    label: '거주지',
    component: <Input placeholder="( 주소 선택 )" />,
  },
  {
    label: '계좌번호',
    component: (
      <Flex vertical gap={8}>
        <Form.Item name={['bank', 'name']} style={{ marginBlockEnd: 0 }}>
          <Select options={bankOptions} placeholder="( 은행명 선택 )" />
        </Form.Item>
        <Form.Item name={['bank', 'bankNum']}>
          <Input />
        </Form.Item>
      </Flex>
    ),
  },
];
