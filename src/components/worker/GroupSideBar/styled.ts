import styled from 'styled-components';

export const GroupSideBarStyled = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 24rem;

  padding: 1.8rem 1.8rem 3rem;

  border-right: 1px solid ${p => p.theme.colors.borderColor};

  > .menus {
    overflow-y: auto;
    margin: 0;

    .item {
      display: flex;
      padding: 1rem 0;

      color: ${p => p.theme.colors.textColor2};
      font-size: ${p => p.theme.sizes.textMedium};

      transition: all 140ms;

      cursor: pointer;

      &.active {
        font-weight: bold;
        color: ${p => p.theme.colors.primary};
      }

      :not(.active):hover {
        color: ${p => p.theme.colors.textColor1};
      }
    }
  }

  > .empty-group-wrap {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    padding-bottom: 10rem;

    .ant-empty-description {
      color: ${p => p.theme.colors.textColor2};
    }
  }
`;
