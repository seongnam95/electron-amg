import React from 'react';

import { Progress } from 'antd';

import { EmployeeSidebarStyled } from './styled';

export interface EmployeeSidebarProps {}

const EmployeeSidebar = ({}: EmployeeSidebarProps) => {
  return (
    <EmployeeSidebarStyled className="EmployeeSidebar">
      <div className="card-wrap">
        <Progress type="circle" strokeWidth={14} percent={60} size={100} />
        <p>
          <span className="value-text">
            출근 <b>6명</b> / 총 10명
          </span>
        </p>
      </div>
    </EmployeeSidebarStyled>
  );
};

export default React.memo(EmployeeSidebar);
