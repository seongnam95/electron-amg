import { useRef } from 'react';

import Card from '~/components/common/Card';

import AttendanceDoughnut from '../AttendanceDoughnut';

export interface AttendanceCardProps {}

const AttendanceCard = ({}: AttendanceCardProps) => {
  return (
    <Card title="🙋‍♂️ 오늘 출근 현황" style={{ width: '28rem' }}>
      <AttendanceDoughnut />
    </Card>
  );
};

export default AttendanceCard;
