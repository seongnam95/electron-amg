import styled from 'styled-components';

export const MonthlyPayChartStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  height: 100%;

  .bar-wrap {
    position: relative;
    height: 16rem;

    .empty-attendance {
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
      width: 10rem;
    }
  }
`;
