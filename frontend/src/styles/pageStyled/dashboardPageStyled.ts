import styled from 'styled-components';

export const DashboardPageStyled = styled.div`
  position: relative;

  height: 100%;
  background-color: ${p => p.theme.colors.innerBg};

  *::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .control-bar {
    position: absolute;
    width: 100%;

    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid ${p => p.theme.colors.borderColor};
    padding: 1.4rem 2.8rem;

    z-index: 1000;
  }

  .card-grid-wrap {
    display: grid;
    grid-template-columns: minmax(70rem, auto) minmax(40rem, auto);
    grid-template-rows: 38rem auto;
    gap: 2rem;
    margin: 0 auto;
    padding: 9rem 2.4rem 2.4rem;

    width: 100%;
    height: 100%;
    max-width: 124rem;
    overflow: auto;

    .month-pay-chart-card {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
    }

    .unit-pay-list-card {
      grid-row: 1 / 2;
      grid-column: 2 / 3;
    }

    .month-attendance-table-card {
      grid-row: 2 / 3;
      grid-column: 1 / 3;
    }
  }
`;
