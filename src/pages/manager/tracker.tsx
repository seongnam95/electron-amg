import { useState } from 'react';

import { DatePicker, Radio } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import LayoutConfig from '~/components/layouts/LayoutConfig/LayoutConfig';
import DayTable from '~/components/tracker/DayTable';
import MonthTable from '~/components/tracker/MonthTable';
import { useDragScroll } from '~/hooks/useDragScroll';
import { WorkerTrackerPageStyled } from '~/styles/pageStyled/workerTrackerPageStyled';

const WorkerTracker = () => {
  const tableRef = useDragScroll();
  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());
  const [viewType, setViewType] = useState<'month' | 'day'>('month');

  const handleOnChangeDate = (day: Dayjs | null) => {
    if (day) setSelectedDay(day);
  };

  const monthCellRender = (value: any) => {
    return <div className="ant-picker-cell-inner">{value.month() + 1}월</div>;
  };

  function disabledDate(current: any) {
    return current && current.valueOf() > Date.now();
  }

  return (
    <WorkerTrackerPageStyled>
      <LayoutConfig breadcrumbs={['매니저', '근태']} />
      <div className="tracker-header">
        <Radio.Group
          defaultValue="day"
          buttonStyle="solid"
          value={viewType}
          onChange={e => setViewType(e.target.value)}
        >
          <Radio.Button value="month">월간</Radio.Button>
          <Radio.Button value="day">일간</Radio.Button>
        </Radio.Group>

        <DatePicker
          picker={viewType === 'month' ? 'month' : 'date'}
          inputReadOnly
          defaultValue={selectedDay}
          allowClear={false}
          monthCellRender={monthCellRender}
          disabledDate={disabledDate}
          onChange={handleOnChangeDate}
        />
      </div>
      <div className="color-hint-wrap">
        <span>
          직원
          <span className="color-bar" style={{ backgroundColor: '#ef5285' }} />
        </span>
        <span>
          알바
          <span className="color-bar" style={{ backgroundColor: '#60c5ba' }} />
        </span>
      </div>

      <div className="table-wrap" ref={tableRef}>
        {viewType === 'month' ? <MonthTable day={selectedDay} /> : <DayTable />}
      </div>
    </WorkerTrackerPageStyled>
  );
};

export default WorkerTracker;
