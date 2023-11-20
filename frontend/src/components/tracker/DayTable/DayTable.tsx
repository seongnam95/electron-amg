import { ForwardedRef, useState } from 'react';
import { RiExchangeFundsLine } from 'react-icons/ri';

import { Button, Table, Tooltip } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';

import Dock from '~/components/common/Dock';
import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { useDragScroll } from '~/hooks/useDragScroll';
import { EmployeeData } from '~/types/employee';
import { TeamData } from '~/types/team';

import { ChangeValueType, getColumns, DayTableData } from './config';
import { DayTableStyled } from './styled';

export interface DayTableProps {
  date?: string;
  team?: TeamData;
  employees: EmployeeData[];
  onCell: {
    onClickName: (id: string) => void;
    onChangeMealInclude: (v: ChangeValueType<boolean>) => void;
    onChangeIncentive: (v: ChangeValueType<number>) => void;
    onChangeDeduct: (v: ChangeValueType<number>) => void;
    onChangeMemo: (v: ChangeValueType<string>) => void;
  };
}

const DayTable = ({ date, team, employees, onCell }: DayTableProps) => {
  const { attendances } = useAttendanceQuery({ teamId: team?.id, date: date, enabled: !!team });
  const [attendanceIds, setAttendanceIds] = useState<string[]>([]);
  const isSelected = attendanceIds.length > 0;

  const scrollRef = useDragScroll();

  // 테이블 컬럼 불러오기, 핸들러
  const columns = getColumns({
    employees: employees,
    onClickName: onCell.onClickName,
    onChangeIncentive: onCell.onChangeIncentive,
    onChangeDeduct: onCell.onChangeDeduct,
    onClickMealInclude: onCell.onChangeMealInclude,
    onChangeMemo: onCell.onChangeMemo,
  });

  // Row 체크 핸들러
  const rowSelection: TableRowSelection<DayTableData> = {
    fixed: 'left',
    onChange: (keys: React.Key[]) => setAttendanceIds(keys.map(key => String(key))),
  };

  // 테이블 데이터 맵핑
  const dataSource: DayTableData[] = employees.map(employee => {
    const attendance = attendances.find(data => data.employeeId === employee.id);
    return {
      key: employee.id,
      name: employee.name,
      position: employee.position,
      attendance: attendance,
    };
  });

  return (
    <DayTableStyled ref={scrollRef} className="AttendanceTable">
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
