import { Dayjs } from 'dayjs';

export interface WeekColorData {
  day: string;
  color: string;
}

export const generateWeekColorDays = (day: Dayjs): Array<WeekColorData> => {
  const numDaysInMonth = day.daysInMonth();

  return Array.from({ length: numDaysInMonth }, (_, index) => {
    const dayNumber = index + 1;
    const date = day.date(dayNumber);
    const dayOfWeek = date.day();

    let color;

    if (dayOfWeek === 0) color = 'red';
    else if (dayOfWeek === 6) color = 'blue';
    else color = 'black';

    return {
      day: String(dayNumber),
      color: color,
    };
  });
};
