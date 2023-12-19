import { Flex, List, Table, TableProps, Tag } from 'antd';
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
  const datas = getDataSource(team, attendances);

  const tableProps: TableProps<UnitTableData> = {
    columns: getColumns(),
    dataSource: getDataSource(team, attendances),
    pagination: false,
  };

  return (
    <UnitTableStyled className="UnitTable">
      <List>
        {datas.map(data => {
          return (
            <List.Item key={data.key}>
              <Flex style={{ width: '13rem' }}>
                <span className="item-label">{data.name}</span>
                <Tag className="item-unit">{data.unitPay.toLocaleString()}</Tag>
              </Flex>
              <Flex>
                <Tag color="#f27373" style={{ width: '4rem', textAlign: 'center' }}>
                  {data.count}
                </Tag>
                <p className="item-total">
                  \ <b>{data.totalPay.toLocaleString()}</b>
                </p>
              </Flex>
            </List.Item>
          );
        })}
      </List>
    </UnitTableStyled>
  );
};

export default UnitTable;
