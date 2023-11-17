import styled from 'styled-components';

export const DayTableStyled = styled.div`
  position: relative;
  padding-bottom: 9rem;

  .ant-table-cell {
    &.first-cell {
      border-right: 1px solid ${p => p.theme.colors.borderColor};
    }

    &.last-cell {
      border-left: 1px solid ${p => p.theme.colors.borderColor};
    }
  }
`;
