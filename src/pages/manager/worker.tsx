import { useState } from 'react';

import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import GroupEditorModal from '~/components/GroupEditorModal';
import Button from '~/components/common/Button';
import LayoutConfig from '~/components/layouts/LayoutConfig/LayoutConfig';
import GroupSideBar from '~/components/worker/GroupSideBar';
import WorkerTable from '~/components/worker/WorkerTable/WorkerTable';
import { filteredGroupState } from '~/stores/group';
import { filteredWorkerState } from '~/stores/worker';
import { WorkerPageStyled } from '~/styles/pageStyled/workerPageStyled';

const Worker = () => {
  const [groupId, setGroupId] = useState<string>('all');
  const [isEditing, setIsEditing] = useState<boolean>();

  const workers = useRecoilValue(filteredWorkerState(groupId));
  const currentGroup = useRecoilValue(filteredGroupState(groupId));
  const headerText = groupId === 'all' ? '전체' : groupId === 'etc' ? '기타' : currentGroup.name;

  const handleOnClickHeader = () => {
    if (currentGroup) {
      setIsEditing(true);
    }
  };

  return (
    <WorkerPageStyled className="WorkerPage">
      <LayoutConfig breadcrumbs={[' 매니저', '직원 관리']} />
      <GroupSideBar onChange={id => setGroupId(id)} />

      <motion.div
        key={groupId}
        className="worker-content"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="modal-wrap">
          <div className="header-text" onClick={handleOnClickHeader}>
            {headerText}
          </div>

          {currentGroup && (
            <GroupEditorModal
              group={currentGroup}
              open={isEditing}
              onSubmit={() => setIsEditing(false)}
              onCancel={() => setIsEditing(false)}
            />
          )}
        </div>

        <div className="worker-control-bar">
          <Button styled={{ variations: 'icon' }}>
            <i className="bx bx-trash" />
          </Button>
        </div>
        <WorkerTable allWorker={groupId === 'all'} items={workers} />
      </motion.div>
    </WorkerPageStyled>
  );
};

export default Worker;
