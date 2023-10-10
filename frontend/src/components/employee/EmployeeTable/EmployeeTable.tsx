import { ReactNode, useEffect, useMemo, useState } from 'react';
import React from 'react';

import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';

import Row, { RowProps } from './Row';
import { EmployeeTableStyled } from './styled';

export interface EmployeeTableProps {
  children: ReactNode;
}

const EmployeeTable = ({ children }: EmployeeTableProps) => {
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const childIdList = useMemo(() => {
    return React.Children.toArray(children).flatMap(child => {
      if (React.isValidElement<RowProps>(child) && child.type === Row) return child.props.id;
      return [];
    });
  }, [children]);

  // 단일 체크박스 기준 전체 체크박스 활성화/비활성화
  useEffect(() => {
    setAllSelected(selectedIds.length > 0);
  }, [selectedIds]);

  // 전체 체크박스 클릭 핸들러
  const handleOnChangeAllChecked = (e: CheckboxChangeEvent) => {
    const isChecked = e.target.checked;
    setSelectedIds(isChecked ? childIdList : []);
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
    <EmployeeTableStyled className="EmployeeTable">
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
            {React.Children.map(children, child => {
              if (
                React.isValidElement<RowProps>(child) &&
                child.type === Row // 여기서 Row는 당신의 `Row` 컴포넌트를 가리킵니다.
              ) {
                return React.cloneElement(child, {
                  checked: selectedIds.includes(child.props.id),
                  onChecked: handleOnChangeChecked,
                });
              }
              return child;
            })}
          </tbody>
        </table>
      </div>
    </EmployeeTableStyled>
  );
};

export default EmployeeTable;
