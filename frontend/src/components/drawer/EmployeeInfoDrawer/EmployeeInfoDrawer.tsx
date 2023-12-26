import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import { Button, Drawer, DrawerProps, Flex } from 'antd';
import { useRecoilValue } from 'recoil';

import EmployeeForm from '~/components/forms/EmployeeForm';
import { useEmployeeDocumentQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { teamStore } from '~/stores/team';
import { EmployeeData } from '~/types/employee';

import InfoDescriptions from './InfoDescriptions/InfoDescriptions';

export interface EmployeeInfoDrawerProps extends DrawerProps {
  employee: EmployeeData;
  onRemove?: (id: string) => void;
}

const EmployeeInfoDrawer = ({ employee, onRemove, ...props }: EmployeeInfoDrawerProps) => {
  const team = useRecoilValue(teamStore);
  const unit = team.units.find(unit => unit.id === (employee ? employee.position.unitId : ''));

  const [editing, setEditing] = useState<boolean>(false);

  const { employeeDocument, isLoading } = useEmployeeDocumentQuery({
    employeeId: employee?.id,
    enabled: !!employee?.id,
  });

  const handleRemove = () => {
    if (employee?.id) onRemove?.(employee.id);
  };

  const drawerProps: DrawerProps = {
    title: '근무자 정보',
    closable: false,
    rootClassName: 'ant-drawer-inline',
    extra: (
      <Flex>
        <Button type="text" danger icon={<FaTrashAlt size="1.6rem" onClick={handleRemove} />} />
        {!editing && (
          <Button type="text" onClick={() => setEditing(true)}>
            편집
          </Button>
        )}
      </Flex>
    ),
    getContainer: () => {
      return document.getElementById('layout') || document.body;
    },
    ...props,
  };

  return (
    <Drawer {...drawerProps}>
      {editing ? (
        <EmployeeForm team={team} employee={employee} onCancel={() => setEditing(false)} />
      ) : (
        <InfoDescriptions
          team={team}
          employee={employee}
          unit={unit}
          documents={employeeDocument}
          loading={isLoading}
        />
      )}
    </Drawer>
  );
};

export default EmployeeInfoDrawer;
