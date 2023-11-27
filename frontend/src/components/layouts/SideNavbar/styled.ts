import styled from 'styled-components';

export const SideNavbarStyled = styled.div`
  background-color: ${props => props.theme.colors.sidebarBG};
  border-right: 1px solid ${p => p.theme.colors.borderColor};

  padding: 1.4rem 0;
  z-index: 10;

  a {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${props => props.theme.colors.textColor3};
    width: 100%;
    height: 6rem;

    transition: all 140ms;

    &.active,
    &:hover {
      color: ${props => props.theme.colors.sidebarIconActive};
      .menu-icon {
        transform: scale(1.06);
      }
    }

    .menu-icon {
      position: relative;
      z-index: 1;
      font-size: 2.4rem;
      transition: all 140ms;
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
