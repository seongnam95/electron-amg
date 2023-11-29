import { Input, InputNumber } from 'antd';

import ColorSelector from '~/components/common/ColorSelector';

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

export const formItems = [
  {
    name: 'name',
    label: '명칭',
    rules: formRules.name,
    component: <Input placeholder="(팀 이름)" />,
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
    label: '구분 색상',
    component: <ColorSelector />,
  },
];
