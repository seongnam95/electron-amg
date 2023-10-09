import styled from 'styled-components';

export const EmployeeListItemStyled = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.3rem 2rem;

  color: ${p => p.theme.colors.textColor1};
  font-size: ${p => p.theme.sizes.textMedium};

  transition: all 200ms;
  cursor: pointer;

  > .item {
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;

    &.name {
      display: flex;
      gap: 1.4rem;
      width: 12rem;
    }

    &.position {
      width: 5rem;
    }

    &.group-name {
      width: 13rem;
    }

    &.wage {
      width: 12rem;
    }
  }

  :hover {
    background-color: rgb(247, 247, 247);
  }
`;
