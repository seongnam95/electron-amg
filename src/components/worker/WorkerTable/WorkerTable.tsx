import { useEffect, useState } from 'react';

import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import clsx from 'clsx';

import { WorkerData } from '~/types/worker';

import { WorkerTableStyled } from './styled';

export interface WorkerTableProps {
  items?: WorkerData[];
  className?: string;
  onClick?: (worker: WorkerData) => void;
}

const WorkerTable = ({ items, className, onClick }: WorkerTableProps) => {
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [workers, setWorkers] = useState<WorkerData[]>(items ?? []);

  useEffect(() => setWorkers(items ?? []), [items]);

  useEffect(() => {
    setAllSelected(selectedIds.length === workers.length);
  }, [selectedIds]);

  const handleOnChangeAllChecked = (e: CheckboxChangeEvent) => {
    setSelectedIds(e.target.checked ? workers.map(worker => worker.id) : []);
  };

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
                <button onClick={() => {}}>출근</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </WorkerTableStyled>
  );
};

export default WorkerTable;
