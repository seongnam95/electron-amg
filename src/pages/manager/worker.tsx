import { useState } from 'react';

import { useRecoilValue } from 'recoil';

import LayoutConfig from '~/components/layouts/LayoutConfig/LayoutConfig';
import WorkerTable from '~/components/worker/WorkerTable/WorkerTable';
import { workerQuery } from '~/stores/worker';
import { WorkerPageStyled } from '~/styles/pageStyled/workerPageStyled';
import { WorkerData } from '~/types/worker';

const Worker = () => {
  const [worker, setWorker] = useState<WorkerData>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const workers = useRecoilValue(workerQuery);

  const handleOnClickWorker = (worker: WorkerData) => {
    setWorker(worker);
    setShowModal(true);
  };

  return (
    <WorkerPageStyled className="WorkerPage">
      <LayoutConfig breadcrumbs={[' 매니저', '직원 관리']} />
      <WorkerTable items={workers} onClick={handleOnClickWorker} />
      {/* {showModal && worker && <WorkerModal worker={worker} />} */}
    </WorkerPageStyled>
  );
};

export default Worker;
