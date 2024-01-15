import { MouseEvent, useState } from 'react';
import { RiExchangeFundsLine } from 'react-icons/ri';

import { Button, Flex, Segmented, Tooltip } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import DailyOtherStats from '~/components/attendance/DailyOtherStats';
import DateTable from '~/components/attendance/DateTable';
import MonthTable from '~/components/attendance/MonthTable';
import Card from '~/components/common/Card';
import AntDatePicker from '~/components/common/DatePicker';
import Dock from '~/components/common/Dock';
import DailyAttendanceStats from '~/components/dashboard/DailyAttendanceStats';
import { useAttendanceModal } from '~/hooks/componentHooks/useAttendanceModal';
import { useEmployeeInfoDrawer } from '~/hooks/componentHooks/useEmployeeInfoDrawer';
import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { useEmployee } from '~/hooks/queryHooks/useEmployeeQuery';
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

  // Hooks
  const { employees } = useEmployee({ teamId: team.id });
  const filteredEmployees = employees.filter(employee => !employee.isVirtual);
  const { attendances, isLoading } = useAttendanceQuery({
    day: selectedDay,
    dayType: viewType,
    teamId: team.id,
  });

  // Modal, Drawer Hooks
  const { openDrawer, renderDrawer } = useEmployeeInfoDrawer();
  const { openModal, renderModal } = useAttendanceModal({
    attendances: attendances,
    onFinish: () => {
      setSelectedEmployees([]);
      setIsEditing(false);
    },
  });

  // 날짜 변경 핸들러
  const handleChangeDay = (day: Dayjs | null) => {
    if (day) setSelectedDay(day);
  };

  // 콘텍스트 메뉴 (우클릭) 핸들러
  const handleContextMenu = (_: MouseEvent, employee: EmployeeData, day?: Dayjs) => {
    setIsEditing(true);
    setSelectedEmployees([employee]);
    openModal(day ?? selectedDay, [employee]);
  };

  // 다중 편집 핸들러
  const handleBulkEditClick = () => {
    setIsEditing(true);
    openModal(selectedDay, selectedEmployees);
  };

  const showDock = selectedEmployees.length > 0 && !isEditing;
  return (
    <AttendancePageStyled>
      {/* 컨트롤 바 */}
      <Flex align="center" gap={12} style={{ padding: '2rem' }}>
        <Segmented
          options={[
            { label: '일간', value: 'date' },
            { label: '월간', value: 'month' },
          ]}
          onChange={view => setViewType(view as ViewType)}
        />
        <AntDatePicker
          picker={viewType}
          value={selectedDay}
          defaultValue={selectedDay}
          onChange={handleChangeDay}
        />
      </Flex>

      {/* 테이블 Wrap */}
      <Flex className="table-wrap">
        {viewType === 'date' ? (
          <Flex className="date-table-container">
            <DateTable
              employees={filteredEmployees}
              attendances={attendances}
              selectedEmployeeIds={selectedEmployeeIds}
              disabledSelect={isEditing}
              onClickName={openDrawer}
              onSelect={setSelectedEmployees}
              onContextMenu={handleContextMenu}
            />
            <Flex vertical gap={20}>
              <Card title="🙋‍♂️ 출근 현황" style={{ width: '26rem' }}>
                <DailyAttendanceStats team={team} employees={employees} attendances={attendances} />
              </Card>
              <Card title="기타 통계" style={{ width: '26rem' }}>
                <DailyOtherStats team={team} employees={employees} attendances={attendances} />
              </Card>
            </Flex>
          </Flex>
        ) : (
          <MonthTable
            day={selectedDay}
            loading={isLoading}
            employees={filteredEmployees}
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

      {renderModal}
      {renderDrawer}
    </AttendancePageStyled>
  );
};

export default AttendancePage;
