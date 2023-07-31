import { useState } from 'react';

import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import LayoutConfig from '~/components/layouts/LayoutConfig/LayoutConfig';
import TrackerCalendar from '~/components/tracker/TrackerCalendar/TrackerCalendar';
import { WorkerTrackerPageStyled } from '~/styles/pageStyled/workerTrackerPageStyled';

const WorkerTracker = () => {
  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());

  const handleOnChangeDate = (date: Dayjs | null) => {
    if (date) setSelectedDay(date);
  };

  const monthCellRender = (value: any) => {
    return <div className="ant-picker-cell-inner">{value.month() + 1}월</div>;
  };

  return (
    <WorkerTrackerPageStyled>
      <LayoutConfig breadcrumbs={['매니저', '근태']} />

      <DatePicker.MonthPicker
        inputReadOnly
        defaultValue={selectedDay}
        allowClear={false}
        monthCellRender={monthCellRender}
        onChange={handleOnChangeDate}
      />

      <TrackerCalendar />
    </WorkerTrackerPageStyled>
  );
};

export default WorkerTracker;
