import { useState } from 'react';

import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import EditableLabel from '~/components/EditableLabel/EditableLabel';
import Button from '~/components/common/Button';
import LayoutConfig from '~/components/layouts/LayoutConfig/LayoutConfig';
import GroupSideBar from '~/components/worker/GroupSideBar';
import WorkerTable from '~/components/worker/WorkerTable/WorkerTable';
import { filteredWorkerState } from '~/stores/worker';
import { WorkerPageStyled } from '~/styles/pageStyled/workerPageStyled';

const Worker = () => {
  const [groupId, setGroupId] = useState<string>('all');
  const workers = useRecoilValue(filteredWorkerState(groupId));

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
        <EditableLabel groupId={groupId} />
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
