import { useEffect, useState } from 'react';

import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import clsx from 'clsx';
import { useRecoilState } from 'recoil';

import { workerStore } from '~/stores/worker';
import { WorkerData } from '~/types/worker';

import { WorkerTableStyled } from './styled';

export interface WorkerTableProps {
  className?: string;
  onClick?: (worker: WorkerData) => void;
}

const WorkerTable = ({ className, onClick }: WorkerTableProps) => {
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [workers, setWorkers] = useRecoilState(workerStore);

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
        </tr>
      </thead>
      <tbody>
        {workers.map(worker => {
          const { contract } = worker;
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
              <td>알바</td>
            </tr>
          );
        })}
      </tbody>
    </WorkerTableStyled>
  );
};

export default WorkerTable;
