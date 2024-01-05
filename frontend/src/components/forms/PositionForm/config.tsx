import { Input, InputNumber, Select, Switch, FormRule } from 'antd';

import ColorSelector from '~/components/common/ColorSelector';
import { PositionCreateBody } from '~/types/position';

export const defaultPositionValues: PositionCreateBody = {
  name: '',
  color: '#4C53FF',
  defaultEarnsIncentive: false,
  standardPay: 0,
  isLeader: false,
  incentivePay: 0,
  sortingIndex: 0,
  unitId: '',
};

const formRules: { [key: string]: FormRule[] } = {
  name: [
    {
      required: true,
      message: '',
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
      message: '',
    },
  ],
  preset: [
    {
      required: true,
      message: '',
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
      message: '',
    },
  ],
  incentivePay: [
    {
      type: 'number',
      min: 0,
      max: 20000,
      message: '',
    },
  ],
  color: [
    {
      required: true,
      message: '',
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
    name: 'standardPay',
    label: '일일 수당',
    tooltip: '근무자에게 지급할 일일 수당',
    rules: formRules.pay,
    component: (
      <InputNumber
        min={0}
        max={500000}
        style={{ width: '100%' }}
        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      />
    ),
  },
  {
    name: 'color',
    label: '구분 색상',
    component: <ColorSelector />,
  },
  {
    name: 'isLeader',
    label: '팀장',
    valuePropName: 'checked',
    component: <Switch />,
  },
  {
    name: 'defaultEarnsIncentive',
    label: '팀장 인센티브 포함',
    tooltip: '출근 시 팀장 인센티브 추가 여부',
    valuePropName: 'checked',
    component: <Switch />,
  },
  {
    name: 'incentivePay',
    label: '팀장 인센티브',
    rules: formRules.incentivePay,
    component: (
      <InputNumber
        min={0}
        max={500000}
        style={{ width: '100%' }}
        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      />
    ),
  },
];
