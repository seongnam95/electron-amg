import { useRef } from 'react';

import Card from '~/components/common/Card';

import AttendanceDoughnut from '../AttendanceDoughnut';

export interface AttendanceCardProps {}

const AttendanceCard = ({}: AttendanceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <Card ref={cardRef} title="🙋‍♂️ 오늘 출근 현황">
      <AttendanceDoughnut />
    </Card>
  );
};

export default AttendanceCard;
