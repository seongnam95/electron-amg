import { lighten } from 'polished';
import styled from 'styled-components';

export const TitlebarStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100vw;
  height: ${p => p.theme.sizes.titleBarHeight};
  background-color: ${p => p.theme.colors.titleBg};

  -webkit-app-region: drag;

  .logo {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: 'Aquatico';
    font-size: 1.3rem;
    padding: 0 1rem;
    color: ${p => p.theme.colors.textColorWhite2};
  }

  .control-wrap {
    display: flex;
    height: 100%;

    .controls:first-child {
      align-items: center;

      ::after {
        content: '';
        width: 1px;
        height: 50%;
        background-color: ${p => p.theme.colors.textColorWhite3};
        margin: 0 0.8rem;
      }
    }
  }

  .controls {
    display: flex;
    height: 100%;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 4rem;
      height: 100%;

      color: ${props => props.theme.colors.titleTextColor};

      cursor: pointer;
      transition: 200ms color, 200ms background-color;
      -webkit-app-region: no-drag;

      > i {
        font-size: 1.6rem;
      }

      &:hover {
        color: ${props => props.theme.colors.textColorWhite1};
        background-color: ${props => lighten(0.08, props.theme.colors.titleBgHover)};

        &.close {
          background-color: ${props => props.theme.colors.error};
        }
      }
    }
  }
`;
