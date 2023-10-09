import styled from 'styled-components';

export const EmployeeTableStyled = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  overflow: hidden;

  .table-wrap {
    padding: 1.4rem 1rem;
    width: 100%;
    height: calc(100% - 7rem);
    overflow: auto;

    > table {
      width: 100%;

      th {
        font-weight: normal;
        color: ${p => p.theme.colors.textColor3};
        font-size: ${p => p.theme.sizes.textSmall};
        padding: 0.6rem 0;
      }
    }
  }

  .empty-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 5.4rem);
    padding-bottom: 14rem;
  }
`;
