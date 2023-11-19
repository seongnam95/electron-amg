import { useEffect, useState } from 'react';

import { Flex, Segmented } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import AntDatePicker from '~/components/common/DatePicker';
import TeamSelector from '~/components/employee/TeamSelector';
import Header from '~/components/layouts/Header';
import DayTable from '~/components/tracker/DayTable';
import { ChangeValueType } from '~/components/tracker/DayTable/config';
import MonthTable from '~/components/tracker/MonthTable';
import MonthTable2 from '~/components/tracker/MonthTable2';
import { useAttendanceUpdateMutation } from '~/hooks/queryHooks/useAttendanceQuery';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { useTeamQuery } from '~/hooks/queryHooks/useTeamQuery';
import { useAttendanceUpdateModal } from '~/hooks/useAttendanceUpdateModal';
import { useDragScroll } from '~/hooks/useDragScroll';
import { userState } from '~/stores/user';
import { AttendancePageStyled } from '~/styles/pageStyled/attendancePageStyled';
import { AttendanceUpdateBody } from '~/types/attendance';
import { TeamData } from '~/types/team';

type ViewType = 'monthly' | 'daily';

interface ChangeValueMutateProps {
  key: keyof AttendanceUpdateBody;
  changeValue: ChangeValueType<any>;
}

const Attendance = () => {
  // state
  const { user } = useRecoilValue(userState);

  const [team, setTeam] = useState<TeamData>();
  const [viewType, setViewType] = useState<ViewType>('daily');
  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());
  const selectedDayStr = selectedDay.format(viewType === 'daily' ? 'YY-MM-DD' : 'YY-MM');

  const [selectedAttendanceIds, setSelectedAttendanceIds] = useState<string[]>([]);
  const [openEditor, setOpenEditor] = useState<boolean>(false);

  // hook
  const { teams } = useTeamQuery({ userId: user.id });
  const { employees } = useEmployeeQuery({ teamId: team?.id, enabled: !!team });

  const { openModal, contextHolder } = useAttendanceUpdateModal(team?.id, selectedDayStr);

  // 근무 로그 Update Mutate
  const { updateAttendanceMutate } = useAttendanceUpdateMutation({
    teamId: team?.id,
    date: selectedDayStr,
    onSuccess: data => console.log(data),
  });

  // selectedTeamId가 없을 때 teams가 불려왔을 경우 teams 첫 항목 ID 저장
  useEffect(() => {
    if (!team && teams.length > 0) setTeam(teams[0]);
  }, [teams]);

  // 팀 변경, 날짜 변경 핸들러
  const handleChangeTeam = (id: string) => setTeam(teams.find(t => t.id === id));
  const handleOnChangeDate = (date: Dayjs | null) => {
    if (date) setSelectedDay(date);
  };

  // 값 변경 핸들러
  const handleChangeValue = ({ key, changeValue }: ChangeValueMutateProps) => {
    const { id, value } = changeValue;
    if (value === undefined) return;

    updateAttendance({ ids: [id], body: { [key]: value } });
  };

  // Attendance Mutate 호출 함수
  const updateAttendance = ({ ids, body }: { ids: string[]; body: AttendanceUpdateBody }) => {
    updateAttendanceMutate({ ids: ids, body: body });
  };

  return (
    <AttendancePageStyled>
      <Header>
        <TeamSelector teams={teams} selectedId={team?.id} onSelect={handleChangeTeam} />
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
            onChange={handleOnChangeDate}
          />
        </Flex>
      </Header>

      {viewType === 'daily' ? (
        <DayTable
          team={team}
          date={selectedDayStr}
          employees={employees}
          onCell={{
            onChangeMealInclude: v => handleChangeValue({ key: 'isMealIncluded', changeValue: v }),
            onChangeIncentive: v => handleChangeValue({ key: 'incentive', changeValue: v }),
            onChangeDeduct: v => handleChangeValue({ key: 'deduct', changeValue: v }),
            onChangeMemo: v => handleChangeValue({ key: 'memo', changeValue: v }),
          }}
        />
      ) : (
        <MonthTable2 team={team} date={selectedDayStr} employees={employees} />
      )}

      {contextHolder}
    </AttendancePageStyled>
  );
};

export default Attendance;
