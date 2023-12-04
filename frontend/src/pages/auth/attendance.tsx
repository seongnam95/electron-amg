import { useState } from 'react';

import { Flex, Segmented } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import DayTable from '~/components/attendance/DayTable';
import MonthTable from '~/components/attendance/MonthTable';
import AntDatePicker from '~/components/common/DatePicker';
import EmployeeInfoDrawer from '~/components/drawer/EmployeeInfoDrawer';
import {
  useAttendanceCreate,
  useAttendanceRemove,
  useAttendanceUpdate,
} from '~/hooks/queryHooks/useAttendanceQuery';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { useAttendanceUpdateModal } from '~/hooks/useAttendanceUpdateModal';
import { useRemoveEmployee } from '~/hooks/useRemoveEmployee';
import { teamStore } from '~/stores/team';
import { AttendancePageStyled } from '~/styles/pageStyled/attendancePageStyled';
import { AttendanceCreateBody } from '~/types/attendance';

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

  // 출근 업데이트
  const { createAttendanceCreate } = useAttendanceCreate({ teamId: team.id, date: date });
  const { removeAttendanceMutate } = useAttendanceRemove({ teamId: team.id, date: date });
  const { updateAttendanceMutate } = useAttendanceUpdate({ teamId: team.id, date: date });

  // 근로자 삭제
  const { removeEmployee } = useRemoveEmployee({
    teamId: team.id,
    onSuccess: () => setOpenEmployeeInfo(false),
  });

  // 날짜 변경 핸들러
  const handleChangeDate = (date: Dayjs | null) => {
    if (date) setSelectedDay(date);
  };

  // 이름 클릭 핸들러
  const handleClickName = (id: string) => {
    setEmployeeId(id);
    setOpenEmployeeInfo(true);
  };

  const handleCreateAttendance = (ids: string[]) => {
    const bodys: AttendanceCreateBody[] = ids.map(id => ({
      employeeId: id,
      workingDate: date,
    }));
    createAttendanceCreate(bodys);
  };

  const handleRemoveAttendance = (ids: string[]) => {
    removeAttendanceMutate(ids);
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
          <DayTable
            date={date}
            employees={employees}
            onClick={handleClickName}
            onCreate={handleCreateAttendance}
            onCancel={handleRemoveAttendance}
          />
        ) : (
          <MonthTable date={date} employees={employees} />
        )}
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
