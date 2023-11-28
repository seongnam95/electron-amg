import { darken } from 'polished';
import styled from 'styled-components';

export const PositionFieldsStyled = styled.div`
  display: flex;
  flex-direction: column;

  .position-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 20rem;
  }

  .position-add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    outline: none;
    border: none;
    width: 100%;
    border-radius: 4px;
    padding: 0.9rem 0 0.7rem;
    background-color: transparent;
    color: ${p => p.theme.colors.primary};

    transition: all 140ms;
    cursor: pointer;

    :hover {
      background-color: ${p => p.theme.colors.innerBg};
    }

    :active {
      background-color: ${p => darken(0.06, p.theme.colors.innerBg)};
      transform: translate(1px, 1px);
    }
  }
`;
