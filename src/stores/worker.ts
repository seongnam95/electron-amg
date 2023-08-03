import { atom, selector, selectorFamily } from 'recoil';

import { WorkerData } from '~/types/worker';

const initWorker: WorkerData[] = [
  {
    id: '1',
    name: '장성남',
    age: 29,
    phone: '010-2486-1307',
    genderCode: 0,
    residence: '서울특별시 중랑구',
    positionCode: 1,
    contract: {
      company: '하울',
      period: ['20230701', '20230730'],
      date: '20230701',
    },
  },
  {
    id: '2',
    name: '곽승재',
    age: 29,
    phone: '010-1234-1234',
    genderCode: 0,
    residence: '서울특별시 중랑구',
    positionCode: 1,
    contract: {
      company: '하울',
      period: ['20230701', '20230730'],
      date: '20230701',
    },
  },
  {
    id: '3',
    name: '김땡땡',
    age: 29,
    phone: '010-2486-1307',
    genderCode: 0,
    residence: '서울특별시 중랑구',
    positionCode: 2,
    contract: {
      company: '하울',
      period: ['20230701', '20230730'],
      date: '20230701',
    },
  },
  {
    id: '4',
    name: '아무개',
    age: 29,
    phone: '010-1234-1234',
    genderCode: 0,
    residence: '서울특별시 중랑구',
    positionCode: 2,
    contract: {
      company: '하울',
      period: ['20230701', '20230730'],
      date: '20230701',
    },
  },
  {
    id: '5',
    name: '홍길동',
    age: 29,
    phone: '010-2486-1307',
    genderCode: 0,
    residence: '서울특별시 중랑구',
    positionCode: 2,
    contract: {
      company: '하울',
      period: ['20230701', '20230730'],
      date: '20230701',
    },
  },
];

export const workerStore = atom<WorkerData[]>({
  key: 'workerState',
  default: initWorker,
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
