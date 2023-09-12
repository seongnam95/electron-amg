import { ButtonHTMLAttributes } from 'react';

import styled, { css } from 'styled-components';

export interface ButtonStyledProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $color?: string;
  $hoverColor?: string;
  $bgColor?: string;
  $bgHoverColor?: string;
  $borderColor?: string;
  $fontSize?: string;
  $iconSize?: string;

  $primary?: boolean;
  $height?: string;
  $width?: string;
  $fullWidth?: boolean;
  $variations?: 'fill' | 'outline' | 'link' | 'icon';
  $btnSize?: 'small' | 'medium' | 'lazy';
  $animate?: boolean;
}

export const ButtonStyled = styled.button<ButtonStyledProps>`
  ${({ theme, $primary, $variations }) => {
    let fontColor, fontHoverColor, bgColor, bgHoverColor, borderColor;
    const primary = theme.colors.primary;
    const accent = theme.colors.accent;
    const hover = theme.colors.selectedHoverBg;

    switch ($variations) {
      case 'fill':
        fontColor = $primary ? 'white' : theme.colors.textColor2;
        fontHoverColor = $primary ? 'white' : theme.colors.textColor1;
        bgColor = $primary ? primary : theme.colors.innerBg;
        bgHoverColor = $primary ? accent : theme.colors.innerBg;
        borderColor = 'transparent';
        break;

      default:
        fontColor = $primary ? primary : theme.colors.textColor2;
        fontHoverColor = $primary ? accent : theme.colors.textColor1;
        bgColor = 'transparent';
        bgHoverColor = $primary ? hover : theme.colors.innerBg;
        borderColor =
          $variations === 'outline'
            ? $primary
              ? primary
              : theme.colors.borderColor
            : 'transparent';
        break;
    }
    return css`
      --fontColor: ${fontColor};
      --fontHoverColor: ${fontHoverColor};
      --bgColor: ${bgColor};
      --bgHoverColor: ${bgHoverColor};
      --borderColor: ${borderColor};
    `;
  }}

  ${({ theme, $btnSize, $fontSize, $iconSize }) => {
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
    }[$btnSize || 'medium'];

    return css`
      --size: ${sizes.size};
      --padding: ${sizes.padding};
      --fontSize: ${$fontSize ?? sizes.fontSize};
      --iconSize: ${$iconSize ?? sizes.iconSize};
    `;
  }}

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  width: ${p => (p.$fullWidth ? '100%' : p.$variations === 'icon' ? 'var(--size)' : p.$width)};
  height: ${p => (p.$variations === 'icon' ? 'var(--size)' : p.$height)};
  outline: none;
  border: 1px solid ${p => (p.$borderColor ? p.$borderColor : 'var(--borderColor)')};
  border-radius: ${p => (p.$variations === 'icon' ? '50%' : '3px')};
  padding: var(--padding);

  color: ${p => (p.$color ? p.$color : 'var(--fontColor)')};
  font-size: var(--fontSize);
  background-color: ${p => (p.$bgColor ? p.$bgColor : 'var(--bgColor)')};
  white-space: nowrap;

  transition: all 200ms;
  cursor: pointer;

  > i {
    font-size: var(--iconSize);
  }

  &:not(:disabled):hover {
    color: ${p => (p.$hoverColor ? p.$hoverColor : 'var(--fontHoverColor)')};
    background-color: ${p => (p.$bgHoverColor ? p.$bgHoverColor : 'var(--bgHoverColor)')};
  }

  :disabled {
    color: ${p => p.theme.colors.textColor2};
    background-color: ${p => (p.$variations === 'fill' ? p.theme.colors.disableBg : 'transparent')};
    cursor: default;
  }
`;
