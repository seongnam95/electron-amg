import { useState } from 'react';
import { FaFlag } from 'react-icons/fa';
import { FaCalendarDays, FaHouseFlag } from 'react-icons/fa6';
import { FcBarChart } from 'react-icons/fc';

import { Flex } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import Card from '~/components/common/Card';
import AntDatePicker from '~/components/common/DatePicker/DatePicker';
import MonthlyAttendanceTable from '~/components/dashboard/MonthlyAttendanceTable';
import MonthlyPayChart from '~/components/dashboard/MonthlyPayChart';
import UnitPayList from '~/components/dashboard/UnitPayList';
import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { useEmployee } from '~/hooks/queryHooks/useEmployeeQuery';
import { teamStore } from '~/stores/team';
import { DashboardPageStyled } from '~/styles/pageStyled/dashboardPageStyled';

const DashboardPage = () => {
  const team = useRecoilValue(teamStore);
  const [day, setDay] = useState<Dayjs>(dayjs());
  const { employees } = useEmployee({ teamId: team.id });
  const { attendances } = useAttendanceQuery({
    teamId: team.id,
    day: day,
    dayType: 'month',
  });

  const handleChangeDay = (day: Dayjs | null) => {
    if (day) return setDay(day);
  };

  const cardConfig = [
    {
      className: 'month-pay-chart-card',
      icon: <FcBarChart size={24} />,
      title: '출근 통계 차트',
      content: <MonthlyPayChart employees={employees} attendances={attendances} day={day} />,
    },
    {
      className: 'unit-pay-list-card',
      icon: <FaFlag color="#f27373" size={17} />,
      title: '대행사 청구 단가',
      content: <UnitPayList employees={employees} attendances={attendances} />,
    },
    {
      className: 'month-attendance-table-card',
      icon: <FaCalendarDays color="#ffa963" size={19} />,
      title: '월별 출근 합계',
      content: <MonthlyAttendanceTable employees={employees} attendances={attendances} />,
    },
  ];

  return (
    <DashboardPageStyled>
      <Flex className="control-bar" justify="end">
        <AntDatePicker picker="month" value={day} onChange={handleChangeDay} />
      </Flex>

      <div className="card-grid-wrap">
        {cardConfig.map(card => {
          const title = (
            <>
              {card.icon}
              {card.title}
            </>
          );
          return (
            <Card key={card.title} className={card.className} title={title}>
              {card.content}
            </Card>
          );
        })}
      </div>
    </DashboardPageStyled>
  );
};

export default DashboardPage;
