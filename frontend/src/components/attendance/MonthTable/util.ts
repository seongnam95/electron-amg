import dayjs from 'dayjs';

import { AttendanceData } from '~/types/attendance';

export const groupedAttendanceByDay = (data: AttendanceData[]) => {
  const sortedByDate = data.sort(
    (a, b) =>
      dayjs(a.workingDate, 'YY-MM-DD').valueOf() - dayjs(b.workingDate, 'YY-MM-DD').valueOf(),
  );

  const result: AttendanceData[][] = [];
  let currentGroup: AttendanceData[] = [];

  sortedByDate.forEach((curr, idx) => {
    // 첫 번째 요소는 항상 새 그룹에 추가
    if (idx === 0) {
      currentGroup.push(curr);
      return;
    }

    const prev = sortedByDate[idx - 1];
    const prevDate = dayjs(prev.workingDate, 'YY-MM-DD');
    const currDate = dayjs(curr.workingDate, 'YY-MM-DD');

    // 이전 날짜와 하루 차이 날 경우 현재 그룹에 추가
    if (currDate.diff(prevDate, 'day') === 1) {
      currentGroup.push(curr);
    } else {
      // 이전 날짜와 차이가 나면 현재 그룹을 결과에 추가하고 새 그룹 시작
      result.push(currentGroup);
      currentGroup = [curr];
    }
  });

  if (currentGroup.length > 0) {
    result.push(currentGroup);
  }

  return result;
};
