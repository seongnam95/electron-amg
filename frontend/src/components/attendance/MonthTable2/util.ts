import dayjs from 'dayjs';

import { AttendanceData } from '~/types/attendance';

type GroupedData = {
  employeeId: string;
  workingDates: { workingDate: string }[][];
  incentives: { workingDate: string }[][];
  deducts: { workingDate: string }[][];
};

export const groupByEmployeeIdAndDate = (attendances: AttendanceData[]): GroupedData[] => {
  // Employee ID로 그룹화
  const groupedById = attendances.reduce(
    (acc: { [key: string]: AttendanceData[] }, curr: AttendanceData) => {
      if (!acc[curr.employeeId]) acc[curr.employeeId] = [];
      acc[curr.employeeId].push(curr);
      return acc;
    },
    {},
  );

  return Object.entries(groupedById).map(([employeeId, data]) => {
    // 날짜별로 정렬
    const sortedByDate = data.sort(
      (a, b) =>
        dayjs(a.workingDate, 'YY-MM-DD').valueOf() - dayjs(b.workingDate, 'YY-MM-DD').valueOf(),
    );

    const result: GroupedData = { employeeId, workingDates: [], incentives: [], deducts: [] };

    sortedByDate.forEach((curr, idx) => {
      const prev = sortedByDate[idx - 1] || null;
      const prevDate = prev ? dayjs(prev.workingDate, 'YY-MM-DD').add(1, 'day') : null;
      const currDate = dayjs(curr.workingDate, 'YY-MM-DD');

      if (!prev || !prevDate?.isSame(currDate, 'day')) {
        result.workingDates = [...result.workingDates, [{ workingDate: curr.workingDate }]];
        if (curr.incentive !== 0) {
          result.incentives = [...result.incentives, [{ workingDate: curr.workingDate }]];
        }
      } else {
        result.workingDates[result.workingDates.length - 1] = [
          ...result.workingDates[result.workingDates.length - 1],
          { workingDate: curr.workingDate },
        ];
        if (curr.incentive !== 0) {
          if (result.incentives.length > 0) {
            result.incentives[result.incentives.length - 1] = [
              ...result.incentives[result.incentives.length - 1],
              { workingDate: curr.workingDate },
            ];
          } else {
            result.incentives = [[{ workingDate: curr.workingDate }]];
          }
        }
        if (curr.prePay !== 0) {
          if (result.deducts.length > 0) {
            result.deducts[result.deducts.length - 1] = [
              ...result.deducts[result.deducts.length - 1],
              { workingDate: curr.workingDate },
            ];
          } else {
            result.deducts = [[{ workingDate: curr.workingDate }]];
          }
        }
      }
    });

    return result;
  });
};
