import { ReactNode } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import { Button, Descriptions, Divider, DrawerProps, Tag } from 'antd';

import { EmployeeData } from '~/types/employee';
import { POSITION_CODE, POSITION_COLORS } from '~/types/position';

import { EmployeeInfoDrawerStyled } from './styled';

export interface EmployeeInfoDrawerProps extends DrawerProps {
  employee: EmployeeData;
}

const EmployeeInfoDrawer = ({ employee, ...props }: EmployeeInfoDrawerProps) => {
  const TitleRender = () => {
    const code = employee.position.positionCode;
    const label = POSITION_CODE[code];
    const color = POSITION_COLORS[code];
    return (
      <>
        <Tag style={{ width: '5rem', textAlign: 'center', marginRight: '1.2rem' }} color={color}>
          {label}
        </Tag>
        {employee.name}
      </>
    );
  };
  const RenderExtra = <Button type="text" icon={<FaTrashAlt size="1.8rem" />}></Button>;

  return (
    <EmployeeInfoDrawerStyled
      className="EmployeeInfoDrawer"
      title={<TitleRender />}
      closable={false}
      {...props}
    >
      <Descriptions
        column={1}
        colon={false}
        contentStyle={{ display: 'inline-block', textAlign: 'right' }}
      >
        <Descriptions.Item label="이름">{employee?.name}</Descriptions.Item>
        <Descriptions.Item label="주민등록번호">{}</Descriptions.Item>
        <Descriptions.Item label="연락처">{employee?.phone}</Descriptions.Item>
        <Descriptions.Item label="연락처">{employee?.phone}</Descriptions.Item>
      </Descriptions>
    </EmployeeInfoDrawerStyled>
  );
};

export default EmployeeInfoDrawer;
