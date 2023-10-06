import { ChangeEvent, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import Button from '~/components/common/Button';
import Input from '~/components/common/Input';

import { StyledEmployeeTableControlBar } from './styled';

interface EmployeeTableControlBarProps {
  checked: boolean;
  onMoveGroup: () => void;
  onChangeSort: (sort: Sort) => void;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

export enum Sort {
  NORMAL = 'normal',
  NAME = 'name',
}

const EmployeeTableControlBar = ({
  checked,
  onMoveGroup,
  onChangeSort,
  onSearch,
}: EmployeeTableControlBarProps) => {
  const [sort, setSort] = useState<Sort>(Sort.NORMAL);

  const handleOnChangeSort = () => {
    const newSort = sort === Sort.NORMAL ? Sort.NAME : Sort.NORMAL;
    setSort(newSort);
    onChangeSort(newSort);
  };

  return (
    <StyledEmployeeTableControlBar>
      <Input icon="bx-search" variations="fill" onChange={onSearch} />

      <AnimatePresence>
        {!checked && (
          <motion.div
            key="search-btn-wrap"
            className="section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: -10 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Button $variations="link" $btnSize="small">
              <i className="bx bx-filter" />
              필터
            </Button>
            <Button $variations="link" $btnSize="small" onClick={handleOnChangeSort}>
              <i className="bx bx-sort" style={{ fontSize: '14px' }} />
              {sort === Sort.NORMAL ? '기본순' : '이름순'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {checked && (
          <motion.div
            key="checked-tool"
            className="section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, width: 'auto' }}
            exit={{ opacity: 0, width: '0px' }}
            transition={{ duration: 0.2 }}
          >
            <Button $btnSize="small" onClick={onMoveGroup}>
              그룹 이동
            </Button>
            <Button $btnSize="small">출근</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </StyledEmployeeTableControlBar>
  );
};

export default EmployeeTableControlBar;
