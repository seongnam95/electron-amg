import { useState, Key } from 'react';
import { RiExchangeFundsLine } from 'react-icons/ri';

import { Button, Table, Tooltip } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';

import Dock from '~/components/common/Dock';
import {
  useAttendanceQuery,
  useAttendanceUpdateMutation,
} from '~/hooks/queryHooks/useAttendanceQuery';
import { useDragScroll } from '~/hooks/useDragScroll';
import { EmployeeData } from '~/types/employee';
import { TeamData } from '~/types/team';

import { ChangeValueType, getColumns, DayTableData } from './config';
import { DayTableStyled } from './styled';

export interface DayTableProps {
  date?: string;
  team?: TeamData;
  employees: EmployeeData[];
  onClickName: (id: string) => void;
}

const DayTable = ({ date, team, employees, onClickName }: DayTableProps) => {
  const scrollRef = useDragScroll();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const { attendances } = useAttendanceQuery({
    date: date,
    teamId: team?.id,
    enabled: team?.id !== '',
  });

  const { updateAttendanceMutate } = useAttendanceUpdateMutation({
    teamId: team?.id,
    date: date,
    onSuccess: data => console.log(data),
  });

  const handleChangeValue = ({ key, id, value }: ChangeValueType) => {
    if (value === undefined) return;
    updateAttendanceMutate({ ids: [id], body: { [key]: value } });
  };

  // Row 체크 핸들러
  const rowSelection: TableRowSelection<DayTableData> = {
    selectedRowKeys,
    onChange: (keys: Key[]) => setSelectedRowKeys(keys),
  };

  // 테이블 컬럼 불러오기, 핸들러
  const columns = getColumns({
    employees: employees,
    onClickName: onClickName,
    onChangeValue: handleChangeValue,
  });

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

  const hasSelected = selectedRowKeys.length > 0;
  return (
    <DayTableStyled ref={scrollRef} className="AttendanceTable">
      <Table
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
      />

      <Dock open={hasSelected}>
        <Tooltip title="일괄 변경" mouseEnterDelay={0.6}>
          <Button type="text" size="large" icon={<RiExchangeFundsLine size="2.1rem" />} />
        </Tooltip>
      </Dock>

      {/* <DayTableFooter employees={employees} /> */}
    </DayTableStyled>
  );
};

export default DayTable;
