import { FaBowlFood, FaCircleCheck } from 'react-icons/fa6';
import { MdEditNote } from 'react-icons/md';

import { Button, Flex, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { HintText } from '~/components/dashboard/MonthlyAttendanceTable/styled';
import { colors } from '~/styles/themes';
import { AttendanceData } from '~/types/attendance';
import { EmployeeData, SALARY } from '~/types/employee';
import { PositionData } from '~/types/position';

/** [ DateTable ] 데이터 인터페이스 */
export interface DateTableData {
  key: string;
  employee: EmployeeData;
  position: PositionData;
  attendance?: AttendanceData;
}

/**
 * [ DateTable ] 데이터 소스를 반환합니다.
 * @param employees 근무자 데이터 리스트
 * @param attendances 출근 기록 데이터 리스트
 * @returns {DateTableData[]} DateTableData[]
 */
export const getDataSource = (
  employees: EmployeeData[],
  attendances: AttendanceData[],
): DateTableData[] => {
  const dataSource = employees.map(employee => {
    const attendance = attendances.find(data => data.employeeId === employee.id);
    const position = attendance ? attendance.position : employee.position;

    return {
      key: employee.id,
      name: employee.name,
      employee: employee,
      position: position,
      attendance: attendance,
    };
  });

  return dataSource.sort((a, b) => a.position.sortingIndex - b.position.sortingIndex);
};

/** [ DateTable ] 컬럼 인터페이스 */
interface ColumnProps {
  employees?: EmployeeData[];
  onClickName?: (employee: EmployeeData) => void;
}

/**
 * [ DateTable ] 컬럼 데이터를 반환합니다.
 * @param ColumnProps 대상 근무자 데이터, 핸들러
 */
export const getColumns = ({ employees, onClickName }: ColumnProps): ColumnsType<DateTableData> => {
  const positionFilters = [...new Set(employees?.map(employee => employee.position.name))].map(
    position => {
      return {
        value: position,
        text: position,
      };
    },
  );

  const salaryFilters = [...new Set(employees?.map(employee => employee.salaryCode))].map(
    salary => {
      return {
        value: salary,
        text: SALARY[salary],
      };
    },
  );

  return [
    {
      key: 'name',
      dataIndex: 'name',
      title: '이름',
      width: 90,
      ellipsis: true,
      fixed: 'left',
      sorter: (a, b) => a.employee.name.localeCompare(b.employee.name),
      render: (_, { employee }) => (
        <Button size="small" type="text" onClick={() => onClickName?.(employee)}>
          <b>{employee.name}</b>
        </Button>
      ),
    },
    {
      key: 'position',
      dataIndex: 'position',
      title: '직위',
      width: 90,
      align: 'center',
      filters: positionFilters,
      onFilter: (value, record) => record.employee.position.name === value,
      render: (_, { position }) => {
        return (
          <Tag
            style={{ width: 64, textAlign: 'center', marginInlineEnd: 0 }}
            color={position.color}
          >
            {position.name}
          </Tag>
        );
      },
    },
    {
      key: 'mealIncluded',
      dataIndex: 'mealIncluded',
      title: '식대 포함',
      width: 80,
      align: 'center',
      render: (_, { attendance }) => {
        if (attendance === undefined || !attendance.includeMealCost) return null;
        return (
          <Flex align="center" justify="center">
            <FaBowlFood color={colors.iconColor3} />
          </Flex>
        );
      },
    },
    {
      key: 'prePay',
      dataIndex: 'prePay',
      title: '선지급',
      width: 70,
      align: 'center',
      render: (_, { attendance }) => {
        if (attendance === undefined || !attendance.isPrepaid) return null;
        return (
          <Flex align="center" justify="center">
            <FaCircleCheck color={colors.success} />
          </Flex>
        );
      },
    },
    {
      key: 'otCount',
      dataIndex: 'otCount',
      title: 'OT',
      width: 90,
      align: 'center',
      render: (_, { attendance }) => {
        if (attendance === undefined || attendance.otCount === 0) return null;
        return (
          <Flex align="center" justify="center">
            {attendance.otCount}
            <HintText>T</HintText>
          </Flex>
        );
      },
    },
    {
      key: 'preset',
      dataIndex: 'preset',
      title: '프리셋',
      width: 90,
      align: 'center',
      render: (_, { attendance }) => {
        if (attendance === undefined || attendance.preset === 1) return null;
        return (
          <Flex align="center" justify="center" gap={4}>
            <HintText>*</HintText>
            {attendance.preset}
          </Flex>
        );
      },
    },
    {
      key: 'memo',
      dataIndex: 'memo',
      title: '메모',
      width: 50,
      align: 'center',
      render: (_, { attendance }) => {
        if (attendance === undefined || !attendance.memo) return null;
        return (
          <Flex justify="center">
            <Tooltip title={attendance.memo}>
              <Button type="text" size="small" icon={<MdEditNote size={20} color="#767676" />} />
            </Tooltip>
          </Flex>
        );
      },
    },
    {
      key: 'state',
      dataIndex: 'state',
      title: '상태',
      width: 80,
      fixed: 'right',
      align: 'center',
      render: (_, { attendance }) => {
        if (attendance === undefined)
          return (
            <Tag style={{ width: '100%', textAlign: 'center', marginInlineEnd: 0 }}>미출근</Tag>
          );
        return (
          <Tag color="#5855F5" style={{ width: '100%', textAlign: 'center', marginInlineEnd: 0 }}>
            출근
          </Tag>
        );
      },
    },
  ];
};
