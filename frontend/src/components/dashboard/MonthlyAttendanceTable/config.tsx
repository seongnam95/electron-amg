import { Flex, TableColumnsType } from 'antd';

import Info from '~/components/common/Info';
import ColorBar from '~/components/employee/ColorBar';
import { PositionData } from '~/types/position';
import { ReportData } from '~/types/statistics';

import { HintText } from './styled';

/** [ MonthlyAttendanceTable ] 컬럼 데이터를 반환합니다. */
export const getColumns = (): TableColumnsType<ReportData> => {
  return [
    {
      key: 'positionName',
      dataIndex: 'positionName',
      title: '직위',
      width: 100,
      align: 'left',
      render: (_, { target: { name, color } }) => (
        <Flex gap={8} align="center">
          <ColorBar color={color} height="1.5rem" />
          {name}
        </Flex>
      ),
    },
    {
      key: 'standardPay',
      dataIndex: 'standardPay',
      title: '일일 수당',
      width: 100,
      align: 'right',
      render: (_, { target: { standardPay } }) => (
        <>
          {standardPay.toLocaleString()}
          <HintText>원</HintText>
        </>
      ),
    },
    {
      key: 'totalAttendance',
      dataIndex: 'totalAttendance',
      title: '출근일',
      width: 100,
      align: 'right',
      render: (_, { attendanceCount }) => (
        <>
          {attendanceCount}
          <HintText>일</HintText>
        </>
      ),
    },
    {
      key: 'mealCostCount',
      dataIndex: 'mealCostCount',
      title: '식대',
      width: 100,
      align: 'center',
      render: (_, { mealCostCount }) => (
        <>
          {mealCostCount}
          <HintText>회</HintText>
        </>
      ),
    },
    {
      key: 'overtimeCount',
      dataIndex: 'overtimeCount',
      title: 'OT',
      width: 100,
      align: 'center',
      render: (_, { otCount }) => (
        <>
          {otCount}
          <HintText>시간</HintText>
        </>
      ),
    },
    {
      key: 'paidCount',
      dataIndex: 'paidCount',
      title: '선지급액',
      width: 100,
      align: 'right',
      render: (_, { prepaySum: prepay }) => (
        <>
          {prepay.toLocaleString()}
          <HintText>원</HintText>
        </>
      ),
    },
    {
      key: 'dailyPaySum',
      dataIndex: 'dailyPaySum',
      title: <Info title="일일 수당 + 식대 + OT - 선지급">급여 합계</Info>,
      width: 100,
      align: 'right',
      render: (_, { totalPaySum }) => (
        <>
          {totalPaySum.toLocaleString()}
          <HintText>원</HintText>
        </>
      ),
    },
    {
      key: 'tax',
      dataIndex: 'tax',
      title: <Info title="급여 합계 * 3.3%">소득세</Info>,
      width: 100,
      align: 'right',
      render: (_, { taxAmount }) => (
        <>
          {taxAmount.toLocaleString()}
          <HintText>원</HintText>
        </>
      ),
    },
    {
      key: 'totalSumPay',
      dataIndex: 'totalSumPay',
      title: (
        <Info title="급여 합계 - 소득세" placement="topRight">
          총 합계액
        </Info>
      ),
      width: 100,
      align: 'right',
      render: (_, { finalPay }) => (
        <>
          {finalPay.toLocaleString()}
          <HintText>원</HintText>
        </>
      ),
    },
  ];
};
