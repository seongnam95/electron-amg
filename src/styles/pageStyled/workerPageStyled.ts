import styled from 'styled-components';

export const WorkerPageStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 2rem;

  > .worker-content {
    flex: 1;

    display: flex;
    flex-direction: column;

    .worker-control-bar {
      display: flex;
      padding: 0 2rem;
      align-items: center;
      justify-content: end;
      border-bottom: 1px solid ${p => p.theme.colors.borderColor};

      > .Button {
        .bx {
          color: ${p => p.theme.colors.textColor2};
          font-size: 2rem;
        }
      }
    }

    .empty-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding-bottom: 8rem;
    }
  }

  .color-bar {
    width: 8px;
    border-radius: 2px;
    margin: 3px 10px 3px 0;
  }
`;
