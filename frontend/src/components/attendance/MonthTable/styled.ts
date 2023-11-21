import styled from 'styled-components';

export const MonthTableStyled = styled.div`
  tr {
    border-bottom: 1px solid ${p => p.theme.colors.borderColor} !important;
  }

  .ant-table-cell {
    :not(:first-child) {
      padding: 0 !important;
    }

    :not(:nth-last-child(2)):not(:first-child) {
      border-right: 1px solid ${p => p.theme.colors.borderColor};
    }

    &.day-cell {
      &.saturday {
        background-color: rgba(51, 118, 205, 0.04);
      }

      &.sunday {
        background-color: rgba(237, 106, 94, 0.04);
      }
    }

    &.last-cell {
      position: sticky;
      right: 0;
      background-color: ${p => p.theme.colors.innerBg};
      border-left: 1px solid ${p => p.theme.colors.borderColor};
    }
  }
`;
