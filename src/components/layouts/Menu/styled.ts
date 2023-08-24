import styled from 'styled-components';

export const MenuStyled = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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
      background-color: ${p => p.theme.colors.innerBg};

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
`;
