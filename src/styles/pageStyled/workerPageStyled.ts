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

    .header-text {
      display: flex;
      align-items: baseline;
      gap: 2rem;
      padding: 1.8rem;
      font-weight: bold;
      font-size: 2.2rem;

      .explanation-text {
        display: flex;
        align-items: center;
        color: ${p => p.theme.colors.textColor3};
        font-size: 1.2rem;
        font-weight: normal;

        ::before {
          content: '*';
          padding: 0.5rem 0.8rem 0 0;
        }
      }

      &.is-group {
        cursor: pointer;
        :hover {
          background-color: ${p => p.theme.colors.underBg};
        }
      }
    }

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
