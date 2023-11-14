import { useState } from 'react';

import { Table } from 'antd';
import { Dayjs } from 'dayjs';

import { useAttendanceUpdateModal } from '~/hooks/useAttendanceUpdateModal';
import { AttendanceData, AttendanceUpdateBody, EmployeeAttendanceData } from '~/types/attendance';

import { DayTableStyled } from './styled';
import {
  AttendanceDayTableColumns,
  AttendanceDayTableDataSource,
  TableDataType,
} from './tableConfig';

export interface DayTableProps {
  employees?: EmployeeAttendanceData[];
  date: Dayjs;
  onRow?: {
    onClick?: (attendanceId: string) => void;
    onSelect?: (attendanceIds: string[]) => void;
  };
}

const DayTable = ({ employees, date, onRow }: DayTableProps) => {
  const [selectedAttendanceIds, setSelectedAttendanceIds] = useState<string[]>([]);

  const handleRowClick = (data: TableDataType) => {
    if (data.attendanceId && onRow?.onClick) {
      onRow.onClick(data.attendanceId);
    }
  };

  return (
    <DayTableStyled className="AttendanceTable">
      <Table
        pagination={false}
        columns={AttendanceDayTableColumns}
        dataSource={AttendanceDayTableDataSource(employees)}
        rowSelection={{
          type: 'checkbox',
          onChange: keys => {
            setSelectedAttendanceIds(keys.map(key => String(key)));
          },
        }}
        onRow={data => {
          return {
            onClick: () => handleRowClick(data),
          };
        }}
      />
    </DayTableStyled>
  );
};

export default DayTable;
