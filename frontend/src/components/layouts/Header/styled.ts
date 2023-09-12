import styled from 'styled-components';

export const HeaderStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  height: ${p => p.theme.sizes.navBarHeight};
  width: 100%;

  border-bottom: 1px solid ${p => p.theme.colors.borderColor};

  > .breadcrumb {
    font-weight: bold;
    font-size: ${p => p.theme.sizes.textMedium};
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.textColor1};

    i {
      font-size: ${p => p.theme.sizes.textMedium};
      margin-right: 1rem;
      color: ${props => props.theme.colors.textColor2};
    }

    > span {
      margin-bottom: -1px;

      > span {
        & + span::before {
          content: '/';
          display: inline-block;
          margin: 0 0.6rem;
          font-weight: bold;
          color: ${props => props.theme.colors.textColor2};
        }
      }
    }
  }
`;
