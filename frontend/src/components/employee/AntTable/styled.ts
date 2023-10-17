import styled from 'styled-components';

export const EmployeeTableWrapStyled = styled.div`
  height: calc(100% - 7rem);
  white-space: nowrap;
  overflow: auto;

  /* table header */
  .employee-table-thead {
    position: sticky;
    top: 0;
    z-index: 3;

    .anticon {
      font-size: 8px;
    }

    > tr > th {
      background-color: ${p => p.theme.colors.contentBG};
      font-weight: normal;
      font-size: ${p => [p.theme.sizes.textSmall]};
      color: ${p => p.theme.colors.textColor2};
      background-color: ${p => p.theme.colors.contentBG};
      padding: 1rem 1.8rem;

      ::before {
        content: '';
        display: none;
      }
    }
  }

  /* table body */
  .employee-table-tbody > tr > td {
    border: none;
    padding: 1.2rem 1.8rem;
  }

  .employee-table-cell {
    :nth-of-type(1),
    :nth-of-type(2) {
      position: sticky;
      z-index: 2;
      background-color: rgb(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
    }

    :nth-of-type(1) {
      left: 0;
    }

    :nth-of-type(2) {
      left: 32px;
      border-right: 1px solid rgb(245, 245, 245);
    }
  }
`;
