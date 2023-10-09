import { useEffect, useMemo, useState } from 'react';

import { Empty, Skeleton } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import clsx from 'clsx';

import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { EmployeeData } from '~/types/employee';

import EmployeeTableControlBar, { Sort } from './EmployeeTableControlBar';
import EmployeeListItem from './EmployeeTableItem';
import { EmployeeTableStyled } from './styled';

export interface EmployeeTableProps {
  className?: string;
  onClick?: (employee: EmployeeData) => void;
}

const EmployeeTable = ({ className, onClick }: EmployeeTableProps) => {
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>(Sort.NORMAL);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { employees, isEmployeeLoading } = useEmployeeQuery();
  const isEmptyEmployee = employees.length === 0;

  // Employee 키워드 검색
  const searchEmployee = (data: Array<EmployeeData>): Array<EmployeeData> => {
    return data.filter(
      employee =>
        employee.name.includes(searchTerm) ||
        employee.residence.includes(searchTerm) ||
        employee.phone.includes(searchTerm),
    );
  };

  // Employee 정렬 방식
  const sortedEmployees = useMemo(() => {
    let filteredEmployees: Array<EmployeeData> = searchTerm ? searchEmployee(employees) : employees;

    switch (sort) {
      case Sort.NAME:
        return [...filteredEmployees].sort((a, b) => a.name.localeCompare(b.name));

      case Sort.NORMAL:
      default:
        return filteredEmployees;
    }
  }, [employees, searchTerm, sort]);

  // 단일 체크박스 기준 전체 체크박스 활성화/비활성화
  useEffect(() => {
    setAllSelected(selectedIds.length === employees.length);
  }, [selectedIds]);

  // 전체 체크박스 클릭 핸들러
  const handleOnChangeAllChecked = (e: CheckboxChangeEvent) => {
    setSelectedIds(e.target.checked ? employees.map(employee => employee.id) : []);
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
      <EmployeeTableControlBar
        onMoveGroup={() => {}}
        onSearch={e => setSearchTerm(e.target.value)}
        onChangeSort={sort => setSort(sort)}
        checked={!!selectedIds.length}
      />
      <div className="table-wrap">
        {!isEmployeeLoading ? (
          !isEmptyEmployee ? (
            <table className="employee-table">
              <thead>
                <tr>
                  <th>
                    <Checkbox />
                  </th>
                  <th>이름</th>
                  <th>연락처</th>
                  <th>거주지</th>
                  <th>그룹</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sortedEmployees.map(employee => {
                  return (
                    <EmployeeListItem
                      key={employee.id}
                      employee={employee}
                      checked={selectedIds.includes(employee.id)}
                      onChecked={handleOnChangeChecked}
                    />
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="empty-wrap">
              <Empty description="그룹이 비었습니다" />
            </div>
          )
        ) : (
          <Skeleton active style={{ padding: '2rem' }} />
        )}
      </div>
    </EmployeeTableStyled>
  );
};

export default EmployeeTable;
