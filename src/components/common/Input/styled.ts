import styled from 'styled-components';

export interface InputStyledProps {
  fullWidth?: boolean;
  variations?: 'fill' | 'outline';
}

export const InputStyled = styled.label<InputStyledProps>`
  display: flex;
  align-items: center;
  gap: 1.4rem;

  width: ${p => (p.fullWidth ? '100%' : 'auto')};
  height: 3.8rem;

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

    > i {
      color: ${p => p.theme.colors.primary};
    }
  }

  > i {
    font-size: 1.8rem;
    color: ${p => p.theme.colors.textColor3};
    transition: all 200ms;
  }
`;
