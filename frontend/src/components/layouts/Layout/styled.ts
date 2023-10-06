import styled from 'styled-components';

export const LayoutStyled = styled.div`
  display: flex;

  width: 100vw;
  height: calc(100% - ${p => p.theme.sizes.titleBarHeight});
`;
