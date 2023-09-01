import { useEffect, useState } from 'react';

import { Empty } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import Button from '~/components/common/Button';
import { useEasyQuery } from '~/hooks/queryHooks/useGroup';
import { WorkerData } from '~/types/worker';

import { WorkerTableStyled } from './styled';

export interface WorkerTableProps {
  groupId: string;
  className?: string;
  onClick?: (worker: WorkerData) => void;
}

const WorkerTable = ({ groupId, className, onClick }: WorkerTableProps) => {
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const isChecked = !!selectedIds.length;

  const url =
    groupId === 'all'
      ? import.meta.env.VITE_WORKER_API_URL
      : groupId === 'etc'
      ? `${import.meta.env.VITE_WORKER_API_URL}un/`
      : `${import.meta.env.VITE_GROUP_API_URL}${groupId}${import.meta.env.VITE_WORKER_API_URL}`;

  const { data: workers = [] } = useEasyQuery<WorkerData>(['workers', groupId], url);
  const isEmpty = workers.length === 0;

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

  return (
    <WorkerTableStyled className={clsx('WorkerTable', className)}>
      {isEmpty ? (
        <div className="empty-wrap">
          <Empty description="그룹이 비었습니다" />
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>
                <Checkbox onChange={handleOnChangeAllChecked} checked={allSelected} />
              </th>
              <th>성명</th>
              <th>연락처</th>
              <th>구분</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {workers.map(worker => {
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
                  <td>{worker.positionCode === 0 ? '직원' : '알바'}</td>
                  <td>
                    <Button styled={{ variations: 'link' }} onClick={() => {}}>
                      출근
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {isChecked && (
        <motion.div
          key={'groupId'}
          className="edit-bar"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button styled={{ fullWidth: true, variations: 'link', animate: false }}>
            삭제
            <i className="bx bx-trash" />
          </Button>
        </motion.div>
      )}
    </WorkerTableStyled>
  );
};

export default WorkerTable;
