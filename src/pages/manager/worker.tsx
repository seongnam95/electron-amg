import { useState } from 'react';

import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import Button from '~/components/common/Button';
import LayoutConfig from '~/components/layouts/LayoutConfig/LayoutConfig';
import GroupSideBar from '~/components/worker/GroupSideBar';
import WorkerTable from '~/components/worker/WorkerTable/WorkerTable';
import { groupState } from '~/stores/group';
import { filteredWorkerState } from '~/stores/worker';
import { WorkerPageStyled } from '~/styles/pageStyled/workerPageStyled';
import { WorkerData } from '~/types/worker';

const ContractOption = [
  { label: '계약중', value: 'ing' },
  { label: '계약종료', value: 'end' },
];

const Worker = () => {
  const [groupId, setGroupId] = useState<string>('all');

  const groups = useRecoilValue(groupState);
  const workers = useRecoilValue(filteredWorkerState(groupId));

  const handleOnClickWorker = (worker: WorkerData) => {};

  // const handleOnSelectContract = (e: RadioChangeEvent) => {
  //   const value = e.target.value;
  //   setInProgress(value === 'ing');
  //   console.log(value === 'ing');
  // };

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
        <div className="content-header">
          {groupId === 'all'
            ? '전체'
            : groupId === 'etc'
            ? '기타'
            : groups.find(group => group.id === groupId)?.name}
        </div>

        <div className="worker-control-bar">
          {/* <Radio.Group
            value={inProgress ? 'ing' : 'end'}
            className="radio-group"
            options={ContractOption}
            optionType="button"
            buttonStyle="solid"
            onChange={handleOnSelectContract}
          /> */}

          <Button styled={{ variations: 'icon' }}>
            <i className="bx bx-trash" />
          </Button>
        </div>

        <WorkerTable allWorker={groupId === 'all'} items={workers} onClick={handleOnClickWorker} />
      </motion.div>

      {/* {showModal && worker && <WorkerModal worker={worker} />} */}
    </WorkerPageStyled>
  );
};

export default Worker;
