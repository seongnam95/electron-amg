import { useState } from 'react';

import { Flex, Modal, Segmented } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import DayTable from '~/components/attendance/DayTable';
import MonthTable from '~/components/attendance/MonthTable';
import AntDatePicker from '~/components/common/DatePicker';
import EmployeeInfoDrawer from '~/components/drawer/EmployeeInfoDrawer';
import AttendanceForm from '~/components/forms/AttendanceForm';
import {
  useAttendanceCreate,
  useAttendanceRemove,
  useAttendanceUpdate,
} from '~/hooks/queryHooks/useAttendanceQuery';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { useRemoveEmployee } from '~/hooks/useRemoveEmployee';
import { teamStore } from '~/stores/team';
import { AttendancePageStyled } from '~/styles/pageStyled/attendancePageStyled';

type ViewType = 'monthly' | 'daily';

const AttendancePage = () => {
  // state
  const team = useRecoilValue(teamStore);
  const [viewType, setViewType] = useState<ViewType>('daily');

  const [employeeId, setEmployeeId] = useState<string>();
  const [openEmployeeInfo, setOpenEmployeeInfo] = useState<boolean>(false);
  const [openAttendanceModal, setOpenAttendanceModal] = useState<boolean>(false);

  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());
  const date = selectedDay.format(viewType === 'daily' ? 'YY-MM-DD' : 'YY-MM');

  // hook
  const { employees } = useEmployeeQuery({ teamId: team?.id, enabled: team.existTeam });

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

  // 출근 기록 생성 핸들러
  const handleCreateAttendance = (ids: string[]) => {
    console.log(ids);
    setOpenAttendanceModal(true);
  };

  // 출근 기록 삭제
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

      <Modal
        title="근무 로그 변경"
        open={openAttendanceModal}
        centered
        width={340}
        footer={false}
        onCancel={() => setOpenAttendanceModal(false)}
      >
        <AttendanceForm onCancel={() => setOpenAttendanceModal(false)} />
      </Modal>
    </AttendancePageStyled>
  );
};

export default AttendancePage;
