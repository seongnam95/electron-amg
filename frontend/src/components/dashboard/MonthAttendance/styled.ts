import styled from 'styled-components';

export const MonthAttendanceStyled = styled.div`
  overflow-y: auto;
  height: 100%;
  border-radius: 0.4rem;
  border: 1px solid ${p => p.theme.colors.borderColor};

  table {
    position: relative;
    width: 100%;
    white-space: nowrap;
    border-collapse: collapse;

    thead {
      > tr {
        background-color: ${p => p.theme.colors.innerBg};

        :first-child {
          font-weight: normal;
        }

        :last-child {
          border-bottom: 1px solid ${p => p.theme.colors.borderColor};

          > th {
            font-weight: normal;
          }
        }

        th {
          padding: 0.6rem 1.6rem;
        }
      }
    }

    td {
      padding: 1rem 1.6rem;
    }

    .total-cell {
      color: ${p => p.theme.colors.primary};
      font-weight: bold;
    }
  }

  .color-box {
    width: 1.6rem;
    height: 1.4rem;
    border-radius: 0.3rem;
  }

  .hint-text {
    font-size: ${p => p.theme.sizes.textSmall};
    color: ${p => p.theme.colors.textColor3};
    margin-left: 3px;
    font-weight: normal;
  }
`;
