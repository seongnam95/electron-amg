import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { Table, DrawerProps, Drawer, Button, Tag, Space } from 'antd';
import { ColumnsType } from 'antd/es/table/interface';

import { EmployeeDetailData } from '~/types/employee';

import { ExcelTableStyled } from './styled';

interface ColumnData {
  key: string;
  title: string;
}

interface ExcelTableProps extends DrawerProps {
  columns: ColumnData[];
  employees?: EmployeeDetailData[];
}

const ExcelTable = ({ columns }: ExcelTableProps) => {
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  const newColumns = alphabet.map((alpha, index) => {
    if (columns[index]) {
      return columns[index];
    }
    return {
      key: alpha,
      title: alpha,
    };
  });

  return (
    <ExcelTableStyled>
      <table>
        <thead>
          <tr>
            {newColumns.map(column => {
              return <th key={column.key}>{column.title}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {newColumns.map(column => {
            return <th key={column.key}>{column.title}</th>;
          })}
        </tbody>
      </table>
    </ExcelTableStyled>
  );
};

export default ExcelTable;
