import { useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';

import Card from '~/components/common/Card';
import AntDatePicker from '~/components/common/DatePicker/DatePicker';

import MonthPayrollBar from '../MonthPayrollBar';

export interface MonthPayrollCardProps {}

const MonthPayrollCard = ({}: MonthPayrollCardProps) => {
  const [day, setDay] = useState<Dayjs>(dayjs());

  const handleChangeMonth = (date: Dayjs | null) => {
    if (date) setDay(date);
  };

  return (
    <Card
      title="📊 월 수당 통계"
      extra={<AntDatePicker picker="month" defaultValue={day} onChange={handleChangeMonth} />}
    >
      <MonthPayrollBar day={day} />
    </Card>
  );
};

export default MonthPayrollCard;
