import styled from 'styled-components';

export const EmployeeTableWrapStyled = styled.div`
  height: calc(100% - 7rem);
  white-space: nowrap;
  overflow: auto;

  /* table header */
  .employee-table-thead {
    position: fixed;

    > tr > th {
      background-color: white;
      font-weight: normal;
      font-size: ${p => [p.theme.sizes.textSmall]};
      color: ${p => p.theme.colors.textColor2};
      background-color: ${p => p.theme.colors.contentBG};
      padding: 1.2rem 1.6rem;

      ::before {
        content: '';
        display: none;
      }
    }
  }

  /* table body */
  .employee-table-tbody > tr > td {
    border: none;
    padding: 1.4rem 1.6rem;
  }
`;
