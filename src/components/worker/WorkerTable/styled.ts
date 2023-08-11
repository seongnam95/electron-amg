import styled from 'styled-components';

export const WorkerTableStyled = styled.table`
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
`;
