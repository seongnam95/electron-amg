import styled from 'styled-components';

export const ControlBarStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7rem;
  padding: 1.2rem 2rem 0;
  border-bottom: 1px solid ${p => p.theme.colors.borderColor};

  .control-wrap {
    display: flex;
    align-items: center;
    gap: 0.4rem;

    .search-input {
      margin-right: 1rem;
    }
  }
`;
