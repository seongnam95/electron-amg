import styled from 'styled-components';

export const SidebarStyled = styled.div`
  min-width: 20rem;
  width: 20rem;
  background-color: ${props => props.theme.colors.sidebarBG};
  color: ${props => props.theme.colors.textColor1};
  border-right: 1px solid ${p => p.theme.colors.borderColor};

  .menus {
    .menuGroup {
      padding: 2rem 0rem;

      & + .menuGroup {
        border-top: 1px solid ${props => props.theme.colors.borderColor};
      }

      .title {
        font-size: ${p => p.theme.sizes.textSmall};
        margin-bottom: 0.8rem;
        padding: 0 1.6rem;
      }

      a {
        display: flex;
        align-items: center;
        color: ${props => props.theme.colors.textColor2};
        width: 100%;
        height: 4rem;
        padding: 2.4rem 1.8rem;
        transition: 300ms background-color;
        position: relative;

        & + a {
          margin-top: 0.3rem;
        }

        &.active {
          color: ${props => props.theme.colors.textColor1};

          .bx {
            color: ${props => props.theme.colors.primary};
          }
        }

        &:hover {
          color: ${props => props.theme.colors.textColor1};
        }

        .bx,
        span {
          position: relative;
          z-index: 1;
        }

        .bx {
          font-size: ${p => p.theme.sizes.iconMedium};
          margin-right: 1.2rem;
          transition: 200ms color;
        }

        span {
          font-size: ${p => p.theme.sizes.textMedium};
          margin-bottom: -1px;
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
    }
  }
`;
