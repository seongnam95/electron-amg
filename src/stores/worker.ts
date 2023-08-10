import { atom, selectorFamily } from 'recoil';

import { fetchWorkers } from '~/api/workerApi';
import { WorkerData } from '~/types/worker';

const mapWorkerDataFromResponse = (worker: any): WorkerData => ({
  id: worker.id.toString(),
  name: worker.name,
  phone: worker.phone,
  residence: worker.residence,
  genderCode: worker.gender_code,
  positionCode: worker.position_code,
  createDate: worker.create_date,
  groupId: worker.group_id ? worker.group_id.toString() : null,
});

const workerState = atom<WorkerData[]>({
  key: 'workerState',
  default: [],
  effects_UNSTABLE: [
    ({ setSelf }) => {
      fetchWorkers().then(response => {
        if (response.success) {
          const workers = response.result.map(mapWorkerDataFromResponse);
          setSelf(workers);
        }
      });
    },
  ],
});

const filteredWorkerState = selectorFamily<WorkerData[], string>({
  key: 'filteredWorkerState',
  get:
    groupId =>
    ({ get }) => {
      const workers = get(workerState);

      switch (groupId) {
        case 'all':
          return workers;
        case 'etc':
          return workers.filter(worker => worker.groupId === null);
        default:
          return workers.filter(worker => worker.groupId === groupId);
      }
    },
});

export { workerState, filteredWorkerState };
