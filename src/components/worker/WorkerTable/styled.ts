import styled from 'styled-components';

export const WorkerTableStyled = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: auto;

  .edit-bar {
    position: fixed;
    left: 24rem;
    right: 0;

    bottom: 0;
    background-color: ${p => p.theme.colors.formFieldBG};
    border-top: 1px solid ${p => p.theme.colors.borderColor};
    padding-bottom: 1rem;

    > button {
      font-size: ${p => p.theme.sizes.textLazy};
      color: ${p => p.theme.colors.error};

      > i {
        font-size: ${p => p.theme.sizes.iconSmall};
      }
    }
  }

  .worker-list {
    padding: 1.4rem 0;
  }

  .empty-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 5.4rem);
    padding-bottom: 14rem;
  }
`;
