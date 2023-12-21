import { ReactNode } from 'react';

import clsx from 'clsx';

import Card from '~/components/common/Card';
import DailyAttendanceDoughnut from '~/components/dashboard/DailyAttendanceDoughnut';

import { DateTableContainerStyled } from './styled';

export interface DateTableContainerProps {
  className?: string;
  children?: ReactNode;
}

const DateTableContainer = ({ className, children }: DateTableContainerProps) => {
  return (
    <DateTableContainerStyled className={clsx('DateTableContainer', className)}>
      {children}
      <div className="card-wrap">
        <Card className="attendance-stats-card" title="🙋‍♂️ 일일 출근현황">
          <DailyAttendanceDoughnut />
        </Card>
      </div>
    </DateTableContainerStyled>
  );
};

export default DateTableContainer;
