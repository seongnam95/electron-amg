import { ReactNode, useEffect, useMemo, useState } from 'react';
import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

import { Tooltip } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';

import Row, { RowProps } from './Row';
import { EmployeeTableStyled } from './styled';

export interface EmployeeTableProps {
  children: ReactNode;
  onSelected?: (id: Array<string>) => void;
}

const EmployeeTable = ({ children, onSelected }: EmployeeTableProps) => {
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
    onSelected?.(selectedIds);
  }, [selectedIds]);

  // 전체 체크박스 클릭 핸들러
  const handleOnChangeAllSelected = (e: CheckboxChangeEvent) => {
    const isSelected = e.target.checked;
    setSelectedIds(isSelected ? childIdList : []);
  };

  // 체크박스 클릭 핸들러
  const handleOnChangeSelected = (e: CheckboxChangeEvent) => {
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
                <Checkbox checked={allSelected} onChange={handleOnChangeAllSelected} />
              </th>
              <th>이름</th>
              <th className="cell-center">연락처</th>
              <th>소속</th>
              <th>
                <div className="wage-th-wrap">
                  기본 급여
                  <Tooltip title="출근 시 기본 입력 될 급여액" placement="bottom">
                    <FaQuestionCircle />
                  </Tooltip>
                </div>
              </th>
              <th className="cell-center">근무일</th>
              <th className="cell-center">상태</th>
            </tr>
          </thead>
          <tbody>
            {React.Children.map(children, child => {
              if (React.isValidElement<RowProps>(child) && child.type === Row) {
                return React.cloneElement(child, {
                  checked: selectedIds.includes(child.props.id),
                  onSelected: handleOnChangeSelected,
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
