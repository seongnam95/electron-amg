import { ReactNode, useEffect, useState } from 'react';

import { Divider } from 'antd';
import clsx from 'clsx';

import { WorkerData } from '~/types/worker';

import { WorkerModalStyled } from './styled';

export interface WorkerModalProps {
  worker: WorkerData;
  className?: string;
  children?: ReactNode;
}

const WorkerModal = ({ worker, className, children }: WorkerModalProps) => {
  const [currentWorker, setCurrentWorker] = useState<WorkerData>(worker);
  useEffect(() => setCurrentWorker(worker), [worker]);

  return (
    <WorkerModalStyled className={clsx('WorkerModal', className)}>
      <div className="worker-info-wrap">
        <p className="info-row">
          <span className="text-bold text-lazy-size">{currentWorker.name}</span>
          <span
            className="gender-bullet"
            style={{ backgroundColor: currentWorker.genderCode === 0 ? 'skyblue' : 'pink' }}
          />
        </p>
        <p className="info-row">
          <span className="text-sub">{currentWorker.residence}</span>
        </p>
        <p className="info-row">
          <span className="text-phone">{currentWorker.phone}</span>
        </p>
      </div>
      <Divider />
    </WorkerModalStyled>
  );
};

export default WorkerModal;
