import { HTMLAttributes } from 'react';

import styled, { CSSProperties } from 'styled-components';

export const TeamSelectorStyled = styled.div`
  display: flex;

  .btn-wrap {
    display: flex;
    justify-content: end;
    width: 22rem;
  }

  .team-label {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 1rem;
    font-size: 1.6rem;
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
`;
