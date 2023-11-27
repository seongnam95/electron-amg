import styled from 'styled-components';

export const EmployeePageStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;

  .table-container {
    overflow: hidden;

    .EmployeeTable {
      height: 100%;
      overflow: auto;
    }
  }
`;
