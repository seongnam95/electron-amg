import dayjs, { Dayjs } from 'dayjs';
import { atom, selectorFamily } from 'recoil';

import { CommuteData } from '~/types/worker';

const initCommute: CommuteData[] = [
  {
    id: '1',
    workerId: '1',
    workingDay: '20230730',
    startTimeStamp: 1693006200,
    endTimeStamp: 1693006300,
  },
  {
    id: '2',
    workerId: '1',
    workingDay: '20230730',
    startTimeStamp: 1693006300,
    endTimeStamp: 1693008500,
  },
  {
    id: '3',
    workerId: '2',
    workingDay: '20230731',
    startTimeStamp: 1693006200,
    endTimeStamp: 1693014300,
  },
  {
    id: '4',
    workerId: '2',
    workingDay: '20230731',
    startTimeStamp: 1693006300,
    endTimeStamp: 1693018500,
  },
];

export const workingDayStore = atom<Dayjs>({
  key: 'workingDayState',
  default: dayjs(),
});

export const commuteStore = atom<CommuteData[]>({
  key: 'commuteState',
  default: initCommute,
});

interface FilterParams {
  workerId: string;
  workingDay: string;
  [key: string]: string; // add index signature
}

// export const commuteSelector = selectorFamily<CommuteData[], FilterParams>({
//   key: 'commuteSelector',
//   get:
//     ({ workerId, workingDay }) =>
//     ({ get }) => {
//       const commuteData = get(commuteStore);
//       return commuteData.filter(
//         commute => commute.workerId === workerId && commute.workingDay === workingDay,
//       );
//     },
// });

export const commuteSelector = selectorFamily<CommuteData[] | [], { id?: string; day?: string }>({
  key: 'commuteSelector',
  get:
    ({ id, day }) =>
    ({ get }) => {
      const commuteData = get(commuteStore);
      return commuteData.filter(commute => commute.workerId === id || commute.workingDay === day);
    },
});
