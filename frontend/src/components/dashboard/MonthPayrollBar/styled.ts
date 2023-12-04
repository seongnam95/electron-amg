import styled from 'styled-components';

export const MonthPayrollBarStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

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
