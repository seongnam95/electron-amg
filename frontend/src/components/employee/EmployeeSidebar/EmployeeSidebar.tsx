import React from 'react';

import { Progress, Skeleton } from 'antd';

import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';

import { EmployeeSidebarStyled } from './styled';

export interface EmployeeSidebarProps {}

const EmployeeSidebar = ({}: EmployeeSidebarProps) => {
  const { employees, isEmployeeLoading } = useEmployeeQuery();

  // 출근률 계산
  const getAttendanceRate = () => {
    const employeeCount = employees.length;
    const attendanceEmployeeCount = employees.filter(employee => !!employee.worklog).length;
    const rate = Math.round((attendanceEmployeeCount / employeeCount) * 100);
    return {
      total: employeeCount,
      attendance: attendanceEmployeeCount,
      rate: rate,
    };
  };
  const { total, attendance, rate } = getAttendanceRate();
  return (
    <EmployeeSidebarStyled className="EmployeeSidebar">
      <div className="card-wrap">
        {!isEmployeeLoading ? (
          <>
            <Progress type="circle" strokeWidth={14} percent={rate} size={100} />
            <p>
              <span className="value-text">
                출근 <b>{attendance}명</b> / 총 {total}명
              </span>
            </p>
          </>
        ) : (
          <Skeleton active style={{ padding: '0.6rem 2rem' }} />
        )}
      </div>
    </EmployeeSidebarStyled>
  );
};

export default React.memo(EmployeeSidebar);
