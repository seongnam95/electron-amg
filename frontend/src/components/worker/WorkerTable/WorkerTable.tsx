import { useEffect, useMemo, useState } from 'react';

import { Empty, Skeleton } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import clsx from 'clsx';

import { useWorkerQuery } from '~/hooks/queryHooks/useWorkerQuery';
import { WorkerData } from '~/types/worker';

import WorkerGroupMoveModal from '../WorkerGroupMoveModal';
import WorkerTableControlBar, { Sort } from './WorkerTableControlBar';
import WorkerListItem from './WorkerTableItem';
import { WorkerTableStyled } from './styled';

export interface WorkerTableProps {
  groupId: string;
  className?: string;
  onClick?: (worker: WorkerData) => void;
}

const WorkerTable = ({ groupId, className, onClick }: WorkerTableProps) => {
  const [isOpenGroupMoveModal, setIsOpenGroupMoveModal] = useState<boolean>(false);
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>(Sort.NORMAL);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { workers, isWorkerLoading } = useWorkerQuery({
    groupId: groupId !== 'all' ? groupId : undefined,
  });

  const isEmptyWorker = workers.length === 0;

  // Worker 키워드 검색
  const searchWorker = (data: Array<WorkerData>): Array<WorkerData> => {
    return data.filter(
      worker =>
        worker.name.includes(searchTerm) ||
        worker.residence.includes(searchTerm) ||
        worker.phone.includes(searchTerm),
    );
  };

  // Worker 정렬 방식
  const sortedWorkers = useMemo(() => {
    let filteredWorkers: Array<WorkerData> = searchTerm ? searchWorker(workers) : workers;

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

  return (
    <WorkerTableStyled className={clsx('WorkerTable', className)}>
      <WorkerTableControlBar
        onMoveGroup={() => setIsOpenGroupMoveModal(true)}
        onSearch={e => setSearchTerm(e.target.value)}
        onChangeSort={sort => setSort(sort)}
        checked={!!selectedIds.length}
      />
      {!isWorkerLoading ? (
        !isEmptyWorker ? (
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
        ) : (
          <div className="empty-wrap">
            <Empty description="그룹이 비었습니다" />
          </div>
        )
      ) : (
        <Skeleton active style={{ padding: '2rem' }} />
      )}

      <WorkerGroupMoveModal
        selectedWorkerIds={selectedIds}
        open={isOpenGroupMoveModal}
        onClose={() => setIsOpenGroupMoveModal(false)}
      />
    </WorkerTableStyled>
  );
};

export default WorkerTable;
