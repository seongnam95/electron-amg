import { Flex, TableColumnsType } from 'antd';

import TooltipText from '~/components/common/TooltipText';
import { PositionData } from '~/types/position';
import { ReportData } from '~/types/statistics';

import { HintText, PositionColorBox } from './styled';

export const getColumns = (): TableColumnsType<ReportData<PositionData>> => {
  return [
    {
      key: 'positionName',
      dataIndex: 'positionName',
      title: '직위',
      width: 100,
      align: 'left',
      render: (_, { target: { name, color } }) => (
        <Flex gap={8} align="center">
          <PositionColorBox color={color} />
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
      title: '총 출근일',
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
      title: '식대 포함',
      width: 100,
      align: 'right',
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
      align: 'right',
      render: (_, { otCount }) => (
        <>
          {otCount}
          <HintText>T</HintText>
        </>
      ),
    },
    {
      key: 'paidCount',
      dataIndex: 'paidCount',
      title: '선지급액',
      width: 100,
      align: 'right',
      render: (_, { prepay }) => (
        <>
          {prepay.toLocaleString()}
          <HintText>원</HintText>
        </>
      ),
    },
    {
      key: 'dailyPaySum',
      dataIndex: 'dailyPaySum',
      title: <TooltipText title="일일 수당 + 식대 + OT - 선지급">급여 합계</TooltipText>,
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
      title: <TooltipText title="급여 합계 * 3.3%">소득세</TooltipText>,
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
        <TooltipText title="급여 합계 - 소득세" placement="topRight">
          총 합계액
        </TooltipText>
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
