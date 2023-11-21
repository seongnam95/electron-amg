import { useState } from 'react';

import { Flex, Segmented } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import AntDatePicker from '~/components/common/DatePicker';
import TeamSelector from '~/components/employee/TeamSelector';
import Header from '~/components/layouts/Header';
import DayTable from '~/components/tracker/DayTable';
import MonthTable2 from '~/components/tracker/MonthTable2';
import useEmployeeInfoDrawer from '~/hooks/componentHooks/useEmployeeInfoDrawer';
import { useAttendanceUpdateMutation } from '~/hooks/queryHooks/useAttendanceQuery';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { useTeamQuery } from '~/hooks/queryHooks/useTeamQuery';
import { useAttendanceUpdateModal } from '~/hooks/useAttendanceUpdateModal';
import { teamStore } from '~/stores/team';
import { userStore } from '~/stores/user';
import { AttendancePageStyled } from '~/styles/pageStyled/attendancePageStyled';

type ViewType = 'monthly' | 'daily';

const Attendance = () => {
  // state
  const { user } = useRecoilValue(userStore);
  const team = useRecoilValue(teamStore);

  const [viewType, setViewType] = useState<ViewType>('daily');
  const [selectedAttendanceIds, setSelectedAttendanceIds] = useState<string[]>([]);
  const [openEditor, setOpenEditor] = useState<boolean>(false);

  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());
  const selectedDayStr = selectedDay.format(viewType === 'daily' ? 'YY-MM-DD' : 'YY-MM');

  // hook
  const { openDrawer, EmployeeInfoDrawer } = useEmployeeInfoDrawer();
  const { teams } = useTeamQuery({ userId: user.id });
  const { employees } = useEmployeeQuery({ teamId: team?.id, enabled: team.id !== '' });
  const { openModal, contextHolder } = useAttendanceUpdateModal(team?.id, selectedDayStr);
  const { updateAttendanceMutate } = useAttendanceUpdateMutation({
    teamId: team.id,
    date: selectedDayStr,
    onSuccess: data => console.log(data),
  });

  // handler
  const handleChangeDate = (date: Dayjs | null) => {
    if (date) setSelectedDay(date);
  };

  const handleClickName = (id: string) => {
    const employee = employees.find(employee => employee.id === id);
    if (employee) openDrawer(employee);
  };

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
        <DayTable
          team={team}
          date={selectedDayStr}
          employees={employees}
          onClickName={handleClickName}
        />
      ) : (
        <MonthTable2 team={team} date={selectedDayStr} employees={employees} />
      )}

      {/* 근로자 정보 Drawer */}
      <EmployeeInfoDrawer />

      {contextHolder}
    </AttendancePageStyled>
  );
};

export default Attendance;
