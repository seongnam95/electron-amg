import { ForwardedRef, useState } from 'react';

import { Table } from 'antd';

import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { EmployeeData } from '~/types/employee';
import { TeamData } from '~/types/team';

import { DayTableStyled } from './styled';
import { ChangeValueType, getColumns, TableDataType } from './tableConfig';

export interface DayTableProps {
  date?: string;
  team?: TeamData;
  employees: EmployeeData[];
  tableWrapRef?: ForwardedRef<HTMLDivElement>;
  onRow?: {
    onClick?: (id: string, data: TableDataType) => void;
    onSelect?: (ids: string[]) => void;
  };
  onCell: {
    onChangeMealInclude: (v: ChangeValueType<boolean>) => void;
    onChangeIncentive: (v: ChangeValueType<number>) => void;
    onChangeDeduct: (v: ChangeValueType<number>) => void;
    onChangeMemo: (v: ChangeValueType<string>) => void;
  };
}

const DayTable = ({ date, team, employees, tableWrapRef, onCell }: DayTableProps) => {
  const [selectedAttendanceIds, setSelectedAttendanceIds] = useState<string[]>([]);

  const { attendances } = useAttendanceQuery({ teamId: team?.id, date: date, enabled: !!team });

  // Row 체크 핸들러
  const rowSelection = {
    selectedAttendanceIds,
    onChange: (keys: React.Key[]) => setSelectedAttendanceIds(keys.map(key => String(key))),
  };

  // 테이블 컬럼 불러오기, 핸들러
  const columns = getColumns({
    onChangeIncentive: onCell.onChangeIncentive,
    onChangeDeduct: onCell.onChangeDeduct,
    onClickMealInclude: onCell.onChangeMealInclude,
    onChangeMemo: onCell.onChangeMemo,
  });

  // 테이블 데이터 맵핑
  const dataSource: TableDataType[] = employees.map((employee, index) => {
    const attendance = attendances.find(data => data.employeeId === employee.id);
    return {
      key: employee.id,
      name: employee.name,
      position: employee.position,
      attendance: attendance,
    };
  });

  return (
    <DayTableStyled ref={tableWrapRef} className="AttendanceTable">
      <Table
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
      />

      {/* <DayTableFooter employees={employees} /> */}
    </DayTableStyled>
  );
};

export default DayTable;
