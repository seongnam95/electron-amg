import styled from 'styled-components';

export const LayoutStyled = styled.div`
  --navbar-width: 8rem;
  --header-height: 4.6rem;

  position: relative;
  overflow: hidden;

  display: flex;
  width: 100vw;
  height: calc(100% - ${p => p.theme.sizes.titleBarHeight});

  .SideNavbar {
    width: var(--navbar-width);
  }

  .Header {
    height: var(--header-height);
    width: calc(100vw - var(--navbar-width));
  }

  .Content {
    overflow: hidden;

    height: calc(100% - var(--header-height));
    width: calc(100vw - var(--navbar-width));
  }
`;
