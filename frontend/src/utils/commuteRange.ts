// util.ts
import dayjs from 'dayjs';

import { CommuteData } from '~/types/employee';

export const groupDataByEmployee = (commutes: CommuteData[]): Record<string, CommuteData[]> => {
  return commutes.reduce((acc, commute) => {
    if (!acc[commute.employeeId]) {
      acc[commute.employeeId] = [];
    }
    acc[commute.employeeId].push(commute);
    return acc;
  }, {} as Record<string, CommuteData[]>);
};

export const findWorkingRanges = (
  dataByEmployee: Record<string, CommuteData[]>,
): Record<string, CommuteData[][]> => {
  return Object.entries(dataByEmployee).reduce((acc, [employeeId, data]) => {
    const sortedData = data.sort((a, b) => a.workingDay.localeCompare(b.workingDay));
    const ranges = sortedData.reduce((acc, curr, i, arr) => {
      if (
        i === 0 ||
        curr.workingDay !==
          dayjs(arr[i - 1].workingDay)
            .add(1, 'day')
            .format('YYYYMMDD')
      ) {
        acc.push([curr]);
      } else {
        acc[acc.length - 1].push(curr);
      }
      return acc;
    }, [] as CommuteData[][]);
    acc[employeeId] = ranges;
    return acc;
  }, {} as Record<string, CommuteData[][]>);
};
