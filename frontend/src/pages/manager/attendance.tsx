import { useEffect, useState } from 'react';

import { Flex, Segmented } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import AntDatePicker from '~/components/common/DatePicker';
import TeamSelector from '~/components/employee/TeamSelector';
import Header from '~/components/layouts/Header';
import DayTable from '~/components/tracker/DayTable';
import { TableDataType } from '~/components/tracker/DayTable/tableConfig';
import {
  useAttendanceQuery,
  useAttendanceUpdateMutation,
} from '~/hooks/queryHooks/useAttendanceQuery';
import { useTeamQuery } from '~/hooks/queryHooks/useTeamQuery';
import { useAttendanceUpdateModal } from '~/hooks/useAttendanceUpdateModal';
import { useDragScroll } from '~/hooks/useDragScroll';
import { userState } from '~/stores/user';
import { AttendancePageStyled } from '~/styles/pageStyled/attendancePageStyled';
import { AttendanceUpdateBody } from '~/types/attendance';

type ViewType = 'monthly' | 'daily';

const Attendance = () => {
  // state
  const { user } = useRecoilValue(userState);

  const [teamId, setTeamId] = useState<string>();
  const [viewType, setViewType] = useState<ViewType>('daily');
  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());
  const selectedDayStr = selectedDay.format(viewType === 'daily' ? 'YY-MM-DD' : 'YY-MM');

  const [selectedAttendanceIds, setSelectedAttendanceIds] = useState<string[]>([]);
  const [openEditor, setOpenEditor] = useState<boolean>(false);

  // hook
  const dragRef = useDragScroll();
  const { teams } = useTeamQuery({ userId: user.id });
  const { openModal, contextHolder } = useAttendanceUpdateModal(teamId, selectedDayStr);

  const { employees } = useAttendanceQuery({
    teamId: teamId,
    date: selectedDayStr,
    enabled: !!teamId,
  });

  // 근무 로그 업데이트
  const { updateAttendanceMutate } = useAttendanceUpdateMutation({
    teamId: teamId,
    date: selectedDayStr,
    onSuccess: data => console.log(data),
  });

  // selectedTeamId가 없을 때 teams가 불려왔을 경우 teams 첫 항목 ID 저장
  useEffect(() => {
    if (!teamId && teams.length > 0) setTeamId(teams[0].id);
  }, [teams]);

  //
  const updateAttendance = ({ ids, body }: { ids: string[]; body: AttendanceUpdateBody }) => {
    updateAttendanceMutate({ ids: ids, body: body });
  };

  // 팀 변경, 날짜 변경 핸들러
  const handleChangeTeam = (id: string) => setTeamId(id);
  const handleOnChangeDate = (date: Dayjs | null) => {
    if (date) setSelectedDay(date);
  };

  //
  const handleRowClick = (id: string, data: TableDataType) => {
    openModal([id], { ...data });
  };

  const handleRowSelect = (ids: string[]) => setSelectedAttendanceIds(ids);

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

      <DayTable
        date={selectedDay}
        employees={employees}
        onRow={{
          onClick: handleRowClick,
          onSelect: handleRowSelect,
        }}
        onCell={{
          onChangeMealInclude: v =>
            updateAttendance({
              ids: [v.id],
              body: { isMealIncluded: v.value ? v.value : undefined },
            }),
          onChangeIncentive: v =>
            updateAttendance({
              ids: [v.id],
              body: { incentive: v.value !== null ? v.value : undefined },
            }),
          onChangeDeduct: v =>
            updateAttendance({
              ids: [v.id],
              body: { deduct: v.value !== null ? v.value : undefined },
            }),
          onChangeMemo: v =>
            updateAttendance({
              ids: [v.id],
              body: { memo: v.value !== null ? v.value : undefined },
            }),
        }}
      />

      {contextHolder}
    </AttendancePageStyled>
  );
};

export default Attendance;
