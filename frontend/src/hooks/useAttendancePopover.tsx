import { ReactNode, useRef, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import { Button, Popover } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import AttendanceForm from '~/components/forms/AttendanceForm';
import { teamStore } from '~/stores/team';
import { AttendanceUpdateBody } from '~/types/attendance';

import {
  AttendanceQueryOptions,
  useAttendanceCreate,
  useAttendanceQuery,
  useAttendanceRemove,
  useAttendanceUpdate,
} from './queryHooks/useAttendanceQuery';

interface PopoverOpenOptions {
  target: HTMLElement;
  targetPos: { x: number; y: number };
  date: Dayjs;
  employeeIds: string | string[];
  initValues?: AttendanceUpdateBody;
}

interface AttendancePopoverOptions {
  onFinish?: () => void;
}

export const useAttendancePopover = ({ onFinish }: AttendancePopoverOptions) => {
  const team = useRecoilValue(teamStore);

  const [target, setTarget] = useState<HTMLElement>(document.body);
  const [targetPos, setTargetPos] = useState<{ x: number; y: number }>();
  const [visible, setVisible] = useState<boolean>(false);
  const [employeeIds, setEmployeeIds] = useState<string[]>([]);
  const [initValues, setInitValues] = useState<AttendanceUpdateBody>();
  const [date, setDate] = useState<Dayjs>(dayjs());

  const queryOptions: AttendanceQueryOptions = {
    teamId: team.id,
    dateType: 'day',
    date: date,
  };

  const { attendances } = useAttendanceQuery(queryOptions);
  const mutateOptions = { ...queryOptions, onSuccess: () => closePopover() };
  const { createAttendanceMutate, isCreateAttendanceLoading } = useAttendanceCreate(mutateOptions);
  const { updateAttendanceMutate, isUpdateAttendanceLoading } = useAttendanceUpdate(mutateOptions);
  const { removeAttendanceMutate, isRemoveAttendanceLoading } = useAttendanceRemove(mutateOptions);

  const closePopover = () => {
    setVisible(false);
    setEmployeeIds([]);
    setInitValues(undefined);
    onFinish?.();
  };

  const openPopover = ({
    target,
    targetPos,
    date,
    initValues,
    employeeIds,
  }: PopoverOpenOptions) => {
    setTarget(target);
    setTargetPos(targetPos);
    setDate(date);
    setInitValues(initValues);
    const ids = Array.isArray(employeeIds) ? employeeIds : [employeeIds];
    setEmployeeIds(ids);
    setVisible(true);
  };

  const handleSubmit = (formData: AttendanceUpdateBody) => {
    const body: AttendanceUpdateBody = { ...formData, workingDate: date.format('YY-MM-DD') };
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
  const content = (
    <AttendanceForm
      initValues={initValues}
      extraBtn={
        <Button type="text" icon={<FaTrashAlt size="1.6rem" />} danger onClick={handleRemove} />
      }
      onCancel={closePopover}
      onSubmit={handleSubmit}
      loading={isLoading}
    />
  );

  const renderPopover = (
    <Popover title="근무 로그 추가/변경" open={visible} trigger={'click'} content={content} />
  );

  return { openPopover, renderPopover };
};
