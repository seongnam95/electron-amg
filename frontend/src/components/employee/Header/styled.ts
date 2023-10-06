import styled from 'styled-components';

export const HeaderStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  width: 100%;

  border-bottom: 1px solid ${p => p.theme.colors.borderColor};
`;
