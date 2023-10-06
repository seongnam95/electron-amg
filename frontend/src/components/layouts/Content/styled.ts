import styled from 'styled-components';

export const ContentStyled = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100vw - ${p => p.theme.sizes.navBarWidth});
  background-color: ${props => props.theme.colors.contentBG};
`;
