import { useState } from 'react';
import { FaCalendarDays, FaHouseFlag } from 'react-icons/fa6';
import { FcBarChart } from 'react-icons/fc';

import { Flex } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import Card from '~/components/common/Card';
import AntDatePicker from '~/components/common/DatePicker/DatePicker';
import MonthlyAttendanceTable from '~/components/dashboard/MonthlyAttendanceTable';
import MonthlyPayChart from '~/components/dashboard/MonthlyPayChart';
import UnitPayList from '~/components/dashboard/UnitPayList';
import { DashboardPageStyled } from '~/styles/pageStyled/dashboardPageStyled';

const DashboardPage = () => {
  const [day, setDay] = useState<Dayjs>(dayjs());

  const handleChangeDay = (day: Dayjs | null) => {
    if (day) return setDay(day);
  };

  const cardConfig = [
    {
      className: 'month-pay-chart-card',
      icon: <FcBarChart size={24} />,
      title: '월 수당 통계 차트',
      content: <MonthlyPayChart day={day} />,
    },
    {
      className: 'unit-pay-list-card',
      icon: <FaHouseFlag color="#f27373" size={19} />,
      title: '대행사 청구 단가',
      content: <UnitPayList day={day} />,
    },
    {
      className: 'month-attendance-table-card',
      icon: <FaCalendarDays color="#ffa963" size={19} />,
      title: '월별 출근 합계',
      content: <MonthlyAttendanceTable day={day} />,
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
