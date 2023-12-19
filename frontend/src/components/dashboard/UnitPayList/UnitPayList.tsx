import { Flex, List, TableProps, Tag } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { teamStore } from '~/stores/team';

import { HintText } from '../MonthlyAttendanceTable/styled';
import { getDataSource } from './config';
import { UnitPayListStyled } from './styled';

export interface UnitPayListProps {
  day?: Dayjs;
}

const UnitPayList = ({ day = dayjs() }: UnitPayListProps) => {
  const team = useRecoilValue(teamStore);

  const { attendances } = useAttendanceQuery({
    teamId: team.id,
    day: day,
    dayType: 'month',
    enabled: team.existTeam,
  });

  const datas = getDataSource(team, attendances);

  return (
    <UnitPayListStyled className="UnitTable">
      <List className="unit-list">
        {datas.map((data, idx) => {
          if (datas.length === idx + 1) return;

          return (
            <List.Item key={data.key}>
              <Flex>
                <span className="item-label">{data.name}</span>
                <Tag className="item-unit">{data.unitPay.toLocaleString()}</Tag>
              </Flex>

              <Flex gap={12} align="center">
                <p className="item-total">
                  {data.totalPay.toLocaleString()}
                  <HintText>원</HintText>
                </p>
                <Tag color="#f27373" style={{ width: '4rem', textAlign: 'center', marginRight: 0 }}>
                  {data.count}
                </Tag>
              </Flex>
            </List.Item>
          );
        })}
      </List>

      <Flex className="total-wrap" align="center" justify="space-between">
        <HintText>총 합계액</HintText>
        <Flex align="baseline">
          <span className="total-sum">{datas[datas.length - 1].totalPay.toLocaleString()}</span>
          <HintText>원</HintText>
        </Flex>
      </Flex>
    </UnitPayListStyled>
  );
};

export default UnitPayList;
