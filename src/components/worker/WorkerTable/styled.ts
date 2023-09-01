import styled from 'styled-components';

export const WorkerTableStyled = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  overflow-y: auto;
  padding-bottom: 5rem;

  .empty-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-bottom: 8rem;
  }

  > table {
    width: 100%;

    tr {
      height: 3rem;
    }

    th {
      font-size: ${p => p.theme.sizes.textSmall};
      color: ${p => p.theme.colors.textColor2};
    }

    td {
      text-align: center;
      font-size: ${p => p.theme.sizes.textSmall};
      color: ${p => p.theme.colors.textColor1};
    }
  }

  .edit-bar {
    position: fixed;
    left: 24rem;
    right: 0;

    bottom: 0;
    background-color: ${p => p.theme.colors.formFieldBG};
    border-top: 1px solid ${p => p.theme.colors.borderColor};

    > .Button {
      display: flex;

      white-space: nowrap;
      font-size: ${p => p.theme.sizes.textLazy};
      font-weight: bold;
      color: ${p => p.theme.colors.error};

      > i {
        font-size: ${p => p.theme.sizes.iconSmall};
      }
    }
  }
`;
