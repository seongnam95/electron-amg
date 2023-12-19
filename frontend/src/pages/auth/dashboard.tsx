import { useRef, useState } from 'react';

import { Affix, Button, DatePicker, Flex, InputRef, Row, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import Card from '~/components/common/Card';
import AntDatePicker from '~/components/common/DatePicker/DatePicker';
import AttendanceDoughnut from '~/components/dashboard/AttendanceDoughnut';
import MonthAttendanceTable from '~/components/dashboard/MonthAttendanceTable';
import MonthPayrollBar from '~/components/dashboard/MonthPayrollBar';
import UnitTable from '~/components/dashboard/UnitTable';
import { DashboardPageStyled } from '~/styles/pageStyled/dashboardPageStyled';

const DashboardPage = () => {
  const [day, setDay] = useState<Dayjs>(dayjs());

  const handleChangeDay = (day: Dayjs | null) => {
    if (day) return setDay(day);
  };

  return (
    <DashboardPageStyled>
      <Flex className="control-bar" justify="end">
        <AntDatePicker picker="month" value={day} onChange={handleChangeDay} />
      </Flex>
      <div className="card-grid-wrap">
        <Card
          className="month-pay-chart-card"
          title="📊 월 수당 통계"
          children={<MonthPayrollBar day={day} />}
        />
        <Card
          className="unit-pay-list-card"
          title="대행사 청구 단가"
          children={<UnitTable day={day} />}
        />

        <Card
          className="month-attendance-table-card"
          title="월별 출근 합계"
          children={<MonthAttendanceTable day={day} />}
        />

        {/* <Card
            title="🙋‍♂️ 출근 현황"
            style={{ width: '32rem' }}
            children={<AttendanceDoughnut day={days.dateAttendanceStats.day} />}
            extra={
              <AntDatePicker
                picker={days.dateAttendanceStats.picker}
                value={days.dateAttendanceStats.day}
                onChange={day => handleChangeDay('dateAttendanceStats', day)}
              />
            }
          /> */}
      </div>
    </DashboardPageStyled>
  );
};

export default DashboardPage;
