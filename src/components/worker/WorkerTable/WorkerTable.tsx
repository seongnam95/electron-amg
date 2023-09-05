import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { Empty } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

import Button from '~/components/common/Button';
import { useEasyQuery } from '~/hooks/queryHooks/useGroup';
import { WorkerData } from '~/types/worker';

import WorkerTableControlBar, { Sort } from './WorkerTableControlBar';
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
        return filteredWorkers.sort((a, b) => a.name.localeCompare(b.name));
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

  return (
    <WorkerTableStyled className={clsx('WorkerTable', className)}>
      {isEmpty ? (
        <div className="empty-wrap">
          <Empty description="그룹이 비었습니다" />
        </div>
      ) : (
        <>
          <WorkerTableControlBar
            onSearch={handleSearchChange}
            onChangeSort={sort => setSort(sort)}
            checked={!!selectedIds.length}
          />

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>
                    <Checkbox onChange={handleOnChangeAllChecked} checked={allSelected} />
                  </th>
                  <th>이름</th>
                  <th>연락처</th>
                  <th>구분</th>
                  <th>상태</th>
                  <th>요청</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {sortedWorkers.map(worker => {
                  return (
                    <tr key={worker.id} onClick={() => onClick?.(worker)}>
                      <td>
                        <Checkbox
                          id={worker.id}
                          value={worker.name}
                          checked={selectedIds?.includes(worker.id)}
                          onChange={handleOnChangeChecked}
                        />
                      </td>
                      <td>{worker.name}</td>
                      <td>{worker.phone}</td>

                      {/* 직원, 알바, 기사, 기타 */}
                      <td>{worker.positionCode === 0 ? '직원' : '알바'}</td>

                      {/* 고용중, 계약 종료 */}
                      <td>고용중</td>
                      <td>출근 요청</td>
                      <td>
                        <Button variations="icon" btnSize="small">
                          <i className="bx bx-dots-vertical-rounded" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
      <AnimatePresence>
        {!!selectedIds.length && (
          <motion.div
            key={groupId}
            className="edit-bar"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Button fullWidth variations="link">
              삭제
              <i className="bx bx-trash" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </WorkerTableStyled>
  );
};

export default WorkerTable;
