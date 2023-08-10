import { ReactNode, useState } from 'react';

import { Radio } from 'antd';
import clsx from 'clsx';

import { WorkerControlBarStyled } from './styled';

export interface WorkerControlBarProps {
  className?: string;
}

const WorkerControlBar = ({ className }: WorkerControlBarProps) => {
  const [contractValue, setContractValue] = useState<string>('ing');
  const ContractOption = [
    { label: '계약중', value: 'ing' },
    { label: '계약종료', value: 'end' },
  ];

  return (
    <WorkerControlBarStyled className={clsx('WorkerControlBar', className)}>
      <Radio.Group
        value={contractValue}
        className="radio-group"
        options={ContractOption}
        optionType="button"
        buttonStyle="solid"
        onChange={e => setContractValue(e.target.value)}
      />
    </WorkerControlBarStyled>
  );
};

export default WorkerControlBar;
