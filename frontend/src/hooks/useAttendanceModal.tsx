import { useState } from 'react';

import { Modal } from 'antd';

import AttendanceForm from '~/components/forms/AttendanceForm';
import { AttendanceData } from '~/types/attendance';

export const useAttendanceModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [employeeIds, setEmployeeIds] = useState<string[]>([]);
  const isEditing = !!employeeIds.length;

  const closeModal = () => setOpen(false);
  const openModal = (employeeIds: string | string[]) => {
    const ids = Array.isArray(employeeIds) ? employeeIds : [employeeIds];
    setEmployeeIds(ids);
    setOpen(true);
  };

  const renderModal = (
    <Modal
      title={isEditing ? '근무 로그 변경' : '근무 로그 추가'}
      open={open}
      centered
      width={340}
      footer={false}
      onCancel={closeModal}
    >
      <AttendanceForm onCancel={closeModal} />
    </Modal>
  );

  return { openModal, renderModal };
};
