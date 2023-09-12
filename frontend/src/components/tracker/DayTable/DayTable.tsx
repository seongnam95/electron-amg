import { useEffect, useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';
import { useRecoilState, useRecoilValue } from 'recoil';

import { commuteStore, workingDayStore } from '~/stores/commute';
import { workerSelector } from '~/stores/worker';
import { CommuteData } from '~/types/worker';

import { DayTableStyled } from './styled';

export interface DayTableProps {}

const DayTable = ({}: DayTableProps) => {
  // const workingDay = useRecoilValue(workingDayStore);
  // const commutes: CommuteData[] = useRecoilValue(
  //   commuteSelector({ day: workingDay.format('YYMMDD') }),
  // );

  return (
    <DayTableStyled className="DayTable">
      <thead>
        <tr>
          <th>이름</th>
          <th>출근 시간</th>
          <th>퇴근 시간</th>
        </tr>
      </thead>
      {/* <tbody>
        {commutes.map(commute => {
          const worker = useRecoilValue(workerSelector({ userId: commute.workerId }));
          if (worker)
            return (
              <tr key={worker.id + '-' + commute.id}>
                <td>{worker.name}</td>
                <td>{dayjs.unix(commute.startTimeStamp).format('hh:mm')}</td>
                <td>{dayjs.unix(commute.endTimeStamp).format('hh:mm')}</td>
              </tr>
            );
        })}
      </tbody> */}
    </DayTableStyled>
  );
};

export default DayTable;
