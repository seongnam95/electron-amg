import dayjs from 'dayjs';

import { AttendanceData } from '~/types/attendance';
import { PositionData } from '~/types/position';

export interface AttendanceGroupData {
  position: PositionData;
  attendances: AttendanceData[];
}

/**
 * 날짜별로 AttendanceData를 그룹한 데이터를 반환합니다.
 * 연달아 있는 데이터는 이중배열로 반환합니다.
 * @param data - 그룹화 대상 데이터
 * @returns {AttendanceGroupData[]}
 */
export const groupedAttendanceByDay = (data: AttendanceData[]): AttendanceGroupData[] => {
  const sortedByDate = data.sort(
    (a, b) =>
      dayjs(a.workingDate, 'YY-MM-DD').valueOf() - dayjs(b.workingDate, 'YY-MM-DD').valueOf(),
  );

  const result: AttendanceGroupData[] = [];
  let currentGroup: AttendanceData[] = [];
  let currentPosition: PositionData | null = null;

  sortedByDate.forEach((curr, idx) => {
    if (idx === 0 || currentPosition?.id !== curr.position.id) {
      if (currentGroup.length > 0) {
        result.push({ position: currentPosition!, attendances: currentGroup });
      }
      currentPosition = curr.position;
      currentGroup = [curr];
    } else {
      const prev = sortedByDate[idx - 1];
      const prevDate = dayjs(prev.workingDate, 'YY-MM-DD');
      const currDate = dayjs(curr.workingDate, 'YY-MM-DD');

      if (currDate.diff(prevDate, 'day') === 1) {
        currentGroup.push(curr);
      } else {
        result.push({ position: currentPosition, attendances: currentGroup });
        currentPosition = curr.position;
        currentGroup = [curr];
      }
    }
  });

  if (currentGroup.length > 0) {
    result.push({ position: currentPosition!, attendances: currentGroup });
  }

  return result;
};

/**
 * 날짜별로 AttendanceData를 그룹한 데이터를 반환합니다.
 * 연달아 있는 데이터는 이중배열로 반환합니다.
 * @param data - 그룹화 대상 데이터
 * @returns {AttendanceData[][]}
 */
// export const groupedAttendanceByDay = (data: AttendanceData[]): AttendanceData[][] => {
//   const sortedByDate = data.sort(
//     (a, b) =>
//       dayjs(a.workingDate, 'YY-MM-DD').valueOf() - dayjs(b.workingDate, 'YY-MM-DD').valueOf(),
//   );

//   const result: AttendanceData[][] = [];
//   let currentGroup: AttendanceData[] = [];

//   sortedByDate.forEach((curr, idx) => {
//     // 첫 번째 요소는 항상 새 그룹에 추가
//     if (idx === 0) {
//       currentGroup.push(curr);
//       return;
//     }

//     const prev = sortedByDate[idx - 1];
//     const prevDate = dayjs(prev.workingDate, 'YY-MM-DD');
//     const currDate = dayjs(curr.workingDate, 'YY-MM-DD');

//     // 이전 날짜와 하루 차이 날 경우 현재 그룹에 추가
//     if (currDate.diff(prevDate, 'day') === 1) {
//       currentGroup.push(curr);
//     } else {
//       // 이전 날짜와 차이가 나면 현재 그룹을 결과에 추가하고 새 그룹 시작
//       result.push(currentGroup);
//       currentGroup = [curr];
//     }
//   });

//   if (currentGroup.length > 0) {
//     result.push(currentGroup);
//   }

//   return result;
// };
