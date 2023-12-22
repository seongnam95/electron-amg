import styled from 'styled-components';

export const DailyAttendanceDoughnutStyled = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 2.6rem;
  align-items: center;
  justify-content: space-between;

  .position-label-wrap {
    font-size: ${p => p.theme.sizes.textSmall};
  }

  .chart-wrap {
    width: 14rem;
    height: 14rem;
  }
`;
