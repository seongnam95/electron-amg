import styled from 'styled-components';

export const EmployeePageStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;

  .table-container {
    height: 100%;
    overflow: hidden;
  }

  .EmployeeTable {
    height: 100%;
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid ${p => p.theme.colors.borderColor};
  }
`;
