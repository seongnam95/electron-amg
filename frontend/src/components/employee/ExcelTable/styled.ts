import styled from 'styled-components';

export const ExcelTableStyled = styled.div`
  --border: 1px solid ${p => p.theme.colors.borderColor};

  width: 100%;
  height: 20rem;
  border: var(--border);
  white-space: nowrap;
  overflow-x: scroll;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  tr {
    border-bottom: var(--border);
  }

  th {
    padding: 10px;
  }

  td {
  }
`;
