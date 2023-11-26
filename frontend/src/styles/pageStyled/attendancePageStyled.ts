import styled from 'styled-components';

export const AttendancePageStyled = styled.div`
  --toolbar-height: 3.8rem;
  --footer-height: 10rem;

  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;

  .page-content {
    height: calc(100% - var(--footer-height));
  }

  .tool-bar {
    height: var(--toolbar-height);
    margin-bottom: 1.4rem;
  }

  .table-container {
    overflow: hidden;
    height: calc(100% - var(--toolbar-height));
  }

  .page-footer {
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
