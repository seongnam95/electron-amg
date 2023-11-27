import styled from 'styled-components';

export const IndexPageStyled = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  overflow: auto;

  height: 100%;
  padding: 2rem;
  background-color: ${p => p.theme.colors.innerBg};
`;
