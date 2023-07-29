import { useEffect, useState } from 'react';

import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import clsx from 'clsx';
import { useRecoilState } from 'recoil';

import { workerStore } from '~/stores/worker';

import { WorkerTableStyled } from './styled';

export interface WorkerTableProps {
  className?: string;
}

const WorkerTable = ({ className }: WorkerTableProps) => {
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
          <th>나이</th>
          <th>성별</th>
          <th>연락처</th>
          <th>업체명</th>
          <th>계약서</th>
        </tr>
      </thead>
      <tbody>
        {workers.map(worker => {
          const { contract } = worker;
          return (
            <tr key={worker.id}>
              <td>
                <Checkbox
                  id={worker.id}
                  value={worker.name}
                  checked={selectedIds?.includes(worker.id)}
                  onChange={handleOnChangeChecked}
                />
              </td>
              <td>{worker.name}</td>
              <td>{worker.age}</td>
              <td>{worker.genderCode === 0 ? '남자' : '여자'}</td>
              <td>{worker.phone}</td>
              <td>{contract ? contract.company : '-'}</td>
              <td></td>
            </tr>
          );
        })}
      </tbody>
    </WorkerTableStyled>
  );
};

export default WorkerTable;
