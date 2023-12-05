import { Input, InputNumber } from 'antd';

import ColorSelector from '~/components/common/ColorSelector';
import { UnitCreateBody } from '~/types/unit';

export const initUnits: UnitCreateBody[] = [
  {
    name: '팀장',
    unitPay: 0,
  },
  {
    name: '일반',
    unitPay: 0,
  },
  {
    name: '기사',
    unitPay: 0,
  },
  {
    name: '홍보단',
    unitPay: 0,
  },
  {
    name: '모범',
    unitPay: 0,
  },
];

const formRules = {
  name: [
    {
      required: true,
      message: '단가 명칭은 필수입니다',
    },
    {
      min: 2,
      max: 12,
      message: '2-12글자 사이어야 합니다',
    },
  ],
  unitPay: [
    {
      required: true,
      message: '단가 금액은 필수입니다',
    },
    {
      type: 'number',
      min: 0,
      max: 500000,
      message: '최대 50만원 입력 가능',
    },
  ],
};

export const formItems = [
  {
    name: 'name',
    label: '명칭',
    rules: formRules.name,
    component: <Input spellCheck={false} placeholder="(단가 명칭)" />,
  },
  {
    name: 'unitPay',
    label: '단가',
    rules: formRules.unitPay,
    component: (
      <InputNumber
        min={0}
        style={{ width: '100%' }}
        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      />
    ),
  },
];
