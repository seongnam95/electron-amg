import { useEffect, useState } from 'react';
import { RiExchangeFundsLine } from 'react-icons/ri';

import { Button, Flex, Segmented, Tooltip } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import DayTable from '~/components/attendance/DayTable';
import MonthTable from '~/components/attendance/MonthTable';
import AntDatePicker from '~/components/common/DatePicker';
import Dock from '~/components/common/Dock';
import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { useAttendanceModal } from '~/hooks/useAttendanceModal';
import { useEmployeeInfoDrawer } from '~/hooks/useEmployeeInfoDrawer';
import { teamStore } from '~/stores/team';
import { AttendancePageStyled } from '~/styles/pageStyled/attendancePageStyled';
import { AttendanceData } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';

type ViewType = 'monthly' | 'daily';
const AttendancePage = () => {
  // state
  const team = useRecoilValue(teamStore);

  const [viewType, setViewType] = useState<ViewType>('daily');
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());
  const dateStr = selectedDay.format(viewType === 'daily' ? 'YY-MM-DD' : 'YY-MM');

  // hook
  const { openDrawer, renderDrawer } = useEmployeeInfoDrawer();
  const { openModal, renderModal } = useAttendanceModal({
    date: selectedDay,
    onFinish: () => {
      setIsWorking(false);
    },
  });

  const { employees } = useEmployeeQuery({ teamId: team?.id, enabled: team.existTeam });
  const { attendances } = useAttendanceQuery({
    dateStr: dateStr,
    teamId: team.id,
    enabled: team.existTeam,
  });

  // 날짜 변경 핸들러
  const handleChangeDate = (date: Dayjs | null) => {
    if (date) setSelectedDay(date);
  };

  const handleSelect = (ids: string[]) => setSelectedEmployeeIds(ids);
  const handleCollectiveChange = () => {
    setIsWorking(true);
    openModal({ employeeIds: selectedEmployeeIds });
  };
  const handleContextMenu = (employee: EmployeeData, attendance?: AttendanceData) => {
    setIsWorking(true);
    openModal({
      employeeIds: [employee.id],
      initValues: attendance ? attendance : undefined,
    });
  };

  const showDock = selectedEmployeeIds.length > 0 && !isWorking;
  return (
    <AttendancePageStyled>
      {/* 컨트롤 바 */}
      <Flex align="center" justify="space-between" style={{ padding: '2rem' }}>
        <Segmented
          options={[
            { label: '일간', value: 'daily' },
            { label: '월간', value: 'monthly' },
          ]}
          onChange={v => setViewType(v as ViewType)}
        />
        <AntDatePicker
          picker={viewType === 'monthly' ? 'month' : 'date'}
          defaultValue={selectedDay}
          onChange={handleChangeDate}
        />
      </Flex>

      {/* 테이블 Wrap */}
      <Flex className="table-container" flex={1}>
        {viewType === 'daily' ? (
          <DayTable
            employees={employees}
            attendances={attendances}
            onSelect={handleSelect}
            onClickName={openDrawer}
            onContextMenu={handleContextMenu}
          />
        ) : (
          <MonthTable dateStr={dateStr} employees={employees} attendances={attendances} />
        )}

        <Dock open={showDock}>
          <Tooltip title="일괄 변경" mouseEnterDelay={0.6}>
            <Button
              type="text"
              size="large"
              icon={<RiExchangeFundsLine size="2.1rem" />}
              onClick={handleCollectiveChange}
            />
          </Tooltip>
        </Dock>
      </Flex>

      {renderDrawer}
      {renderModal}
    </AttendancePageStyled>
  );
};

export default AttendancePage;
