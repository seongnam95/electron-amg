import styled from 'styled-components';

export const TeamSelectorStyled = styled.div`
  display: flex;

  .team-label {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 2rem;
    color: ${p => p.theme.colors.textColor1};
    border-radius: 0.4rem;
    padding: 0 0.8rem;

    &.selector {
      cursor: pointer;
      transition: all 120ms ease-in-out;

      :hover {
        background-color: ${p => p.theme.colors.innerBg};
      }
    }
  }

  .color-bar {
    width: 0.8rem;
    height: 1.8rem;
    border-radius: 0.2rem;
    transition: opacity 120ms ease-in-out;
  }
`;
