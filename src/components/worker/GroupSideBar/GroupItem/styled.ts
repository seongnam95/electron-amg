import { LiHTMLAttributes } from 'react';

import styled, { css } from 'styled-components';

export interface GroupItemStyledProps extends LiHTMLAttributes<HTMLLIElement> {
  color?: string;
  activate?: boolean;
  disabled?: boolean;
}

export const GroupItemStyled = styled.li<GroupItemStyledProps>`
  display: flex;
  align-items: center;
  height: 4.2rem;

  color: ${p => (p.activate ? p.theme.colors.primary : p.theme.colors.textColor2)};
  font-weight: ${p => (p.activate ? 'bold' : 'normal')};
  font-size: ${p => p.theme.sizes.textMedium};
  background-color: transparent;

  transition: all 140ms;

  cursor: ${p => (p.disabled ? 'default' : 'pointer')};

  .color-bar {
    width: 0.8rem;
    height: 1.8rem;
    border-radius: 2px;
    margin: 3px 10px 3px 0;
    background-color: ${p => p.color};
  }

  ${p =>
    !(p.activate || p.disabled) &&
    css`
      :hover {
        color: ${p.theme.colors.textColor1};
      }
    `}
`;
