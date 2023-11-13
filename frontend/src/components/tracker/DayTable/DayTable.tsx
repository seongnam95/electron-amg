import { useState } from 'react';

import { Table } from 'antd';
import { Dayjs } from 'dayjs';

import { AttendanceData, EmployeeAttendanceData } from '~/types/attendance';

import AttendanceEditModal from '../AttendanceEditModal';
import { DayTableStyled } from './styled';
import {
  AttendanceDayTableColumns,
  AttendanceDayTableDataSource,
  ChangeValueType,
  TableDataType,
} from './tableConfig';

export interface DayTableProps {
  employees?: EmployeeAttendanceData[];
  date: Dayjs;
  onChangeIncentive?: (value: ChangeValueType) => void;
}

const DayTable = ({ employees, date }: DayTableProps) => {
  const [selectedAttendances, setSelectedAttendances] = useState<AttendanceData[]>([]);
  const [openEditor, setOpenEditor] = useState<boolean>(false);

  const handleRowClick = (data: TableDataType) => {
    const employee = employees?.find(e => e.id === data.key);
    if (employee?.attendances) {
      setSelectedAttendances([employee.attendances[0]]);
      setOpenEditor(true);
    }
  };

  return (
    <DayTableStyled className="AttendanceTable">
      <Table
        pagination={false}
        columns={AttendanceDayTableColumns}
        dataSource={AttendanceDayTableDataSource(date, employees)}
        rowSelection={{
          type: 'checkbox',
          onChange: () => {},
        }}
        onRow={data => {
          return {
            onClick: () => handleRowClick(data),
          };
        }}
      />
      <AttendanceEditModal
        open={openEditor}
        attendances={selectedAttendances}
        onCancel={() => setOpenEditor(false)}
      />
    </DayTableStyled>
  );
};

export default DayTable;
