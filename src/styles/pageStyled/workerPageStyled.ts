import styled from 'styled-components';

export const WorkerPageStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  > .worker-content {
    flex: 1;

    display: flex;
    flex-direction: column;

    .content-header {
      font-weight: bold;
      font-size: 2.2rem;
      padding: 2rem 0 0 2rem;
    }

    .worker-control-bar {
      display: flex;
      padding: 2rem;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid ${p => p.theme.colors.borderColor};

      > .Button {
        .bx {
          color: ${p => p.theme.colors.textColor2};
          font-size: 2rem;
        }
      }
    }
  }

  .color-bar {
    width: 8px;
    border-radius: 2px;
    margin: 3px 10px 3px 0;
  }
`;
