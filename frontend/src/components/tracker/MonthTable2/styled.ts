import styled from 'styled-components';

export const MonthTable2Styled = styled.div`
  white-space: nowrap;

  td {
    position: relative;
    border-right: 1px solid ${p => p.theme.colors.borderColor};
  }

  .table-cell {
    font-weight: normal;
    padding: 1rem 1.4rem;
    color: rgb(118, 118, 118);
    font-size: ${p => p.theme.sizes.textSmall};
  }
`;
