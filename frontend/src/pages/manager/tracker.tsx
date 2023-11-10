import { useState } from 'react';

import { Radio } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import AntDatePicker from '~/components/common/DatePicker';
import { useDragScroll } from '~/hooks/useDragScroll';
import { EmployeeTrackerPageStyled } from '~/styles/pageStyled/employeeTrackerPageStyled';

const EmployeeTracker = () => {
  const dragRef = useDragScroll();
  const [viewType, setViewType] = useState<'month' | 'day'>('month');
  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());

  const handleOnChangeDate = (date: Dayjs | null) => {
    if (date) setSelectedDay(date);
  };

  return (
    <EmployeeTrackerPageStyled>
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

        <AntDatePicker
          picker={viewType === 'month' ? 'month' : 'date'}
          defaultValue={selectedDay}
          onChange={handleOnChangeDate}
        />
      </div>

      {/* <div className="table-wrap" ref={dragRef}>
        {viewType === 'month' ? (
          <MonthTable selectedDay={selectedDay} employees={employees} />
        ) : (
          <DayTable />
        )}
      </div> */}
    </EmployeeTrackerPageStyled>
  );
};

export default EmployeeTracker;
