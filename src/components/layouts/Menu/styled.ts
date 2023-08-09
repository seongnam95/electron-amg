import styled from 'styled-components';

export const MenuStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 7rem;
  width: 100%;

  border-bottom: 1px solid ${p => p.theme.colors.borderColor};

  > .header {
    position: absolute;
    left: 2rem;

    font-weight: bold;
    font-size: ${p => p.theme.sizes.textMedium};
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.textColor1};

    i {
      font-size: ${p => p.theme.sizes.textMedium};
      margin-right: 1rem;
      color: ${props => props.theme.colors.textColor2};
    }

    > span {
      margin-bottom: -1px;

      > span {
        & + span::before {
          content: '/';
          display: inline-block;
          margin: 0 0.6rem;
          font-weight: bold;
          color: ${props => props.theme.colors.textColor2};
        }
      }
    }
  }

  > .menus {
    display: flex;
    gap: 0.8rem;

    .item {
      position: relative;

      display: flex;
      justify-content: center;
      align-items: center;

      width: 4.2rem;
      height: 4.2rem;
      border-radius: 6px;

      transition: all 240ms;

      > i {
        z-index: 1;

        color: ${p => p.theme.colors.textColor2};
        font-size: 2.4rem;

        transition: all 240ms;
      }

      &.active {
        > i {
          color: ${p => p.theme.colors.textColorWhite1};
          font-size: 2.4rem;
        }
      }

      :not(.active):hover {
        background-color: ${p => p.theme.colors.underBg};

        > i {
          color: ${p => p.theme.colors.textColor1};
        }
      }

      .menuActiveBG {
        position: absolute;
        border-radius: 6px;
        background-color: ${props => props.theme.colors.primary};
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 0;
      }
    }
  }
`;
