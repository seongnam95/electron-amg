import { useEffect, useState } from 'react';

import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import clsx from 'clsx';
import { useRecoilValue } from 'recoil';

import Button from '~/components/common/Button';
import { groupState } from '~/stores/group';
import { WorkerData } from '~/types/worker';

import { WorkerTableStyled } from './styled';

export interface WorkerTableProps {
  allWorker?: boolean;
  items?: WorkerData[];
  className?: string;
  onClick?: (worker: WorkerData) => void;
}

const WorkerTable = ({ items, allWorker, className, onClick }: WorkerTableProps) => {
  const groups = useRecoilValue(groupState);

  const [workers, setWorkers] = useState<WorkerData[]>(items ?? []);
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => setWorkers(items ?? []), [items]);

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
          const color = groups.find(group => group.id === worker.groupId)?.hexColor;

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
              <td>
                {allWorker && (
                  <span className="group-color-bar" style={{ backgroundColor: color }} />
                )}
                {worker.name}
              </td>
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
    </WorkerTableStyled>
  );
};

export default WorkerTable;
