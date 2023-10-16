import styled from 'styled-components';

export const EmployeeTableWrapStyled = styled.div`
  height: calc(100% - 7rem);

  .employee-table {
    height: 100%;

    > div {
      height: 100%;
    }
  }

  .employee-table-content {
    background-color: ${p => p.theme.colors.contentBG};
    border: none;
    overflow: auto;
    white-space: nowrap;
    height: 100%;

    .employee-table-thead > tr > th {
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

    .employee-table-tbody > tr > td {
      border: none;
      padding: 1.4rem 1.6rem;
    }
  }

  .ant-pagination {
    display: flex;
    justify-content: center;
  }
`;
