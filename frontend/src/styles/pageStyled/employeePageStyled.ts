import styled from 'styled-components';

export const EmployeePageStyled = styled.div`
  height: 100%;

  .EmployeeTable {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;

    > div {
      flex: 1;

      > div {
        height: 100%;

        > div {
          height: 100%;
        }
      }
    }
  }
`;
