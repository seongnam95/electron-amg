import { useState } from 'react';

import LayoutConfig from '~/components/layouts/LayoutConfig/LayoutConfig';
import WorkerModal from '~/components/worker/WorkerModal/WorkerModal';
import WorkerTable from '~/components/worker/WorkerTable/WorkerTable';
import { WorkerPageStyled } from '~/styles/pageStyled/workerPageStyled';
import { WorkerData } from '~/types/worker';

const Worker = () => {
  const [worker, setWorker] = useState<WorkerData>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOnClickWorker = (w: WorkerData) => {
    setWorker(w);
    setShowModal(true);
  };

  return (
    <WorkerPageStyled className="WorkerPage">
      <LayoutConfig breadcrumbs={[' 매니저', '직원 관리']} />
      <WorkerTable onClick={handleOnClickWorker} />
      {/* {showModal && worker && <WorkerModal worker={worker} />} */}
    </WorkerPageStyled>
  );
};

export default Worker;
