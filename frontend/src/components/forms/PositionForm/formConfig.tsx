import { Input, InputNumber, Select, Switch, FormRule } from 'antd';

import ColorSelector from '~/components/common/ColorSelector';

const formRules: { [key: string]: FormRule[] } = {
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
      type: 'number',
      min: 0,
      max: 500000,
      message: '최대 50만원 입력 가능',
    },
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

export const formItems = [
  {
    name: 'name',
    label: '명칭',
    rules: formRules.name,
    component: <Input spellCheck={false} placeholder="(직위 명칭)" />,
  },
  {
    name: 'salaryCode',
    label: '급여',
    rules: formRules.salary,
    component: (
      <Select
        options={[
          { label: '일급', value: 1 },
          { label: '주급', value: 2 },
          { label: '월급', value: 3 },
        ]}
      />
    ),
  },
  {
    name: 'standardPay',
    label: '단가',
    rules: formRules.pay,
    component: (
      <InputNumber
        min={0}
        max={200000}
        style={{ width: '100%' }}
        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      />
    ),
  },
  // {
  //   name: 'preset',
  //   label: '프리셋',
  //   rules: formRules.pay,
  //   component: (
  //     <InputNumber
  //       min={1}
  //       max={30}
  //       style={{ width: '100%' }}
  //       formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
  //     />
  //   ),
  // },
  {
    name: 'color',
    label: '구분 색상',
    component: <ColorSelector />,
  },
  {
    name: 'isChild',
    label: '팀장 인센티브 포함',
    valuePropName: 'checked',
    component: <Switch />,
  },
];
