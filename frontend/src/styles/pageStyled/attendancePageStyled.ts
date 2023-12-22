import styled from 'styled-components';

export const AttendancePageStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;

  .table-wrap {
    overflow: hidden;
    padding: 0 2rem 2rem;

    .date-table-container {
      position: relative;
      display: flex;
      width: 100%;
      gap: 2rem;
      height: 100%;
      padding-right: 26rem;

      .attendance-stats-card {
        position: absolute;
        right: 0;
        width: 24rem;
      }
    }
  }
`;
