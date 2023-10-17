import styled from 'styled-components';

export const DockStyled = styled.div`
  position: absolute;
  left: 50%;
  bottom: 4rem;

  .dock-wrap {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 6.4rem;
    height: 6.4rem;

    background-color: rgba(245, 245, 245, 0.6);
    backdrop-filter: blur(8px);
    box-shadow: rgba(66, 66, 66, 0.2) 0 8px 36px;

    border: 1px solid ${p => p.theme.colors.borderColor};
    border-radius: 1.2rem;
    z-index: 9999;

    cursor: pointer;

    > svg {
      font-size: 2.4rem;
      color: ${p => p.theme.colors.error};
      opacity: 0.9;
      transition: all 180ms ease-in-out;
    }

    :hover {
      > svg {
        font-size: 2.7rem;
      }
    }
  }
`;
