import styled from 'styled-components';

export const DashboardPageStyled = styled.div`
  position: relative;

  overflow: auto;

  height: 100%;
  background-color: ${p => p.theme.colors.innerBg};

  .control-bar {
    background-color: ${p => p.theme.colors.contentBG};
    border-bottom: 1px solid ${p => p.theme.colors.borderColor};
    padding: 1.4rem 2.8rem;
  }

  .card-grid-wrap {
    display: grid;
    grid-template-columns: minmax(70rem, auto) minmax(37rem, auto);
    grid-template-rows: 38rem auto;
    gap: 2rem;
    margin: 0 auto;
    padding: 2.4rem;

    width: 100%;
    max-width: 124rem;

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
