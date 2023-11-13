import styled from 'styled-components';

export const EmployeePageStyled = styled.div`
  position: relative;
  height: 100%;

  .Header {
    .control-btn-wrap {
      display: flex;
      align-items: center;

      > button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.7rem;
        padding: 0.2rem 1rem 0;
      }
    }
  }

  .EmployeeTable {
    height: calc(100% - ${p => p.theme.sizes.headerHeight});
  }
`;
