import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { Flex, Segmented } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilState, useRecoilValue } from 'recoil';

import DayTable from '~/components/attendance/DayTable';
import MonthTable from '~/components/attendance/MonthTable';
import AntDatePicker from '~/components/common/DatePicker';
import EmployeeInfoDrawer from '~/components/drawer/EmployeeInfoDrawer';
import { useAttendanceUpdateMutation } from '~/hooks/queryHooks/useAttendanceQuery';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { useAttendanceUpdateModal } from '~/hooks/useAttendanceUpdateModal';
import { useRemoveEmployee } from '~/hooks/useRemoveEmployee';
import { breadcrumbStore } from '~/stores/breadcrumb';
import { teamStore } from '~/stores/team';
import { AttendancePageStyled } from '~/styles/pageStyled/attendancePageStyled';

type ViewType = 'monthly' | 'daily';

const AttendancePage = () => {
  // state
  const team = useRecoilValue(teamStore);
  const [viewType, setViewType] = useState<ViewType>('daily');

  const [employeeId, setEmployeeId] = useState<string>();
  const [openEmployeeInfo, setOpenEmployeeInfo] = useState<boolean>(false);

  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());
  const date = selectedDay.format(viewType === 'daily' ? 'YY-MM-DD' : 'YY-MM');

  // hook
  const { employees } = useEmployeeQuery({ teamId: team?.id, enabled: team.existTeam });
  const { openModal, AttendanceUpdateModal } = useAttendanceUpdateModal(team?.id, date);

  const { updateAttendanceMutate } = useAttendanceUpdateMutation({
    teamId: team.id,
    date: date,
    onSuccess: data => console.log(data),
  });

  const { removeEmployee } = useRemoveEmployee({
    teamId: team.id,
    onSuccess: () => setOpenEmployeeInfo(false),
  });

  // handler
  const handleChangeDate = (date: Dayjs | null) => {
    if (date) setSelectedDay(date);
  };

  const handleClickName = (id: string) => {
    setEmployeeId(id);
    setOpenEmployeeInfo(true);
  };

  const selectedEmployee = employees.find(employee => employee.id === employeeId);
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
          <DayTable date={date} employees={employees} onClickName={handleClickName} />
        ) : (
          <MonthTable date={date} employees={employees} />
        )}
      </Flex>

      <Flex className="attendance-footer" align="center">
        팀장: 1000
      </Flex>

      {/* 근로자 정보 Drawer */}
      <EmployeeInfoDrawer
        open={openEmployeeInfo}
        employee={selectedEmployee}
        onRemove={removeEmployee}
        onClose={() => setOpenEmployeeInfo(false)}
      />

      {/* 일괄 업데이트 Modal */}
      <AttendanceUpdateModal />
    </AttendancePageStyled>
  );
};

export default AttendancePage;
