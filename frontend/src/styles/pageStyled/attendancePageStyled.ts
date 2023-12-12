import styled from 'styled-components';

export const AttendancePageStyled = styled.div`
  --footer-height: 10rem;

  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;

  .table-container {
    overflow: hidden;
    height: calc(100% - var(--toolbar-height));

    .page-content {
      height: calc(100% - var(--footer-height));
    }
  }

  .attendance-footer {
    height: var(--footer-height);
    margin-top: 2.4rem;

    .leader-state {
      background-color: ${p => p.theme.colors.innerBg};
      border-radius: 8px;
      padding: 1.8rem;
    }
  }

  .AttendanceTable {
    height: 100%;
    overflow: auto;
  }
`;
