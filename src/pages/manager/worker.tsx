import { useState } from 'react';

import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import EditableLabel from '~/components/EditableLabel/EditableLabel';
import Button from '~/components/common/Button';
import LayoutConfig from '~/components/layouts/LayoutConfig/LayoutConfig';
import GroupSideBar from '~/components/worker/GroupSideBar';
import WorkerTable from '~/components/worker/WorkerTable/WorkerTable';
import { filteredGroupState, groupState } from '~/stores/group';
import { filteredWorkerState } from '~/stores/worker';
import { WorkerPageStyled } from '~/styles/pageStyled/workerPageStyled';
import { WorkerData } from '~/types/worker';

const Worker = () => {
  const [groupId, setGroupId] = useState<string>('all');

  const currentGroup = useRecoilValue(filteredGroupState(groupId));
  const workers = useRecoilValue(filteredWorkerState(groupId));

  // TODO: 실제로 존재하는 Group이라면 True, '전체', '기타'일 경우 False 구현
  const isExistenceGroup = currentGroup;

  const handleOnChangeGroup = (id: string) => {
    switch (id) {
      case 'all':
        return;
      case 'etc':
        return;
      default:
        setGroupId(id);
    }
  };

  const handleOnClickWorker = (worker: WorkerData) => {};

  return (
    <WorkerPageStyled className="WorkerPage">
      <LayoutConfig breadcrumbs={[' 매니저', '직원 관리']} />
      <GroupSideBar onChange={handleOnChangeGroup} />
      <motion.div
        key={groupId}
        className="worker-content"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <EditableLabel group={currentGroup} />
        <div className="worker-control-bar">
          <Button styled={{ variations: 'icon' }}>
            <i className="bx bx-trash" />
          </Button>
        </div>
        <WorkerTable allWorker={groupId === 'all'} items={workers} onClick={handleOnClickWorker} />
      </motion.div>
    </WorkerPageStyled>
  );
};

export default Worker;
