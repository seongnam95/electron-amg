import { Tooltip } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import { commuteMonthlySelector } from '~/stores/commute';
import { workerStore } from '~/stores/worker';
import { CommuteData } from '~/types/worker';
import { findWorkingRanges, groupDataByWorker } from '~/utils/commuteRange';

import { MonthTableStyled } from './styled';

export interface MonthTableProps {
  day: Dayjs;
}

const MonthTable = ({ day }: MonthTableProps) => {
  const commutes = useRecoilValue(commuteMonthlySelector(day.format('YYYYMM')));
  const workers = useRecoilValue(workerStore);
  const dayCount = day.daysInMonth();
  const daysOfMonth = Array.from({ length: dayCount }, (_, i) => dayjs(day).date(i + 1));

  const dataByWorker = groupDataByWorker(commutes);
  const rangesByWorker = findWorkingRanges(dataByWorker);

  return (
    <MonthTableStyled className="MonthTable">
      <thead>
        <tr>
          <th className="name-column" />
          {daysOfMonth.map(day => (
            <th key={day.date()} className={dayjs().isSame(day, 'day') ? 'today' : ''}>
              {day.date()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {workers.map(worker => (
          <tr key={'row' + worker.id}>
            <td className="name-column">{worker.name}</td>
            {daysOfMonth.map(day => {
              const dayFormatted = day.format('YYYYMMDD');
              const workerId = worker.id;
              const range = rangesByWorker[workerId]?.find(range =>
                range.some(item => item.workingDay === dayFormatted),
              );
              const isWorking = range != null;
              const isRangeStart = isWorking && range[0].workingDay === dayFormatted;
              const isRangeEnd = isWorking && range[range.length - 1].workingDay === dayFormatted;

              return (
                <td
                  className={dayjs().isSame(day, 'day') ? 'today' : ''}
                  key={worker.id + '-' + dayFormatted}
                >
                  {isWorking && (
                    <Tooltip placement="top" title={'text'}>
                      <span
                        style={{
                          backgroundColor: worker.positionCode === 1 ? '#ef5285' : '#60c5ba',
                        }}
                        className={`working-bullet ${isRangeStart ? 'range-start' : ''} ${
                          isRangeEnd ? 'range-end' : ''
                        }`}
                      />
                    </Tooltip>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </MonthTableStyled>
  );
};

export default MonthTable;
