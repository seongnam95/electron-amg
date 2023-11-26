import styled from 'styled-components';

export const EmployeePageStyled = styled.div`
  --toolbar-height: 3.8rem;

  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;

  .tool-bar {
    height: var(--toolbar-height);
    margin-bottom: 1.4rem;
  }

  .table-container {
    overflow: hidden;
    height: calc(100% - var(--toolbar-height));
  }

  .EmployeeTable {
    height: 100%;
    overflow: auto;
  }
`;
