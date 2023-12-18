import { Table, TableProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { teamStore } from '~/stores/team';

import { UnitTableData, getColumns, getDataSource } from './config';
import { UnitTableStyled } from './styled';

export interface UnitTableProps {
  day?: Dayjs;
}

const UnitTable = ({ day = dayjs() }: UnitTableProps) => {
  const team = useRecoilValue(teamStore);
  const { attendances } = useAttendanceQuery({
    teamId: team.id,
    day: day,
    dayType: 'month',
    enabled: team.existTeam,
  });

  const tableProps: TableProps<UnitTableData> = {
    columns: getColumns(),
    dataSource: getDataSource(team, attendances),
    pagination: false,
  };

  return (
    <UnitTableStyled className="UnitTable">
      <Table {...tableProps} />
    </UnitTableStyled>
  );
};

export default UnitTable;
