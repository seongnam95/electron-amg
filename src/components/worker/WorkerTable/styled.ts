import styled from 'styled-components';

export const WorkerTableStyled = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: auto;

  .control-bar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 5.4rem;
    padding: 0 1.4rem;
    border-bottom: 1px solid ${p => p.theme.colors.borderColor};

    > .section {
      position: absolute;
      right: 1.4rem;
      display: flex;
      gap: 0.4rem;
    }
  }

  .table-wrap {
    padding: 0 1.2rem;

    > table {
      width: 100%;

      th {
        height: 3.4rem;
        font-size: ${p => p.theme.sizes.textSmall};
        color: ${p => p.theme.colors.textColor2};
      }

      td {
        height: 3rem;
        text-align: center;
        font-size: ${p => p.theme.sizes.textSmall};
        color: ${p => p.theme.colors.textColor1};
      }
    }
  }

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

  .empty-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-bottom: 8rem;
  }
`;
