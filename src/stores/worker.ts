import { atom, selector, selectorFamily } from 'recoil';

import { fetchWorkers } from '~/api/workerApi';
import { WorkerData } from '~/types/worker';

export const workerStore = atom<WorkerData[]>({
  key: 'workerState',
  default: [],
});

export const workerSelector = selectorFamily<WorkerData | undefined, { userId: string }>({
  key: 'workerSelector',
  get:
    ({ userId }) =>
    ({ get }) => {
      const workerList = get(workerStore);
      return workerList.find(worker => worker.id === userId);
    },
});

export const workerQuery = selector<WorkerData[]>({
  key: 'workerQuery',
  get: async () => {
    const response = await fetchWorkers();
    if (response.success) return response.result;
    else return [];
  },
});
