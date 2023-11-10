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
  const columnAlphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const rowList = Array.from({ length: 20 }, (_, i) => i + 1);

  const newColumns = columnAlphabet.map((alpha, index) => {
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
          <tr className="column-title-row">
            <th></th>
            {columnAlphabet.map((alpha, columnIndex) => {
              return <th key={alpha}>{alpha}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rowList.map(row => {
            return (
              <tr>
                <td className="row-title">{row}</td>
                {columnAlphabet.map((r, tdIndex) => {
                  return <td></td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </ExcelTableStyled>
  );
};

export default ExcelTable;
