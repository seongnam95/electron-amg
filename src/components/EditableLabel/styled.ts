import styled from 'styled-components';

export interface EditableLabelStyledProps {
  fontSize?: string;
  bold?: boolean;
}

export const EditableLabelStyled = styled.div<EditableLabelStyledProps>`
  padding: 2rem;

  > input {
    display: inline-flex;

    font-weight: ${p => (p.bold ? 'bold' : 'normal')};
    font-size: ${p => (p.fontSize ? p.fontSize : p.theme.sizes.textMedium)};

    border: none;
    outline: none;
    border-radius: 2px;
    padding: 0.4rem 0.8rem;
    background-color: transparent;

    :disabled {
      background-color: transparent;
    }
  }

  :hover {
    background-color: ${p => p.theme.colors.underBg};
  }
`;
