import styled from 'styled-components';

export const GroupTitleStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem 2rem 2rem;
  border-bottom: 1px solid ${p => p.theme.colors.borderColor};

  > .title-row {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header-text {
      display: flex;
      align-items: center;

      font-weight: bold;
      font-size: 2.2rem;
    }

    .manager-name-text {
      margin-left: 2rem;
      background-color: ${p => p.theme.colors.innerBg};
      padding: 0.2rem 0.8rem;
      color: ${p => p.theme.colors.textColor2};
      font-size: ${p => p.theme.sizes.textSmall};
      font-weight: normal;
    }
  }

  .explanation-text {
    height: 2rem;
    color: ${p => p.theme.colors.textColor3};
    font-size: ${p => p.theme.sizes.textSmall};
  }
`;
