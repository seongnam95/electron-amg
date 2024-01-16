import styled from 'styled-components';

export const InitPageStyled = styled.div`
  position: relative;
  height: 100%;

  .container {
    position: absolute;
    left: 50%;
    top: 6%;
    transform: translateX(-50%);
  }

  .close-btn {
    position: fixed;
    right: 1.4rem;
    top: calc(1.4rem + ${p => p.theme.sizes.titleBarHeight});
  }
`;
