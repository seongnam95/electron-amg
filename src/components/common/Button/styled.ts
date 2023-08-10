import styled from 'styled-components';

export interface ButtonStyledProps {
  fullWidth?: boolean;
  variations?: 'primary' | 'outline' | 'link' | 'icon';
}

export const ButtonStyled = styled.button<ButtonStyledProps>`
  --color: ${p => (p.variations === 'primary' ? 'white' : p.theme.colors.primary)};
  --bgColor: ${p => (p.variations === 'primary' ? p.theme.colors.primary : 'transparent')};

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  width: ${p => (p.fullWidth ? '100%' : 'auto')};
  padding: ${p => p.variations !== 'icon' && '0.8rem 1.6rem'};
  width: ${p => p.variations === 'icon' && '4.2rem'};
  height: ${p => p.variations === 'icon' && '4.2rem'};

  outline: none;
  border: 1px solid transparent;
  border-color: ${p => p.variations === 'outline' && p.theme.colors.primary};
  border-radius: ${p => (p.variations === 'icon' ? '50%' : '3px')};
  background-color: var(--bgColor);

  font-size: ${p => p.theme.sizes.textMedium};
  color: var(--color);

  transition: all 200ms;
  cursor: pointer;

  :hover {
    background-color: ${p => (p.variations === 'primary' ? '' : p.theme.colors.underBg)};
  }
`;
