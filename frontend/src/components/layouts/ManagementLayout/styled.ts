import styled from 'styled-components';

export const ManagementLayoutStyled = styled.div`
  --navbar-width: 7.8rem;
  --header-height: 4.6rem;

  position: relative;
  overflow: hidden;

  display: flex;
  width: 100vw;
  height: calc(100% - ${p => p.theme.sizes.titleBarHeight});

  .container {
    background-color: ${p => p.theme.colors.innerBg};
  }

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
    background-color: ${p => p.theme.colors.contentBG};
  }
`;
