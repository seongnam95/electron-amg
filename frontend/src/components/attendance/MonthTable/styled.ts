import styled from 'styled-components';

export const MonthTableStyled = styled.div`
  margin: 0 2rem 2rem;

  .ant-table-cell {
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
  }
`;
