import { useState } from 'react';

import { Table } from 'antd';
import { Dayjs } from 'dayjs';

import { EmployeeAttendanceData } from '~/types/attendance';

import { DayTableStyled } from './styled';
import { ChangeValueType, getColumns, getDataSource, TableDataType } from './tableConfig';

export interface DayTableProps {
  employees?: EmployeeAttendanceData[];
  date: Dayjs;
  onRow?: {
    onClick?: (id: string, data: TableDataType) => void;
    onSelect?: (ids: string[]) => void;
  };
  onCell?: {
    onChangeMealInclude?: (v: ChangeValueType<boolean>) => void;
    onChangeIncentive?: (v: ChangeValueType<number>) => void;
    onChangeDeduct?: (v: ChangeValueType<number>) => void;
    onChangeMemo?: (v: ChangeValueType<string>) => void;
  };
}

const DayTable = ({ employees, onCell }: DayTableProps) => {
  const [selectedAttendanceIds, setSelectedAttendanceIds] = useState<string[]>([]);

  const onSelectedAttendanceIdsChange = (keys: React.Key[]) => {
    setSelectedAttendanceIds(keys.map(key => String(key)));
  };

  const rowSelection = {
    selectedAttendanceIds,
    onChange: onSelectedAttendanceIdsChange,
  };

  const dataSource = getDataSource(employees);
  const columns = getColumns({
    onChangeIncentive: onCell?.onChangeIncentive,
    onChangeDeduct: onCell?.onChangeDeduct,
    onClickMealInclude: onCell?.onChangeMealInclude,
    onChangeMemo: onCell?.onChangeMemo,
  });

  return (
    <DayTableStyled className="AttendanceTable">
      <Table
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
      />
    </DayTableStyled>
  );
};

export default DayTable;
