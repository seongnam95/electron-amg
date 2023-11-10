import styled from 'styled-components';

export const ExcelTableStyled = styled.div`
  --border: 1px solid ${p => p.theme.colors.borderColor};

  width: 100%;
  height: 20rem;
  border: var(--border);
  white-space: nowrap;
  overflow: scroll;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  tr {
    border-bottom: var(--border);

    &:not(:last-child) {
      border-bottom: var(--border);
    }
  }

  th {
    padding: 0.4rem 1.1rem;

    &:not(:last-child) {
      border-right: var(--border);
    }
  }

  td {
    text-align: center;

    &:not(:last-child) {
      padding: 0.4rem 1.1rem;
      border-right: var(--border);
    }
  }

  .row-title {
    background-color: #e6e6e6;
    font-weight: bold;
  }

  .column-title-row {
    background-color: #e6e6e6;
  }
`;
