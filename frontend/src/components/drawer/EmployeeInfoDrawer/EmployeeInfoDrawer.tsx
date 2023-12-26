import { useState } from 'react';
import { FaTrashAlt, FaUserEdit } from 'react-icons/fa';

import { Button, Drawer, DrawerProps, Flex } from 'antd';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import EmployeeForm from '~/components/forms/EmployeeForm';
import { useSoundApp } from '~/hooks/componentHooks/useSoundApp';
import { useEmployeeDocument, useEmployeeUpdate } from '~/hooks/queryHooks/useEmployeeQuery';
import { teamStore } from '~/stores/team';
import { EmployeeData, EmployeeUpdateBody } from '~/types/employee';

import InfoDescriptions from './InfoDescriptions/InfoDescriptions';

export interface EmployeeInfoDrawerProps extends DrawerProps {
  employee: EmployeeData;
  onRemove?: (id: string) => void;
}

const EmployeeInfoDrawer = ({ employee, onRemove, ...props }: EmployeeInfoDrawerProps) => {
  const team = useRecoilValue(teamStore);
  const unit = team.units.find(unit => unit.id === (employee ? employee.position.unitId : ''));

  const [editing, setEditing] = useState<boolean>(false);
  const { soundMessage } = useSoundApp();
  const { mutate: employeeUpdate, isLoading: isUpdateLoading } = useEmployeeUpdate({
    employeeId: employee ? employee.id : '',
    teamId: team.id,
    onSuccess: () => {
      soundMessage.success('정상 처리되었습니다.');
      setEditing(false);
    },
  });

  const { employeeDocument, isLoading } = useEmployeeDocument({
    employeeId: employee?.id,
    enabled: !!employee?.id,
  });

  const handleRemove = () => {
    if (employee?.id) onRemove?.(employee.id);
  };

  const drawerProps: DrawerProps = {
    title: `근무자 정보 ${editing ? '수정' : ''}`,
    closable: false,
    rootClassName: 'ant-drawer-inline',
    extra: (
      <Flex align="center">
        {editing ? (
          <Button type="text" danger icon={<FaTrashAlt size="1.6rem" />} onClick={handleRemove} />
        ) : (
          <Button
            type="text"
            style={{ paddingLeft: 4 }}
            icon={<FaUserEdit size="1.6rem" />}
            onClick={() => setEditing(true)}
          />
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
      <motion.div
        initial={{ x: editing ? 40 : -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        key={editing ? 'edit' : 'default'}
      >
        {editing ? (
          <EmployeeForm
            team={team}
            employee={employee}
            onCancel={() => setEditing(false)}
            onSubmit={employeeUpdate}
          />
        ) : (
          <InfoDescriptions
            team={team}
            employee={employee}
            unit={unit}
            documents={employeeDocument}
            loading={isLoading}
          />
        )}
      </motion.div>
    </Drawer>
  );
};

export default EmployeeInfoDrawer;
