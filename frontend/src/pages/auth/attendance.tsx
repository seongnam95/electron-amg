import { MouseEvent, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { RiExchangeFundsLine } from 'react-icons/ri';

import { Button, Flex, Modal, Segmented, Tag, Tooltip } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import ContextPopup from '~/components/attendance/ContextPopup';
import DayTable from '~/components/attendance/DayTable';
import MonthTable from '~/components/attendance/MonthTable';
import AntDatePicker from '~/components/common/DatePicker';
import Dock from '~/components/common/Dock';
import AttendanceForm from '~/components/forms/AttendanceForm';
import { useAttendanceQuery } from '~/hooks/queryHooks/useAttendanceQuery';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import useAttendanceController from '~/hooks/useAttendanceController';
import { useEmployeeInfoDrawer } from '~/hooks/useEmployeeInfoDrawer';
import { teamStore } from '~/stores/team';
import { AttendancePageStyled } from '~/styles/pageStyled/attendancePageStyled';
import { AttendanceUpdateBody } from '~/types/attendance';
import { EmployeeData } from '~/types/employee';

type ViewType = 'month' | 'day';

const AttendancePage = () => {
  const team = useRecoilValue(teamStore);

  const [viewType, setViewType] = useState<ViewType>('day');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedEmployees, setSelectedEmployees] = useState<EmployeeData[]>([]);
  const selectedEmployeeIds = selectedEmployees.map(employee => employee.id);

  const { employees } = useEmployeeQuery({ teamId: team.id });
  const { attendances } = useAttendanceQuery({
    date: selectedDate,
    dateType: viewType,
    teamId: team.id,
  });

  const { setAttendance, removeAttendance, isLoading } = useAttendanceController({
    attendances: attendances,
    date: selectedDate,
    onSuccess: () => handleCancel(),
  });

  const { openDrawer, renderDrawer } = useEmployeeInfoDrawer();

  const handleSubmit = (formData: AttendanceUpdateBody) =>
    setAttendance(selectedEmployeeIds, formData);

  const handleChangeDate = (date: Dayjs | null) => {
    if (date) setSelectedDate(date);
  };

  const handleContextMenu = (_: MouseEvent, employee: EmployeeData, date?: Dayjs) => {
    if (date) setSelectedDate(date);

    setIsEditing(true);
    setSelectedEmployees([employee]);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setOpenModal(false);
    setSelectedEmployees([]);
  };

  const handleRemove = () => removeAttendance(selectedEmployeeIds);

  const openAttendanceModal = () => {
    setIsEditing(true);
    setOpenModal(true);
  };

  const renderSubtitle = () => {
    const selectedCount = selectedEmployees.length;
    if (!selectedCount) return;

    const firstName = selectedEmployees[0].name;
    const names = selectedEmployees.map(employee => employee.name).join(', ');
    const extra = selectedCount > 1 ? `외 ${selectedCount - 1}명` : '';

    if (extra) {
      return (
        <Tooltip title={names}>
          <Tag>
            {firstName} {extra}
          </Tag>
        </Tooltip>
      );
    }

    return <Tag>{firstName}</Tag>;
  };

  const renderExtraBtn = (
    <Button type="text" icon={<FaTrashAlt size="1.6rem" />} danger onClick={handleRemove} />
  );

  const attendanceForm = () => {
    return (
      <AttendanceForm
        description={renderSubtitle()}
        extraBtn={renderExtraBtn}
        loading={isLoading}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );
  };

  const showDock = selectedEmployees.length > 0 && !isEditing;
  return (
    <AttendancePageStyled>
      {/* 컨트롤 바 */}
      <Flex align="center" justify="space-between" style={{ padding: '2rem' }}>
        <Segmented
          options={[
            { label: '일간', value: 'day' },
            { label: '월간', value: 'month' },
          ]}
          onChange={v => setViewType(v as ViewType)}
        />
        <AntDatePicker
          picker={viewType === 'month' ? 'month' : 'date'}
          value={selectedDate}
          defaultValue={selectedDate}
          onChange={handleChangeDate}
        />
      </Flex>

      {/* 테이블 Wrap */}
      <Flex className="table-container" flex={1}>
        <ContextPopup
          close={!isEditing}
          title="근무 기록 추가/변경"
          content={attendanceForm()}
          onCancel={handleCancel}
        >
          {viewType === 'day' ? (
            <DayTable
              employees={employees}
              attendances={attendances}
              disabledSelect={isEditing}
              selectedEmployeeIds={selectedEmployeeIds}
              onSelect={setSelectedEmployees}
              onClickName={openDrawer}
              onContextMenu={handleContextMenu}
            />
          ) : (
            <MonthTable
              date={selectedDate}
              employees={employees}
              attendances={attendances}
              onContextMenu={handleContextMenu}
            />
          )}
        </ContextPopup>

        <Dock open={showDock}>
          <Tooltip title="일괄 변경" mouseEnterDelay={0.6}>
            <Button
              type="text"
              size="large"
              icon={<RiExchangeFundsLine size="2.1rem" />}
              onClick={openAttendanceModal}
            />
          </Tooltip>
        </Dock>
      </Flex>

      <Modal
        title="근무 기록 추가/변경"
        open={openModal}
        centered
        width={380}
        footer={false}
        onCancel={handleCancel}
        children={attendanceForm()}
      />

      {renderDrawer}
    </AttendancePageStyled>
  );
};

export default AttendancePage;
