import { useState } from 'react';

import { Flex, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import Card from '~/components/common/Card';
import AntDatePicker from '~/components/common/DatePicker/DatePicker';
import AttendanceDoughnut from '~/components/dashboard/AttendanceDoughnut';
import MonthAttendanceTable from '~/components/dashboard/MonthAttendanceTable';
import MonthPayrollBar from '~/components/dashboard/MonthPayrollBar';
import UnitTable from '~/components/dashboard/UnitTable';
import { DashboardPageStyled } from '~/styles/pageStyled/dashboardPageStyled';

interface DayState {
  day: Dayjs;
  picker: 'date' | 'month';
}

interface DashboardDays {
  monthPayStats: DayState;
  monthUnitStats: DayState;
  monthAttendanceStats: DayState;
  dateAttendanceStats: DayState;
}

const DashboardPage = () => {
  const [days, setDays] = useState<DashboardDays>({
    monthPayStats: { day: dayjs(), picker: 'month' },
    monthUnitStats: { day: dayjs(), picker: 'month' },
    monthAttendanceStats: { day: dayjs(), picker: 'month' },
    dateAttendanceStats: { day: dayjs(), picker: 'date' },
  });

  const handleChangeDay = (key: keyof DashboardDays, day: Dayjs | null) => {
    if (!day) return;
    setDays(prev => ({ ...prev, [key]: { ...prev[key], day: day } }));
  };

  return (
    <DashboardPageStyled>
      <Space className="card-wrap" direction="vertical" size={24}>
        <Flex gap={20}>
          <Card
            title="📊 월 수당 통계"
            style={{ width: '100%' }}
            children={<MonthPayrollBar day={days.monthPayStats.day} />}
            extra={
              <AntDatePicker
                picker={days.monthPayStats.picker}
                value={days.monthPayStats.day}
                onChange={day => handleChangeDay('monthPayStats', day)}
              />
            }
          />
          <Card
            title="대행사 청구 단가"
            style={{ height: '38rem', minWidth: '41rem' }}
            children={<UnitTable day={days.monthUnitStats.day} />}
            extra={
              <AntDatePicker
                picker={days.monthUnitStats.picker}
                value={days.monthUnitStats.day}
                onChange={day => handleChangeDay('monthUnitStats', day)}
              />
            }
          />
        </Flex>
        <Card
          title="월별 출근 합계"
          style={{ height: '36rem' }}
          children={<MonthAttendanceTable day={days.monthAttendanceStats.day} />}
          extra={
            <AntDatePicker
              picker={days.monthAttendanceStats.picker}
              value={days.monthAttendanceStats.day}
              onChange={day => handleChangeDay('monthAttendanceStats', day)}
            />
          }
        />
        <Flex gap="2rem">
          <Card
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
          />
        </Flex>
      </Space>
    </DashboardPageStyled>
  );
};

export default DashboardPage;
