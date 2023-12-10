import { useState } from 'react';

import { useRecoilValue } from 'recoil';

import EmployeeInfoDrawer from '~/components/drawer/EmployeeInfoDrawer';
import { teamStore } from '~/stores/team';
import { EmployeeData } from '~/types/employee';

import { useRemoveEmployee } from './useRemoveEmployee';

export const useEmployeeInfoDrawer = () => {
  const team = useRecoilValue(teamStore);
  const [open, setOpen] = useState<boolean>(false);
  const [employee, setEmployee] = useState<EmployeeData>();

  const closeDrawer = () => setOpen(false);
  const openDrawer = (employee: EmployeeData) => {
    setEmployee(employee);
    setOpen(true);
  };

  const { removeEmployee } = useRemoveEmployee({
    teamId: team.id,
    onSuccess: closeDrawer,
  });

  const renderDrawer = (
    <EmployeeInfoDrawer
      open={open}
      employee={employee}
      onClose={closeDrawer}
      onRemove={removeEmployee}
    />
  );

  return { openDrawer, renderDrawer };
};
