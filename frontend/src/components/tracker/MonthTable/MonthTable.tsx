import { Tooltip } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';

import { commuteMonthlySelector } from '~/stores/commute';
import { WorkerData } from '~/types/worker';
import { findWorkingRanges, groupDataByWorker } from '~/utils/commuteRange';

import { MonthTableStyled } from './styled';

export interface MonthTableProps {
  selectedDay: Dayjs;
}

const MonthTable = ({ selectedDay }: MonthTableProps) => {
  const commutes = useRecoilValue(commuteMonthlySelector(selectedDay.format('YYYYMM')));

  const workers = [];

  const dayCount = selectedDay.daysInMonth();
  const daysOfMonth = Array.from({ length: dayCount }, (_, i) => dayjs(selectedDay).date(i + 1));
  const dataByWorker = groupDataByWorker(commutes);
  const rangesByWorker = findWorkingRanges(dataByWorker);

  return (
    <MonthTableStyled className="MonthTable">
      <thead>
        <tr>
          <th className="name-column" />
          {daysOfMonth.map((day: Dayjs) => (
            <th key={day.date()} className={dayjs().isSame(day, 'day') ? 'today' : ''}>
              {day.date()}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {/* Worker Row */}
        {workers?.map((worker: WorkerData) => (
          <tr key={'row' + worker.id}>
            <td className="name-column">{worker.name}</td>

            {/* Working Day Column */}
            {daysOfMonth.map((day: Dayjs) => {
              const dayFormatted = day.format('YYYYMMDD');
              const range = rangesByWorker[worker.id]?.find(range =>
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
                      <ColorBar
                        color={worker.positionCode === 1 ? '#29B6F6' : '#FFA726'}
                        hoverColor={worker.positionCode === 1 ? '#4FC3F7' : '#FFB74D'}
                        isRangeStart={isRangeStart}
                        isRangeEnd={isRangeEnd}
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

const ColorBar = styled.span<{
  isRangeStart: boolean;
  isRangeEnd: boolean;
  color: string;
  hoverColor: string;
}>`
  display: flex;
  margin: auto;
  height: 1.6rem;

  background-color: ${p => p.color};
  transition: 140ms all;

  &:hover {
    background-color: ${p => p.hoverColor};
  }

  ${p =>
    p.isRangeStart &&
    css`
      margin-left: 1rem;
      border-top-left-radius: 0.4rem;
      border-bottom-left-radius: 0.4rem;
    `}

  ${p =>
    p.isRangeEnd &&
    css`
      margin-right: 1rem;
      border-top-right-radius: 0.4rem;
      border-bottom-right-radius: 0.4rem;
    `}
`;

export default MonthTable;
