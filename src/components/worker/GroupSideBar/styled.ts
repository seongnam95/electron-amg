import styled from 'styled-components';

export const GroupSideBarStyled = styled.div`
  height: 100%;
  width: 20rem;

  border-right: 1px solid ${p => p.theme.colors.borderColor};

  > .menus {
    > .item {
      padding: 0.8rem 2rem;

      color: ${p => p.theme.colors.textColor3};
      font-size: ${p => p.theme.sizes.textMedium};

      transition: all 140ms;

      cursor: pointer;

      &.active {
        font-weight: bold;
        color: ${p => p.theme.colors.primary};
      }

      :not(.active):hover {
        color: ${p => p.theme.colors.textColor2};
      }
    }
  }
`;
