import { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import { teamStore } from '~/stores/team';
import { AttendanceData, AttendanceUpdateBody } from '~/types/attendance';

import {
  AttendanceQueryOptions,
  useAttendanceCreate,
  useAttendanceRemove,
  useAttendanceUpdate,
} from './queryHooks/useAttendanceQuery';

interface AttendanceControllerOptions {
  day: Dayjs;
  attendances: AttendanceData[];
  onSuccess?: () => void;
}

const useAttendanceController = (options: AttendanceControllerOptions) => {
  const { day, attendances, onSuccess } = options;
  const { id: teamId } = useRecoilValue(teamStore);

  const mutateOptions: AttendanceQueryOptions = {
    teamId: teamId,
    dayType: 'date',
    day: day,
    onSuccess,
  };

  const { createAttendanceMutate, isCreateAttendanceLoading } = useAttendanceCreate(mutateOptions);
  const { updateAttendanceMutate, isUpdateAttendanceLoading } = useAttendanceUpdate(mutateOptions);
  const { removeAttendanceMutate, isRemoveAttendanceLoading } = useAttendanceRemove(mutateOptions);

  /** 분류 된 ID에 맞는 mutate 호출 */
  const setAttendance = (targetIds: string[], formData: AttendanceUpdateBody) => {
    const { employeeIds, attendanceIds } = categorizeEmployeeIds(day, targetIds);

    if (employeeIds.length > 0)
      createAttendanceMutate({ employeeIds: employeeIds, body: formData });

    if (attendanceIds.length > 0)
      updateAttendanceMutate({ employeeIds: attendanceIds, body: formData });
  };

  /** Attendance 데이터 삭제 */
  const removeAttendance = (targetIds: string[]) => {
    const { attendanceIds } = categorizeEmployeeIds(day, targetIds);
    removeAttendanceMutate(attendanceIds);
  };

  /** Attendance 데이터 유무에 따라 ID 분류 */
  const categorizeEmployeeIds = (day: Dayjs, employeeIds: string[]) => {
    const dayStr = day.format('YY-MM-DD');

    return employeeIds.reduce(
      (acc, id) => {
        const attendance = attendances.find(
          attendance => attendance.employeeId === id && attendance.workingDate === dayStr,
        );
        attendance ? acc.attendanceIds.push(attendance.id) : acc.employeeIds.push(id);
        return acc;
      },
      { employeeIds: [] as string[], attendanceIds: [] as string[] },
    );
  };

  const isLoading =
    isCreateAttendanceLoading || isUpdateAttendanceLoading || isRemoveAttendanceLoading;

  return { setAttendance, removeAttendance, isLoading };
};

export default useAttendanceController;
