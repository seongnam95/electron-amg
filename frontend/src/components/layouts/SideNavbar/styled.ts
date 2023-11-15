import styled from 'styled-components';

export const SideNavbarStyled = styled.div`
  width: ${p => p.theme.sizes.navBarWidth};

  background-color: ${props => props.theme.colors.sidebarBG};
  border-right: 1px solid ${p => p.theme.colors.borderColor};

  padding: 1.4rem 0;
  z-index: 9999;

  a {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${props => props.theme.colors.textColor3};
    width: 100%;
    height: 6rem;

    transition: all 200ms;

    &.active {
      color: ${props => props.theme.colors.textColor1};
    }

    &:hover {
      color: ${props => props.theme.colors.textColor1};
    }

    .bx {
      position: relative;
      z-index: 1;
      font-size: 2.6rem;
      transition: 200ms color;
    }

    .menuActiveBG {
      position: absolute;
      background-color: ${props => props.theme.colors.sidebarSelected};
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 0;
    }
  }
`;
