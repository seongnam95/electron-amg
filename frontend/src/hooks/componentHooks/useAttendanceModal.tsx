import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import { Button, Form, Modal, Tag, Tooltip } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import AttendanceForm from '~/components/forms/AttendanceForm';
import { AttendanceData, AttendanceUpdateBody } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';

import useAttendanceController from '../useAttendanceController';

interface AttendanceModalOptions {
  attendances: AttendanceData[];
  onFinish?: () => void;
}

/** Attendance 추가/편집 Modal */
export const useAttendanceModal = ({ attendances, onFinish }: AttendanceModalOptions) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);

  const [day, setDay] = useState<Dayjs>(dayjs());
  const [employees, setEmployees] = useState<EmployeeData[]>([]);

  const employeeIds = employees.map(employee => employee.id);

  const { setAttendance, removeAttendance, isLoading } = useAttendanceController({
    day: day,
    attendances: attendances,
    onSuccess: () => closeModal(),
  });

  const openModal = (day: Dayjs, employees: EmployeeData[]) => {
    setDay(day);
    setEmployees(employees);
    setFormValue(employees, day);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    onFinish?.();
  };

  /** 핸들러 */
  const handleSubmit = (formData: AttendanceUpdateBody) => {
    const body: AttendanceUpdateBody = { ...formData, workingDate: day.format('YY-MM-DD') };
    setAttendance(employeeIds, body);
  };

  const handleRemove = () => removeAttendance(employeeIds);

  /** 폼 기본 값 설정 */
  const setFormValue = (employees: EmployeeData[], day: Dayjs) => {
    if (employees.length === 1) {
      const selectedEmployee = employees[0];
      const selectedDayStr = day.format('YY-MM-DD');

      const matchingAttendance = attendances.find(
        attendance =>
          attendance.employeeId === selectedEmployee.id &&
          attendance.workingDate === selectedDayStr,
      );

      if (matchingAttendance) form.setFieldsValue(matchingAttendance);
      else {
        form.resetFields();
      }
    } else form.resetFields();
  };

  /** 날짜, 이름 태그 설명 추가 */
  const renderDescription = () => {
    const selectedCount = employees.length;
    if (!selectedCount) return;

    const firstEmployeeName = employees[0].name;
    const employeeNames = employees.map(employee => employee.name).join(', ');
    const extra = selectedCount > 1 ? `외 ${selectedCount - 1}명` : '';

    return (
      <Tooltip title={employeeNames}>
        <Tag>{day.format('YY년 MM월 DD일')}</Tag>
        <Tag>
          {firstEmployeeName} {extra}
        </Tag>
      </Tooltip>
    );
  };

  const renderModal = (
    <Modal
      title="근무 로그 추가/변경"
      open={open}
      centered
      width={380}
      footer={false}
      onCancel={closeModal}
    >
      {open && (
        <AttendanceForm
          form={form}
          description={renderDescription()}
          extraBtn={
            <Button type="text" icon={<FaTrashAlt size="1.6rem" />} danger onClick={handleRemove} />
          }
          onCancel={closeModal}
          onSubmit={handleSubmit}
          loading={isLoading}
        />
      )}
    </Modal>
  );

  return { openModal, renderModal };
};
