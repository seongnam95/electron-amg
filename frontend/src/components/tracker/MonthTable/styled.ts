import styled from 'styled-components';

export const MonthTableStyled = styled.div`
  tr {
    border-bottom: 1px solid ${p => p.theme.colors.borderColor} !important;
  }

  .ant-table-cell {
    :not(:nth-last-child(2)):not(:first-child) {
      border-right: 1px solid ${p => p.theme.colors.borderColor};
    }

    &.day-cell {
      padding: none !important;

      &.is-sunday {
        background-color: rgba();
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
