import { useState } from 'react';

import { Flex, Segmented } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import DayTable from '~/components/attendance/DayTable';
import MonthTable from '~/components/attendance/MonthTable';
import MonthTable2 from '~/components/attendance/MonthTable2';
import AntDatePicker from '~/components/common/DatePicker';
import EmployeeInfoDrawer from '~/components/employee/EmployeeInfoDrawer';
import TeamSelector from '~/components/employee/TeamSelector';
import Header from '~/components/layouts/Header';
import { useAttendanceUpdateMutation } from '~/hooks/queryHooks/useAttendanceQuery';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { useTeamQuery } from '~/hooks/queryHooks/useTeamQuery';
import { useAttendanceUpdateModal } from '~/hooks/useAttendanceUpdateModal';
import { useRemoveEmployee } from '~/hooks/useRemoveEmployee';
import { teamStore } from '~/stores/team';
import { userStore } from '~/stores/user';
import { AttendancePageStyled } from '~/styles/pageStyled/attendancePageStyled';

type ViewType = 'monthly' | 'daily';

const Attendance = () => {
  // state
  const { user } = useRecoilValue(userStore);
  const team = useRecoilValue(teamStore);

  const [viewType, setViewType] = useState<ViewType>('daily');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openEditor, setOpenEditor] = useState<boolean>(false);

  const [employeeId, setEmployeeId] = useState<string>();
  const [openEmployeeInfo, setOpenEmployeeInfo] = useState<boolean>(false);

  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());
  const date = selectedDay.format(viewType === 'daily' ? 'YY-MM-DD' : 'YY-MM');

  // hook
  const { teams } = useTeamQuery({ userId: user.id });
  const { employees } = useEmployeeQuery({ teamId: team?.id, enabled: team.id !== '' });
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
      <Header>
        <TeamSelector teams={teams} />
        <Flex gap={14}>
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
      </Header>

      {viewType === 'daily' ? (
        <DayTable date={date} employees={employees} onClickName={handleClickName} />
      ) : (
        <MonthTable date={date} employees={employees} />
      )}

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

export default Attendance;
