import { useEffect, useState } from 'react';

import { Flex, Segmented } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import AntDatePicker from '~/components/common/DatePicker';
import TeamSelector from '~/components/employee/TeamSelector';
import Header from '~/components/layouts/Header';
import DayTable from '~/components/tracker/DayTable';
import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { useTeamQuery } from '~/hooks/queryHooks/useTeamQuery';
import { useDragScroll } from '~/hooks/useDragScroll';
import { userState } from '~/stores/user';
import { AttendancePageStyled } from '~/styles/pageStyled/attendancePageStyled';

type ViewType = 'monthly' | 'daily';

const Attendance = () => {
  const { user } = useRecoilValue(userState);
  const [teamId, setTeamId] = useState<string>();
  const [viewType, setViewType] = useState<ViewType>('daily');
  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());
  const selectedDayStr = selectedDay.format(viewType === 'daily' ? 'YY-MM-DD' : 'YY-MM');

  const dragRef = useDragScroll();
  const { teams } = useTeamQuery({ userId: user.id });
  const { attendances } = useAttendanceQuery({
    teamId: teamId,
    date: selectedDayStr,
    enabled: !!teamId,
  });

  // selectedTeamId가 없을 때 teams가 불려왔을 경우 teams 첫 항목 ID 저장
  useEffect(() => {
    if (!teamId && teams.length > 0) setTeamId(teams[0].id);
  }, [teams]);

  const handleChangeTeam = (id: string) => setTeamId(id);
  const handleOnChangeDate = (date: Dayjs | null) => {
    if (date) setSelectedDay(date);
  };

  return (
    <AttendancePageStyled>
      <Header>
        <TeamSelector teams={teams} selectedId={teamId} onSelect={handleChangeTeam} />
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

      <DayTable date={selectedDay} employees={attendances} />
      {/* <div className="table-wrap" ref={dragRef}>
        {viewType === 'month' ? (
          <MonthTable selectedDay={selectedDay} employees={employees} />
        ) : (
          <DayTable />
        )}
      </div> */}
    </AttendancePageStyled>
  );
};

export default Attendance;
