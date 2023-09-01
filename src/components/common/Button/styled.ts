import styled, { css } from 'styled-components';

export interface ButtonStyledProps {
  fullWidth?: boolean;
  variations?: 'fill' | 'outline' | 'link' | 'icon' | 'default';
  size?: 'small' | 'medium' | 'lazy';
  animate?: boolean;
}

export const ButtonStyled = styled.button<ButtonStyledProps>`
  --color: ${p =>
    p.variations === 'fill'
      ? 'white'
      : p.variations === 'icon'
      ? p.theme.colors.textColor2
      : p.theme.colors.primary};
  --bgColor: ${p =>
    p.variations === 'fill'
      ? p.theme.colors.primary
      : p.variations === 'default'
      ? p.theme.colors.selectedBg
      : 'transparent'};
  --hoverColor: ${p =>
    p.variations === 'fill'
      ? p.theme.colors.accent
      : p.variations === 'default'
      ? p.theme.colors.selectedHoverBg
      : p.theme.colors.innerBg};

  ${p =>
    p.size === 'small'
      ? css`
          --fontSize: ${p => p.theme.sizes.textSmall};
          --padding: 0.5rem 1rem;
          --btnSize: 3.8rem;
          --iconSize: 1.8rem;
        `
      : p.size === 'lazy'
      ? css`
          --fontSize: ${p => p.theme.sizes.textLazy};
          --padding: 1rem 2rem;
          --btnSize: 4.2rem;
          --iconSize: 2.4rem;
        `
      : css`
          --fontSize: ${p => p.theme.sizes.textMedium};
          --padding: 0.8rem 1.6rem;
          --btnSize: 4rem;
          --iconSize: 2rem;
        `};

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  width: ${p => (p.variations === 'icon' ? 'var(--btnSize)' : p.fullWidth ? '100%' : 'auto')};
  height: ${p => p.variations === 'icon' && 'var(--btnSize)'};
  padding: var(--padding);

  outline: none;
  border: 1px solid transparent;
  border-color: ${p => p.variations === 'outline' && p.theme.colors.primary};
  border-radius: ${p => (p.variations === 'icon' ? '50%' : '3px')};
  background-color: var(--bgColor);

  font-size: var(--fontSize);
  color: var(--color);

  transition: all 200ms;
  cursor: pointer;

  :not(:disabled):hover {
    background-color: var(--hoverColor);
    transform: ${p => p.animate && 'translateY(-1px)'};

    > i {
      color: ${p => p.variations === 'icon' && p.theme.colors.textColor1};
    }
  }

  :disabled {
    color: ${p => p.theme.colors.textColor2};
    background-color: ${p => p.theme.colors.disableBg};
  }

  > i {
    font-size: var(--iconSize);
    transition: all 200ms;
  }
`;
