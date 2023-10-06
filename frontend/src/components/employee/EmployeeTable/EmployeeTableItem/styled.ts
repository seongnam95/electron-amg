import styled from 'styled-components';

export const EmployeeListItemStyled = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.3rem 2rem;

  color: ${p => p.theme.colors.textColor1};
  font-size: ${p => p.theme.sizes.textMedium};

  > .item {
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;

    &.name {
      width: 12rem;
    }

    &.position {
      width: 5rem;
    }

    &.phone {
      width: 12rem;
    }
  }

  :hover {
    background-color: ${p => p.theme.colors.innerBg};
  }
`;
