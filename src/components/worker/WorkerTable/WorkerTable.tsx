import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { Empty } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

import Button from '~/components/common/Button';
import { GroupRequestBody, useEasyMutation, useEasyQuery } from '~/hooks/queryHooks/useGroup';
import { WorkerData } from '~/types/worker';

import WorkerTableControlBar, { Sort } from './WorkerTableControlBar';
import WorkerListItem from './WorkerTableItem';
import { WorkerTableStyled } from './styled';

export interface WorkerTableProps {
  groupId: string;
  className?: string;
  onClick?: (worker: WorkerData) => void;
}

const WorkerTable = ({ groupId, className, onClick }: WorkerTableProps) => {
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>(Sort.NORMAL);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const url =
    groupId === 'all'
      ? import.meta.env.VITE_WORKER_API_URL
      : groupId === 'etc'
      ? `${import.meta.env.VITE_WORKER_API_URL}un/`
      : `${import.meta.env.VITE_GROUP_API_URL}${groupId}${import.meta.env.VITE_WORKER_API_URL}`;

  const { updateMutate } = useEasyMutation<GroupRequestBody>(
    ['group'],
    import.meta.env.VITE_GROUP_API_URL,
  );
  const { data: workers = [] } = useEasyQuery<WorkerData>(['workers', groupId], url);
  const isEmpty = workers.length === 0;

  const sortedWorkers = useMemo(() => {
    let filteredWorkers = workers;

    if (searchTerm) {
      filteredWorkers = filteredWorkers.filter(
        worker =>
          worker.name.includes(searchTerm) ||
          worker.residence.includes(searchTerm) ||
          worker.phone.includes(searchTerm),
      );
    }

    switch (sort) {
      case Sort.NAME:
        return [...filteredWorkers].sort((a, b) => a.name.localeCompare(b.name));
      case Sort.NORMAL:
      default:
        return filteredWorkers;
    }
  }, [workers, searchTerm, sort]);

  // 단일 체크박스 기준 전체 체크박스 활성화/비활성화
  useEffect(() => {
    setAllSelected(selectedIds.length === workers.length);
  }, [selectedIds]);

  // 전체 체크박스 클릭 핸들러
  const handleOnChangeAllChecked = (e: CheckboxChangeEvent) => {
    setSelectedIds(e.target.checked ? workers.map(worker => worker.id) : []);
  };

  // 체크박스 클릭 핸들러
  const handleOnChangeChecked = (e: CheckboxChangeEvent) => {
    const targetId = e.target.id;

    if (targetId) {
      setSelectedIds(
        selectedIds.includes(targetId)
          ? selectedIds.filter(item => item !== targetId)
          : [...selectedIds, targetId],
      );
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleMoveGroup = () => {};

  return (
    <WorkerTableStyled className={clsx('WorkerTable', className)}>
      {isEmpty ? (
        <div className="empty-wrap">
          <Empty description="그룹이 비었습니다" />
        </div>
      ) : (
        <>
          <WorkerTableControlBar
            onMoveGroup={handleMoveGroup}
            onSearch={handleSearchChange}
            onChangeSort={sort => setSort(sort)}
            checked={!!selectedIds.length}
          />

          <ul className="worker-list">
            {sortedWorkers.map(worker => {
              return (
                <WorkerListItem
                  key={worker.id}
                  worker={worker}
                  checked={selectedIds.includes(worker.id)}
                  onChecked={handleOnChangeChecked}
                />
              );
            })}
          </ul>
        </>
      )}
    </WorkerTableStyled>
  );
};

export default WorkerTable;
