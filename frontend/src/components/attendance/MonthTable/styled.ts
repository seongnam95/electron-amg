import styled from 'styled-components';

export const MonthTableStyled = styled.div`
  height: 100%;
  overflow: hidden;
  border: 1px solid ${p => p.theme.colors.borderColor};
  border-radius: 8px;

  .ant-table-cell {
    ::before {
      display: none;
    }

    &.day {
      padding: 0 !important;

      &.saturday {
        font-weight: bold;
        color: ${p => p.theme.colors.blue};
        background-color: rgb(247, 250, 253, 0.8);
      }

      &.sunday {
        font-weight: bold;
        color: ${p => p.theme.colors.red};
        background-color: rgba(254, 249, 249, 0.8);
      }
    }

    :not(:last-child) {
      border-right: 1px solid ${p => p.theme.colors.borderColor};
    }
  }
`;
