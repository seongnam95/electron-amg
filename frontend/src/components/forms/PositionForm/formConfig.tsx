import { Input, InputNumber, Select, Switch, FormRule } from 'antd';

import ColorSelector from '~/components/common/ColorSelector';
import { PositionCreateBody } from '~/types/position';

export const defaultPositionValues: PositionCreateBody = {
  name: '',
  color: '#4C53FF',
  salaryCode: 1,
  defaultEarnsIncentive: false,
  standardPay: 0,
  isLeader: false,
  incentive: 0,
  sortingIndex: 0,
  preset: 1,
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
  incentive: [
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

interface GetFormItemsOptions {
  existLeader: boolean;
  isMonthly: boolean;
}

export const getFormItems = ({}: GetFormItemsOptions) => {
  const salaryOptions = [
    { label: '일급', value: 1 },
    { label: '주급', value: 2 },
    { label: '월급', value: 3 },
  ];

  return [
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
      component: <Select options={salaryOptions} />,
    },
    {
      name: 'preset',
      label: '프리셋',
      tooltip: '"일일 수당 x 프리셋" 으로 계산',
      rules: formRules.preset,
      component: (
        <InputNumber
          min={0}
          style={{ width: '100%' }}
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        />
      ),
    },
    {
      name: 'standardPay',
      label: '일일 수당',
      tooltip: '직원에게 지급할 일일 수당',
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
      name: 'incentive',
      label: '팀장 인센티브',
      rules: formRules.incentive,
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
};
