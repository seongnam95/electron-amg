import { ChangeEvent, useState } from 'react';
import { BsFilter, BsSearch } from 'react-icons/bs';

import { motion } from 'framer-motion';

import Button from '~/components/common/Button';
import Input from '~/components/common/Input';

import { ControlBarStyled } from './styled';

interface ControlBarProps {
  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ControlBar = ({ onSearch }: ControlBarProps) => {
  return (
    <ControlBarStyled className="ControlBar">
      <label style={{ fontSize: '20px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>전체</label>
      <div className="control-wrap">
        <Input icon={<BsSearch />} variations="fill" onChange={onSearch} />
        <Button $variations="link" $btnSize="small">
          <BsFilter size="1.8rem" />
          필터
        </Button>

        <motion.div
          key="search-btn-wrap"
          className="tool-wrap"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        ></motion.div>
      </div>
    </ControlBarStyled>
  );
};

export default ControlBar;
