import styled from 'styled-components';

export const EmployeeTableStyled = styled.div`
  flex: 1;
  position: relative;
  height: 100%;

  overflow: hidden;

  .employee-list {
    padding: 1.4rem 0;
    height: calc(100% - 5.4rem);
    overflow: auto;
  }

  .empty-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 5.4rem);
    padding-bottom: 14rem;
  }
`;
