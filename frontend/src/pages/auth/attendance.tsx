import { MouseEvent, useState } from 'react';
import { RiExchangeFundsLine } from 'react-icons/ri';

import { Button, Card, Flex, Segmented, Space, Statistic, Tooltip } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import AttendanceStats from '~/components/attendance/AttendanceStats';
import DateTable from '~/components/attendance/DateTable';
import MonthTable from '~/components/attendance/MonthTable';
import AntDatePicker from '~/components/common/DatePicker';
import Dock from '~/components/common/Dock';
import { useAttendanceModal } from '~/hooks/componentHooks/useAttendanceModal';
import { useEmployeeInfoDrawer } from '~/hooks/componentHooks/useEmployeeInfoDrawer';
import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { teamStore } from '~/stores/team';
import { AttendancePageStyled } from '~/styles/pageStyled/attendancePageStyled';
import { EmployeeData } from '~/types/employee';

type ViewType = 'month' | 'date';

const AttendancePage = () => {
  const team = useRecoilValue(teamStore);

  const [viewType, setViewType] = useState<ViewType>('date');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());
  const [selectedEmployees, setSelectedEmployees] = useState<EmployeeData[]>([]);
  const selectedEmployeeIds = selectedEmployees.map(employee => employee.id);

  const { employees } = useEmployeeQuery({ teamId: team.id });
  const { attendances } = useAttendanceQuery({
    day: selectedDay,
    dayType: viewType,
    teamId: team.id,
  });

  const { openDrawer, renderDrawer } = useEmployeeInfoDrawer();
  const { openModal, renderModal } = useAttendanceModal({
    attendances: attendances,
    onFinish: () => {
      setSelectedEmployees([]);
      setIsEditing(false);
    },
  });

  const handleChangeDay = (day: Dayjs | null) => {
    if (day) setSelectedDay(day);
  };

  const handleContextMenu = (_: MouseEvent, employee: EmployeeData, day?: Dayjs) => {
    if (day) setSelectedDay(day);

    setIsEditing(true);
    setSelectedEmployees([employee]);
    openModal(day ?? selectedDay, [employee]);
  };

  const handleBulkEditClick = () => {
    setIsEditing(true);
    openModal(selectedDay, selectedEmployees);
  };

  const showDock = selectedEmployees.length > 0 && !isEditing;
  return (
    <AttendancePageStyled>
      {/* 컨트롤 바 */}
      <Flex align="center" justify="space-between" style={{ padding: '2rem' }}>
        <Segmented
          options={[
            { label: '일간', value: 'date' },
            { label: '월간', value: 'month' },
          ]}
          onChange={v => setViewType(v as ViewType)}
        />
        <AntDatePicker
          picker={viewType}
          value={selectedDay}
          defaultValue={selectedDay}
          onChange={handleChangeDay}
        />
      </Flex>

      <Flex className="attendance-content-wrap" vertical gap={24}>
        {/* 테이블 Wrap */}
        <Flex className="table-container" flex={1}>
          {viewType === 'date' ? (
            <DateTable
              employees={employees}
              attendances={attendances}
              disabledSelect={isEditing}
              selectedEmployeeIds={selectedEmployeeIds}
              onSelect={setSelectedEmployees}
              onClickName={openDrawer}
              onContextMenu={handleContextMenu}
            />
          ) : (
            <MonthTable
              day={selectedDay}
              employees={employees}
              attendances={attendances}
              onContextMenu={handleContextMenu}
            />
          )}

          <Dock open={showDock}>
            <Tooltip title="일괄 변경" placement="left" mouseEnterDelay={0.6}>
              <Button
                type="text"
                size="large"
                icon={<RiExchangeFundsLine size="2.1rem" />}
                onClick={handleBulkEditClick}
              />
            </Tooltip>
          </Dock>
        </Flex>

        <AttendanceStats attendances={attendances} />
      </Flex>

      {renderModal}
      {renderDrawer}
    </AttendancePageStyled>
  );
};

export default AttendancePage;
