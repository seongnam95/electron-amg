import styled from 'styled-components';

export const ImageViewButtonStyled = styled.div`
  flex: 1;

  .img-btn {
    width: 100%;
    display: flex;
    flex-direction: column;

    align-items: center;
    gap: 0.6rem;

    outline: none;
    border: none;
    border-radius: 0.8rem;

    padding: 1.4rem 2rem 0.8rem;
    color: ${p => p.theme.colors.textColor2};
    background-color: ${p => p.theme.colors.innerBg};
    transition: all 200ms ease-in-out;
    cursor: pointer;

    svg {
      color: ${p => p.theme.colors.textColor2};
      transition: all 200ms ease-in-out;
    }

    :hover {
      color: ${p => p.theme.colors.primary};
      background-color: ${p => p.theme.colors.selectedHoverBg};

      svg {
        color: ${p => p.theme.colors.primary};
      }
    }
  }
`;
