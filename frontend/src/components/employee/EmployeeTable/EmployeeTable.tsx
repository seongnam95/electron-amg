import { ReactNode, useEffect, useState } from 'react';
import React from 'react';

import { Skeleton } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import clsx from 'clsx';

import { EmployeeData } from '~/types/employee';

import Row from './Row';
import { EmployeeTableStyled } from './styled';

export interface EmployeeTableProps {
  employees: Array<EmployeeData>;
  className?: string;
}

const EmployeeTable = ({ employees, className }: EmployeeTableProps) => {
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 단일 체크박스 기준 전체 체크박스 활성화/비활성화
  useEffect(() => {
    setAllSelected(selectedIds.length > 0);
  }, [selectedIds]);

  // 전체 체크박스 클릭 핸들러
  const handleOnChangeAllChecked = (e: CheckboxChangeEvent) => {
    const isChecked = e.target.checked;
    setSelectedIds(isChecked ? employees.map(employee => employee.id) : []);
  };

  // 체크박스 클릭 핸들러
  const handleOnChangeChecked = (e: CheckboxChangeEvent) => {
    const targetId = e.target.id;
    if (targetId) {
      setSelectedIds(
        selectedIds.includes(targetId)
          ? selectedIds.filter(item => item !== targetId)
          : [...selectedIds, targetId],
      );
    }
  };

  return (
    <EmployeeTableStyled className={clsx('EmployeeTable', className)}>
      <div className="table-wrap">
        <table className="employee-table">
          <thead>
            <tr>
              <th>
                <Checkbox checked={allSelected} onChange={handleOnChangeAllChecked} />
              </th>
              <th>이름</th>
              <th>연락처</th>
              <th>거주지</th>
              <th>그룹</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => {
              return (
                <Row
                  key={employee.id}
                  employee={employee}
                  checked={selectedIds.includes(employee.id)}
                  onChecked={handleOnChangeChecked}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </EmployeeTableStyled>
  );
};

export default EmployeeTable;
