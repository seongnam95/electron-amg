import { MouseEvent, useState } from 'react';
import { RiExchangeFundsLine } from 'react-icons/ri';

import { Button, Flex, Segmented, Tooltip } from 'antd';
import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import ContextPopup from '~/components/attendance/ContextPopup';
import DayTable from '~/components/attendance/DayTable';
import MonthTable from '~/components/attendance/MonthTable';
import AntDatePicker from '~/components/common/DatePicker';
import Dock from '~/components/common/Dock';
import AttendanceForm from '~/components/forms/AttendanceForm';
import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { useAttendanceModal } from '~/hooks/useAttendanceModal';
import { useEmployeeInfoDrawer } from '~/hooks/useEmployeeInfoDrawer';
import { teamStore } from '~/stores/team';
import { AttendancePageStyled } from '~/styles/pageStyled/attendancePageStyled';
import { EmployeeData } from '~/types/employee';

type ViewType = 'month' | 'day';

const AttendancePage = () => {
  const team = useRecoilValue(teamStore);

  const [viewType, setViewType] = useState<ViewType>('day');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);

  const { openDrawer, renderDrawer } = useEmployeeInfoDrawer();
  const { openModal, renderModal } = useAttendanceModal({ onFinish: () => setIsEditing(false) });

  const { employees } = useEmployeeQuery({ teamId: team?.id, enabled: team.existTeam });
  const { attendances } = useAttendanceQuery({
    date: selectedDate,
    dateType: viewType,
    teamId: team.id,
    enabled: team.existTeam,
  });

  // 날짜 변경 핸들러
  const handleChangeDate = (date: Dayjs | null) => {
    if (date) setSelectedDate(date);
  };

  const handleSelect = (ids: string[]) => setSelectedEmployeeIds(ids);
  const handleCollectiveChange = () => {
    setIsEditing(true);
    openModal({ date: selectedDate, employeeIds: selectedEmployeeIds });
  };

  const handleContextMenu = (event: MouseEvent, employee: EmployeeData) => {
    setIsEditing(true);
    console.log(event, employee);
  };

  const EditorSubtitle = <></>;

  const showDock = selectedEmployeeIds.length > 0 && !isEditing;
  return (
    <AttendancePageStyled>
      {/* 컨트롤 바 */}
      <Flex align="center" justify="space-between" style={{ padding: '2rem' }}>
        <Segmented
          options={[
            { label: '일간', value: 'day' },
            { label: '월간', value: 'month' },
          ]}
          onChange={v => setViewType(v as ViewType)}
        />
        <AntDatePicker
          picker={viewType === 'month' ? 'month' : 'date'}
          defaultValue={selectedDate}
          onChange={handleChangeDate}
        />
      </Flex>

      {/* 테이블 Wrap */}
      <Flex className="table-container" flex={1}>
        <ContextPopup
          title="근무 기록 추가/변경"
          content={<AttendanceForm onSubmit={v => console.log(v)} />}
          onCancel={() => setIsEditing(false)}
        >
          {viewType === 'day' ? (
            <DayTable
              employees={employees}
              attendances={attendances}
              onSelect={handleSelect}
              onClickName={openDrawer}
              onContextMenu={handleContextMenu}
            />
          ) : (
            <MonthTable
              date={selectedDate}
              employees={employees}
              attendances={attendances}
              onContextMenu={handleContextMenu}
            />
          )}
        </ContextPopup>

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
