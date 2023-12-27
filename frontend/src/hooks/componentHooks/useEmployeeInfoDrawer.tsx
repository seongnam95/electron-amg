import { useState } from 'react';
import { FaTrashAlt, FaUserEdit } from 'react-icons/fa';

import { Button, Drawer, Flex } from 'antd';
import { DrawerProps } from 'antd/lib';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import EmployeeInfo from '~/components/employee/EmployeeInfo';
import EmployeeForm from '~/components/forms/EmployeeForm';
import { teamStore } from '~/stores/team';
import { EmployeeData, EmployeeUpdateBody } from '~/types/employee';

import { useEmployeeDocument, useEmployeeUpdate } from '../queryHooks/useEmployeeQuery';
import { useRemoveEmployee } from '../useRemoveEmployee';
import { useSoundApp } from './useSoundApp';

export const useEmployeeInfoDrawer = (props: DrawerProps = {}) => {
  const team = useRecoilValue(teamStore);

  const [open, setOpen] = useState<boolean>(false);
  const [employee, setEmployee] = useState<EmployeeData>();
  const [editing, setEditing] = useState<boolean>(false);

  const unit = team.units.find(unit => employee?.position.unitId === unit.id);

  /** Hook */
  const { soundMessage } = useSoundApp();

  const { employeeDocument, isLoading } = useEmployeeDocument({ employeeId: employee?.id });
  const { removeEmployee } = useRemoveEmployee({
    teamId: team.id,
    onSuccess: () => {
      soundMessage.success('정상 처리되었습니다.');
      closeDrawer();
    },
  });
  const { mutate: employeeUpdate, isLoading: isUpdateLoading } = useEmployeeUpdate({
    employeeId: employee?.id,
    teamId: team.id,
  });

  /** Handler */
  const openDrawer = (employee: EmployeeData) => {
    setEmployee(employee);
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
    setEditing(false);
  };

  const handleEditSubmit = (formData: EmployeeUpdateBody) => {
    employeeUpdate(formData, {
      onSuccess: (data: EmployeeData) => {
        setEmployee(data);
        soundMessage.success('정상 처리되었습니다.');
        setEditing(false);
      },
    });
  };

  const handleRemove = () => {
    if (employee) removeEmployee(employee.id);
  };

  const drawerProps: DrawerProps = {
    title: `근무자 정보 ${editing ? '수정' : ''}`,
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

  const renderDrawer = (
    <Drawer
      open={open}
      closable={false}
      onClose={closeDrawer}
      rootClassName="ant-drawer-inline"
      {...drawerProps}
    >
      <motion.div
        key={editing ? 'edit' : 'info'}
        initial={{ x: editing ? 40 : -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        {editing ? (
          <EmployeeForm
            team={team}
            employee={employee}
            loading={isUpdateLoading}
            onCancel={() => setEditing(false)}
            onSubmit={handleEditSubmit}
          />
        ) : (
          <EmployeeInfo
            team={team}
            unit={unit}
            employee={employee}
            documents={employeeDocument}
            loading={isLoading}
          />
        )}
      </motion.div>
    </Drawer>
  );

  return { openDrawer, closeDrawer, renderDrawer };
};
