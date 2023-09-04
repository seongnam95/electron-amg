import { ButtonHTMLAttributes } from 'react';

import styled, { css } from 'styled-components';

export interface ButtonStyledProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  hoverColor?: string;
  bgColor?: string;
  bgHoverColor?: string;
  borderColor?: string;
  fontSize?: string;
  iconSize?: string;

  primary?: boolean;
  fullWidth?: boolean;
  variations?: 'fill' | 'outline' | 'link' | 'icon';
  btnSize?: 'small' | 'medium' | 'lazy';
  animate?: boolean;
}

export const ButtonStyled = styled.button<ButtonStyledProps>`
  ${({ theme, primary, color, bgColor, hoverColor, bgHoverColor, borderColor }) => {
    const font = primary ? theme.colors.primary : theme.colors.textColor2;
    const hover = primary ? theme.colors.accent : theme.colors.textColor1;
    const bg = primary ? theme.colors.primary : theme.colors.innerBg;
    const bgHover = primary ? theme.colors.selectedBg : theme.colors.innerBg;
    const border = primary ? theme.colors.primary : theme.colors.borderColor;

    return css`
      --color: ${color ?? font};
      --hoverColor: ${hoverColor ?? hover};
      --bgColor: ${bgColor ?? bg};
      --bgHoverColor: ${bgHoverColor ?? bgHover};
      --borderColor: ${borderColor ?? border};
    `;
  }};

  ${({ theme, btnSize, fontSize, iconSize }) => {
    const sizes = {
      small: {
        size: '3.8rem',
        padding: '0.5rem 1rem',
        fontSize: theme.sizes.textSmall,
        iconSize: theme.sizes.iconSmall,
      },
      medium: {
        size: '4rem',
        padding: '0.8rem 1.6rem',
        fontSize: theme.sizes.textMedium,
        iconSize: theme.sizes.iconMedium,
      },
      lazy: {
        size: '4.2rem',
        padding: '1rem 2rem',
        fontSize: theme.sizes.textLazy,
        iconSize: theme.sizes.iconLazy,
      },
    }[btnSize || 'medium'];

    return css`
      --size: ${sizes.size};
      --padding: ${sizes.padding};
      --fontSize: ${fontSize ?? sizes.fontSize};
      --iconSize: ${iconSize ?? sizes.iconSize};
    `;
  }}

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  outline: none;
  border: 1px solid transparent;
  border-radius: 3px;
  padding: var(--padding);

  color: var(--color);
  font-size: var(--fontSize);
  background-color: transparent;

  transition: all 200ms;
  cursor: pointer;

  :not(:disabled):hover {
    color: var(--hoverColor);
    background-color: var(--bgHoverColor);
  }

  &.fill-style {
    color: ${p => (p.primary ? 'white' : p.theme.colors.textColor2)};
    background-color: var(--bgColor);

    :not(:disabled):hover {
      color: ${p => (p.primary ? 'white' : p.theme.colors.textColor1)};
      background-color: ${p => (p.primary ? p.theme.colors.accent : p.theme.colors.innerBg)};
    }
  }

  &.outline-style {
    border-color: var(--borderColor);
  }

  &.icon-style {
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
  }

  > i {
    font-size: var(--iconSize);
  }

  :disabled {
    color: ${p => p.theme.colors.textColor2};
    background-color: ${p => p.theme.colors.disableBg};
  }
`;
