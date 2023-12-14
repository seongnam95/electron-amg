import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import { Button, Modal } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import AttendanceForm from '~/components/forms/AttendanceForm';
import { teamStore } from '~/stores/team';
import { AttendanceData, AttendanceUpdateBody } from '~/types/attendance';

import {
  AttendanceQueryOptions,
  useAttendanceCreate,
  useAttendanceQuery,
  useAttendanceRemove,
  useAttendanceUpdate,
} from './queryHooks/useAttendanceQuery';
import useAttendanceController from './useAttendanceController';

interface AttendanceModalOptions {
  attendances: AttendanceData[];
  onFinish?: () => void;
}

interface ModalOpenOptions {
  date: Dayjs;
  employeeIds: string | string[];
  initValues?: AttendanceUpdateBody;
}

/**
 * Attendance 추가/편집 Modal
 * @returns Modal Open Fn, JSX.Element
 */
export const useAttendanceModal = ({ attendances, onFinish }: AttendanceModalOptions) => {
  const team = useRecoilValue(teamStore);

  const [open, setOpen] = useState<boolean>(false);
  const [employeeIds, setEmployeeIds] = useState<string[]>([]);
  const [initValues, setInitValues] = useState<AttendanceUpdateBody>();
  const [date, setDate] = useState<Dayjs>(dayjs());

  const { setAttendance, removeAttendance, isLoading } = useAttendanceController({
    attendances: attendances,
    date: date,
    onSuccess: () => closeModal(),
  });

  const closeModal = () => {
    setOpen(false);
    setEmployeeIds([]);
    setInitValues(undefined);
    onFinish?.();
  };

  const openModal = ({ date, initValues, employeeIds }: ModalOpenOptions) => {
    const ids = Array.isArray(employeeIds) ? employeeIds : [employeeIds];

    setDate(date);
    setInitValues(initValues);
    setEmployeeIds(ids);
    setOpen(true);
  };

  const handleSubmit = (formData: AttendanceUpdateBody) => {
    const body: AttendanceUpdateBody = { ...formData, workingDate: date.format('YY-MM-DD') };
    setAttendance(employeeIds, body);
  };

  const handleRemove = () => removeAttendance(employeeIds);

  const renderModal = (
    <Modal
      title="근무 로그 추가/변경"
      open={open}
      centered
      width={380}
      footer={false}
      onCancel={closeModal}
    >
      <AttendanceForm
        initValues={initValues}
        extraBtn={
          <Button type="text" icon={<FaTrashAlt size="1.6rem" />} danger onClick={handleRemove} />
        }
        onCancel={closeModal}
        onSubmit={handleSubmit}
        loading={isLoading}
      />
    </Modal>
  );

  return { openModal, renderModal };
};
