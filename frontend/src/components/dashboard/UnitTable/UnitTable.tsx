import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { teamStore } from '~/stores/team';

import { UnitTableStyled } from './styled';

export interface UnitTableProps {
  date?: Dayjs;
}

const UnitTable = ({ date = dayjs() }: UnitTableProps) => {
  const team = useRecoilValue(teamStore);
  const { attendances } = useAttendanceQuery({
    teamId: team.id,
    dateStr: date.format('YY-MM'),
    enabled: team.existTeam,
  });

  const mapping = team.units.map(unit => {
    return {
      ...unit,
      attendances: attendances.filter(attendance => attendance.position.unitId === unit.id),
    };
  });

  return (
    <UnitTableStyled className="UnitTable">
      {mapping &&
        mapping.map(unit => (
          <div key={unit.id}>
            {unit.name} / {unit.unitPay} / {unit.attendances.length}
          </div>
        ))}
    </UnitTableStyled>
  );
};

export default UnitTable;
