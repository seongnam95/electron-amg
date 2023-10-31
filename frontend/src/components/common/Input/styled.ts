import { InputHTMLAttributes } from 'react';

import styled from 'styled-components';

export interface InputStyledProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  variations?: 'fill' | 'outline' | 'line';
}

export const InputStyled = styled.label<InputStyledProps>`
  display: flex;
  align-items: center;
  gap: 1rem;

  width: ${p => (p.fullWidth ? '100%' : p.width ? p.width : 'auto')};
  height: 3.4rem;

  padding: 0.1rem 1.6rem 0 1.2rem;
  border: 1px solid transparent;
  border-radius: 4px;

  border-color: ${p => (p.variations === 'fill' ? 'transparent' : p.theme.colors.borderColor)};
  background-color: ${p => (p.variations === 'fill' ? p.theme.colors.innerBg : 'transparent')};

  transition: all 200ms;

  > input {
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: ${p => p.theme.sizes.textSmall};
  }

  :focus-within {
    border-color: ${p => p.theme.colors.primary};

    > svg {
      color: ${p => p.theme.colors.primary};
    }
  }

  > svg {
    font-size: 1.6rem;
    color: ${p => p.theme.colors.textColor3};
    transition: all 200ms;
  }
`;
