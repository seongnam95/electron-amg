import { AttendanceData } from '~/types/attendance';

export interface DailySumPay {
  day: number;
  paySum: number;
  prePaySum: number;
}

// 일일 합계
export const sumPayByDay = (attendances: AttendanceData[]): DailySumPay[] => {
  const sumsByDay: { [day: string]: DailySumPay } = {};

  attendances.forEach(({ workingDate, pay, prePay }) => {
    const day = parseInt(workingDate.split('-')[2], 10); // 'YY-MM-DD' 형식에서 DD 추출
    if (!sumsByDay[day]) {
      sumsByDay[day] = { day, paySum: 0, prePaySum: 0 };
    }
    sumsByDay[day].paySum += pay;
    sumsByDay[day].prePaySum += prePay;
  });

  return Object.values(sumsByDay);
};

// 분류별 월 합계
export const calculateSum = (dailySumPays: DailySumPay[]) => {
  const paySum = dailySumPays.reduce((total, value) => (total += value.paySum), 0);
  const prePaySum = dailySumPays.reduce((total, value) => (total += value.prePaySum), 0);
  const taxSum = Math.round(paySum * 0.033);
  const pay = paySum - prePaySum - taxSum;

  return {
    paySum,
    prePaySum,
    taxSum,
    pay,
  };
};
