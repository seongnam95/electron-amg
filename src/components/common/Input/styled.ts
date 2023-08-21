import styled from 'styled-components';

export interface InputStyledProps {}

export const InputStyled = styled.label<InputStyledProps>`
  display: flex;
  gap: 1.4rem;
  align-items: center;
  padding: 0.9rem 1.6rem 0.7rem 1.2rem;
  border: 1px solid ${p => p.theme.colors.borderColor};
  border-radius: 2px;

  transition: all 200ms;

  > input {
    border: none;
    outline: none;
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
