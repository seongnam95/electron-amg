import styled from 'styled-components';

export const LayoutStyled = styled.div`
  position: relative;

  display: flex;
  overflow: hidden;
  width: 100vw;
  height: calc(100% - ${p => p.theme.sizes.titleBarHeight});
`;
