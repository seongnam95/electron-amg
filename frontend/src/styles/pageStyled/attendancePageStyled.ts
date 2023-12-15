import styled from 'styled-components';

export const AttendancePageStyled = styled.div`
  --footer-height: 10rem;

  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;

  .attendance-content-wrap {
    padding: 1rem 2rem 2rem;
    height: calc(100% - var(--toolbar-height));
    overflow: hidden;

    .table-container {
      height: 100%;
      overflow: hidden;
    }
  }

  .AttendanceTable {
    height: 100%;
    overflow: auto;
  }
`;
