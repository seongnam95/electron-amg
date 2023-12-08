import { AttendanceData } from '~/types/attendance';

export interface DailySumPay {
  day: number;
  paySum: number;
}

// 일일 합계
export const sumPayByDay = (attendances: AttendanceData[]): DailySumPay[] => {
  const sumsByDay: { [day: string]: DailySumPay } = {};

  attendances.forEach(({ workingDate, position: { standardPay } }) => {
    const day = parseInt(workingDate.split('-')[2], 10); // 'YY-MM-DD' 형식에서 DD 추출
    if (!sumsByDay[day]) {
      sumsByDay[day] = { day, paySum: 0 };
    }
    sumsByDay[day].paySum += standardPay;
  });

  return Object.values(sumsByDay);
};
