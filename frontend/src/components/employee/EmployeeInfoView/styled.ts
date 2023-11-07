import styled from 'styled-components';

export const EmployeeInfoViewStyled = styled.div`
  .img-btn {
    flex: 1;
    display: flex;
    flex-direction: column;

    align-items: center;
    gap: 0.6rem;

    outline: none;
    border: none;
    border-radius: 0.8rem;

    padding: 1.4rem 0 0.8rem;
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
