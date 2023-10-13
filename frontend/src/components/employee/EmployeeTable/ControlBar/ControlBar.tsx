import { ChangeEvent, useState } from 'react';

import { motion } from 'framer-motion';

import Button from '~/components/common/Button';
import Input from '~/components/common/Input';

import { ControlBarStyled } from './styled';

interface ControlBarProps {
  onChangeSort?: (sort: string) => void;
  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ControlBar = ({ onChangeSort, onSearch }: ControlBarProps) => {
  const [sort, setSort] = useState<string>('default');

  const handleOnChangeSort = () => {
    const newSort = sort === 'default' ? 'name' : 'default';
    setSort(newSort);
    onChangeSort?.(newSort);
  };

  return (
    <ControlBarStyled>
      <label style={{ fontSize: '20px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>전체</label>
      <div className="control-wrap">
        <Input icon="bx-search" variations="fill" onChange={onSearch} />

        <motion.div
          key="search-btn-wrap"
          className="tool-wrap"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button $variations="link" $btnSize="small">
            <i className="bx bx-filter" />
            필터
          </Button>
          <Button $variations="link" $btnSize="small" onClick={handleOnChangeSort}>
            <i className="bx bx-sort" style={{ fontSize: '14px' }} />
            {sort === 'default' ? '등록순' : '이름순'}
          </Button>
        </motion.div>
      </div>
    </ControlBarStyled>
  );
};

export default ControlBar;
