import styled from 'styled-components';

export const WorkerPageStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  > .worker-content {
    flex: 1;

    display: flex;
    flex-direction: column;

    .header-text {
      padding: 2rem;
      font-weight: bold;
      font-size: 2.2rem;
    }

    .worker-control-bar {
      display: flex;
      padding: 0 2rem;
      align-items: end;
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
