import styled from 'styled-components';

export const InitTeamCreateMaskStyled = styled.div`
  position: fixed;
  left: 0;
  top: ${p => p.theme.sizes.titleBarHeight};

  background-color: rgba(220, 220, 220, 0.4);
  backdrop-filter: blur(4px);

  width: 100vw;
  height: calc(100vh - ${p => p.theme.sizes.titleBarHeight});

  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;
`;
