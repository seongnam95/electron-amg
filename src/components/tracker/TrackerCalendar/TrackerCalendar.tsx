import { Dayjs } from 'dayjs';

import DayTable from './DayTable/DayTable';
import MonthTable from './MonthTable/MonthTable';
import { TrackerCalendarStyled } from './styled';

export interface TrackerCalendarProps {
  tableView?: 'month' | 'day';
}

const TrackerCalendar = ({ tableView = 'day' }: TrackerCalendarProps) => {
  switch (tableView) {
    case 'day':
      return <DayTable />;
    case 'month':
      return <MonthTable />;
  }
};

export default TrackerCalendar;
