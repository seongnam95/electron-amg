import dayjs, { Dayjs } from 'dayjs';
import { atom, selectorFamily } from 'recoil';

import { CommuteData } from '~/types/employee';

const initCommute: CommuteData[] = [
  {
    id: '1',
    employeeId: '1',
    workingDay: '20230801',
    startTimeStamp: 1693006200,
    endTimeStamp: 1693006300,
  },
  {
    id: '2',
    employeeId: '1',
    workingDay: '20230803',
    startTimeStamp: 1693006300,
    endTimeStamp: 1693008500,
  },
  {
    id: '3',
    employeeId: '2',
    workingDay: '20230802',
    startTimeStamp: 1693006200,
    endTimeStamp: 1693014300,
  },
  {
    id: '4',
    employeeId: '2',
    workingDay: '20230803',
    startTimeStamp: 1693006300,
    endTimeStamp: 1693018500,
  },
  {
    id: '5',
    employeeId: '4',
    workingDay: '20230803',
    startTimeStamp: 1693006300,
    endTimeStamp: 1693018500,
  },
  {
    id: '6',
    employeeId: '5',
    workingDay: '20230801',
    startTimeStamp: 1693006300,
    endTimeStamp: 1693018500,
  },
  {
    id: '7',
    employeeId: '5',
    workingDay: '20230802',
    startTimeStamp: 1693006300,
    endTimeStamp: 1693018500,
  },
  {
    id: '8',
    employeeId: '5',
    workingDay: '20230803',
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

export const commuteMonthlySelector = selectorFamily({
  key: 'MonthlyFilter',
  get:
    month =>
    ({ get }) => {
      const commuteList = get(commuteStore);
      return commuteList.filter(commute => dayjs(commute.workingDay).format('YYYYMM') === month);
    },
});

// 일별 필터링
export const commuteDailySelector = selectorFamily({
  key: 'DailyFilter',
  get:
    day =>
    ({ get }) => {
      const commuteList = get(commuteStore);
      return commuteList.filter(commute => dayjs(commute.workingDay).format('YYYYMMDD') === day);
    },
});
