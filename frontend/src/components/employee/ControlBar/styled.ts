import styled from 'styled-components';

export const ControlBarStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7rem;
  padding: 1.2rem 2rem 0;
  border-bottom: 1px solid ${p => p.theme.colors.borderColor};

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
`;
