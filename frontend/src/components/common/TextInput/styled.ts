import styled from 'styled-components';

export const TextInputStyled = styled.div`
  input {
    outline: none;
    border: none;
    background-color: ${p => p.theme.colors.innerBg};
    border-radius: 4px;
    text-align: center;
    width: 5rem;
    height: 100%;
  }
`;
