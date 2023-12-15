import { Dayjs } from 'dayjs';

export interface WeekColorData {
  day: Dayjs;
  dayNum: number;
  dayOfWeek: string;
}

export const generateDays = (day: Dayjs): Array<WeekColorData> => {
  const numDaysInMonth = day.daysInMonth();
  const days = ['일', '월', '화', '수', '목', '금', '토']; // 요일 이름 배열

  return Array.from({ length: numDaysInMonth }, (_, index) => {
    const dayNumber = index + 1;
    const date = day.date(dayNumber);
    const dayOfWeek = date.day();

    return {
      day: date,
      dayNum: dayNumber,
      dayOfWeek: days[dayOfWeek], // 요일 이름 추가
    };
  });
};
