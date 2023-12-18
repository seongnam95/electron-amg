import { Flex } from 'antd';
import { useRecoilValue } from 'recoil';

import DescriptionsBox from '~/components/common/DescriptionsBox';
import { useDragScroll } from '~/hooks/useDragScroll';
import { teamStore } from '~/stores/team';
import { AttendanceData } from '~/types/attendance';
import { getStats, calculateReportTotal } from '~/utils/statistics/report';

import { AttendanceStatsStyled } from './styled';

export interface AttendanceStatsProps {
  attendances: AttendanceData[];
}

const AttendanceStats = ({ attendances }: AttendanceStatsProps) => {
  const team = useRecoilValue(teamStore);
  const dragRef = useDragScroll();

  const incentivePay = team.leader ? team.leader.position.incentivePay : 0;

  const attendanceReports = team.positions.map(position => {
    const filteredAttendances = attendances.filter(
      attendance => attendance.positionId === position.id,
    );
    return {
      target: position,
      ...getStats(team, position.standardPay, filteredAttendances),
    };
  });

  const { earnsIncentiveCount, dailyPay, mealCost, prepay, otPay, taxAmount, totalPaySum } =
    calculateReportTotal(attendanceReports);

  return (
    <AttendanceStatsStyled className="AttendanceStats" ref={dragRef}>
      <Flex className="stats-wrap" gap={12}>
        <DescriptionsBox
          fullWidth
          justify="center"
          title="일당 합계"
          children={`${dailyPay.toLocaleString()}원`}
        />
        <DescriptionsBox
          fullWidth
          justify="center"
          title="식대"
          children={`${mealCost.toLocaleString()}원`}
        />
        <DescriptionsBox
          fullWidth
          justify="center"
          title="선지급"
          children={`${prepay.toLocaleString()}원`}
        />
        <DescriptionsBox
          fullWidth
          justify="center"
          title="OT"
          children={`${otPay.toLocaleString()}원`}
        />
        <DescriptionsBox
          fullWidth
          justify="center"
          title="팀장 인센티브"
          children={`${(earnsIncentiveCount * incentivePay).toLocaleString()}원`}
        />
        <DescriptionsBox
          fullWidth
          justify="center"
          title="소득세 (3.3%)"
          children={`${taxAmount.toLocaleString()}원`}
        />
        <DescriptionsBox
          fullWidth
          justify="center"
          title="총 지급액"
          children={`${totalPaySum.toLocaleString()}원`}
        />
      </Flex>
    </AttendanceStatsStyled>
  );
};

export default AttendanceStats;
