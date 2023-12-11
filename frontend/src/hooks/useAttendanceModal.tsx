import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import { Button, Form, Modal } from 'antd';
import { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import AttendanceForm from '~/components/forms/AttendanceForm';
import { teamStore } from '~/stores/team';
import { AttendanceUpdateBody } from '~/types/attendance';

import {
  useAttendanceCreate,
  useAttendanceQuery,
  useAttendanceRemove,
  useAttendanceUpdate,
} from './queryHooks/useAttendanceQuery';

interface AttendanceModalOptions {
  date: Dayjs;
  onFinish?: () => void;
}

interface ModalOpenOptions {
  employeeIds: string | string[];
  initValues?: AttendanceUpdateBody;
}

/**
 * Attendance 추가/편집 Modal
 * @returns Modal Open Fn, JSX.Element
 */
export const useAttendanceModal = ({ date, onFinish }: AttendanceModalOptions) => {
  const team = useRecoilValue(teamStore);

  const [open, setOpen] = useState<boolean>(false);
  const [employeeIds, setEmployeeIds] = useState<string[]>([]);
  const [initValues, setInitValues] = useState<AttendanceUpdateBody>();

  const dateStr = date.format('YY-MM-DD');
  const queryOptions = { teamId: team.id, dateStr: dateStr };
  const { attendances } = useAttendanceQuery(queryOptions);

  const mutateOptions = { ...queryOptions, onSuccess: () => closeModal() };
  const { createAttendanceMutate, isCreateAttendanceLoading } = useAttendanceCreate(mutateOptions);
  const { updateAttendanceMutate, isUpdateAttendanceLoading } = useAttendanceUpdate(mutateOptions);
  const { removeAttendanceMutate, isRemoveAttendanceLoading } = useAttendanceRemove(mutateOptions);

  useEffect(() => console.log(initValues), [initValues]);
  const closeModal = () => {
    setOpen(false);
    setEmployeeIds([]);
    setInitValues(undefined);
    onFinish?.();
  };

  const openModal = ({ initValues, employeeIds }: ModalOpenOptions) => {
    setInitValues(initValues);
    const ids = Array.isArray(employeeIds) ? employeeIds : [employeeIds];
    setEmployeeIds(ids);
    setOpen(true);
  };

  const handleSubmit = (formData: AttendanceUpdateBody) => {
    const body: AttendanceUpdateBody = { ...formData, workingDate: dateStr };
    attendanceMutate(body);
  };

  const handleRemove = () => {
    const { attendanceIds } = categorizeEmployeeIds();
    removeAttendanceMutate(attendanceIds);
  };

  /**
   * 분류 된 ID에 맞는 mutate 호출
   */
  const attendanceMutate = (formData: AttendanceUpdateBody) => {
    const { employeeIds, attendanceIds } = categorizeEmployeeIds();

    if (employeeIds.length > 0)
      createAttendanceMutate({ employeeIds: employeeIds, body: formData });

    if (attendanceIds.length > 0)
      updateAttendanceMutate({ employeeIds: attendanceIds, body: formData });
  };

  /**
   * Attendance 데이터 유무에 따라 ID 분류
   */
  const categorizeEmployeeIds = () => {
    return employeeIds.reduce(
      (acc, id) => {
        const attendance = attendances.find(attendance => attendance.employeeId === id);
        attendance ? acc.attendanceIds.push(attendance.id) : acc.employeeIds.push(id);
        return acc;
      },
      { employeeIds: [] as string[], attendanceIds: [] as string[] },
    );
  };

  const isLoading =
    isCreateAttendanceLoading || isUpdateAttendanceLoading || isRemoveAttendanceLoading;
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
