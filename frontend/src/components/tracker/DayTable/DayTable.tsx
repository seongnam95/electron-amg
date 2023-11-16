import { ForwardedRef, useState } from 'react';
import { RiExchangeFundsLine } from 'react-icons/ri';

import { Button, Table, Tooltip } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';

import Dock from '~/components/common/Dock';
import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { EmployeeData } from '~/types/employee';
import { TeamData } from '~/types/team';

import { ChangeValueType, getColumns, DayTableDataType } from './config';
import { DayTableStyled } from './styled';

export interface DayTableProps {
  date?: string;
  team?: TeamData;
  employees: EmployeeData[];
  tableWrapRef?: ForwardedRef<HTMLDivElement>;
  onCell: {
    onChangeMealInclude: (v: ChangeValueType<boolean>) => void;
    onChangeIncentive: (v: ChangeValueType<number>) => void;
    onChangeDeduct: (v: ChangeValueType<number>) => void;
    onChangeMemo: (v: ChangeValueType<string>) => void;
  };
}

const DayTable = ({ date, team, employees, tableWrapRef, onCell }: DayTableProps) => {
  const { attendances } = useAttendanceQuery({ teamId: team?.id, date: date, enabled: !!team });
  const [attendanceIds, setAttendanceIds] = useState<string[]>([]);
  const isSelected = attendanceIds.length > 0;

  // 테이블 컬럼 불러오기, 핸들러
  const columns = getColumns({
    onChangeIncentive: onCell.onChangeIncentive,
    onChangeDeduct: onCell.onChangeDeduct,
    onClickMealInclude: onCell.onChangeMealInclude,
    onChangeMemo: onCell.onChangeMemo,
  });

  // Row 체크 핸들러
  const rowSelection: TableRowSelection<DayTableDataType> = {
    onChange: (keys: React.Key[]) => setAttendanceIds(keys.map(key => String(key))),
  };

  // 테이블 데이터 맵핑
  const dataSource: DayTableDataType[] = employees.map((employee, index) => {
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

      <Dock open={isSelected}>
        <Tooltip title="일괄 변경" mouseEnterDelay={0.6}>
          <Button type="text" size="large" icon={<RiExchangeFundsLine size="2.1rem" />} />
        </Tooltip>
      </Dock>

      {/* <DayTableFooter employees={employees} /> */}
    </DayTableStyled>
  );
};

export default DayTable;
