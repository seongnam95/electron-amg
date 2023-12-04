import { useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';

import Card from '~/components/common/Card';
import AntDatePicker from '~/components/common/DatePicker/DatePicker';

import MonthPayrollBar from '../MonthPayrollBar';

export interface MonthPayrollCardProps {}

const MonthPayrollCard = ({}: MonthPayrollCardProps) => {
  const [date, setDate] = useState<Dayjs>(dayjs());

  const handleChangeMonth = (date: Dayjs | null) => {
    if (date) setDate(date);
  };

  return (
    <Card
      title="📊 월 수당 통계"
      maxWidth="90rem"
      extra={<AntDatePicker picker="month" defaultValue={date} onChange={handleChangeMonth} />}
    >
      <MonthPayrollBar date={date} />
    </Card>
  );
};

export default MonthPayrollCard;
