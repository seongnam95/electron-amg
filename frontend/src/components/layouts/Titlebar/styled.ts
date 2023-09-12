import { lighten } from 'polished';
import styled from 'styled-components';

export const TitlebarStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 3.2rem;
  background-color: ${p => p.theme.colors.titleBg};
  -webkit-app-region: drag;

  .logo {
    height: 100%;

    margin-bottom: 2rem;
    padding: 0 1rem;
    font-family: 'Aquatico';
    font-size: 1.1rem;
    color: ${p => p.theme.colors.textColorWhite2};
    display: flex;
    align-items: center;

    img {
      margin-right: 0.6rem;
    }
  }

  .controls {
    display: flex;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 3.8rem;
      height: 100%;

      color: ${props => props.theme.colors.titleTextColor};

      cursor: pointer;
      transition: 200ms color, 200ms background-color;
      -webkit-app-region: no-drag;

      > i {
        font-size: 1.4rem;
      }

      &:hover {
        color: ${props => props.theme.colors.textColorWhite1};
        background-color: ${props => lighten(0.08, props.theme.colors.titleBgHover)};

        &.close {
          background-color: ${props => props.theme.colors.error};
        }
      }

      &.minimize > i {
        font-size: 1.6rem;
        margin-top: 0.4rem;
      }

      &.close > i {
        font-size: 2.1rem;
      }

      &:first-child > i {
        margin-top: 1px;
      }
    }
  }
`;
