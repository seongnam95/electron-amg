import { Flex, List, TableProps, Tag } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { teamStore } from '~/stores/team';
import { AttendanceData } from '~/types/attendance';

import { HintText } from '../MonthlyAttendanceTable/styled';
import { getDataSource } from './config';
import { UnitPayListStyled } from './styled';

export interface UnitPayListProps {
  attendances: AttendanceData[];
}

const UnitPayList = ({ attendances }: UnitPayListProps) => {
  const team = useRecoilValue(teamStore);

  const datas = getDataSource(team, attendances);

  return (
    <UnitPayListStyled className="UnitList">
      <List className="unit-list">
        {datas.map((data, idx) => {
          if (datas.length === idx + 1) return;

          return (
            <List.Item key={data.key}>
              <Flex>
                <span className="unit-name">{data.name}</span>
                <Tag className="unit-pay">{data.unitPay.toLocaleString()}</Tag>
              </Flex>

              <Flex gap={12} align="center">
                <p className="unit-total-pay">
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

      <Flex className="total-sum-footer" align="center" justify="space-between">
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
