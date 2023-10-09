import styled from 'styled-components';

export const EmployeeListItemStyled = styled.tr`
  color: ${p => p.theme.colors.textColor2};
  font-size: ${p => p.theme.sizes.textMedium};
  transition: all 200ms;

  .employee-name {
    display: flex;
    gap: 1.2rem;
    color: ${p => p.theme.colors.textColor1};

    span:last-child {
      padding-top: 0.1rem;
    }
  }

  > td {
    padding: 0.9rem 1.2rem 0.7rem;
    white-space: nowrap;
  }

  .commute-btn {
    color: white;
    background-color: ${p => p.theme.colors.primary};
    border: 1px solid transparent;
    border-radius: 2px;
    padding: 0.2rem 0.8rem;
    box-shadow: rgba(140, 140, 140, 0.2) 0 4px 12px;
    transition: all 200ms;
    cursor: pointer;

    &.working {
      border-color: ${p => p.theme.colors.primary};
      background-color: transparent;
      color: ${p => p.theme.colors.primary};
    }

    :active {
      background-color: ${p => p.theme.colors.accent};
    }
  }

  :hover {
    background-color: rgb(247, 247, 247);
  }
`;
