import { darken, lighten } from 'polished';
import styled from 'styled-components';

export const ColorItem = styled.label<{ color: string }>`
  cursor: pointer;

  input[type='radio'] {
    display: none;
  }

  input:checked + .color-box {
    outline-color: ${p => p.color};
  }

  .color-box {
    display: flex;
    background-color: ${p => p.color};
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    outline: 1px solid ${p => p.theme.colors.borderColor};
    outline-offset: 2px;
    transition: all 140ms;

    :hover {
      transform: scale(1.1);
    }
  }
`;
