import styled from 'styled-components';

export const EmployeeTableStyled = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;

  .table-wrap {
    padding: 1.4rem 1rem;
    width: 100%;
    height: calc(100% - 7rem);
    overflow: overlay;

    > table {
      width: 100%;

      th {
        text-align: start;
        font-weight: normal;
        color: ${p => p.theme.colors.textColor3};
        font-size: ${p => p.theme.sizes.textSmall};
        height: 4rem;

        .wage-th-wrap {
          display: flex;
          align-items: center;
          gap: 0.8rem;

          > svg {
            font-size: 1rem;
          }
        }

        :first-child {
          padding-left: 1.2rem;
        }

        &:not(:first-child) {
          padding-left: 1.8rem;
        }
      }

      .cell-center {
        padding-left: 0.6rem !important;
        padding-right: 0.6rem !important;
        text-align: center;

        .center-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
        }
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
