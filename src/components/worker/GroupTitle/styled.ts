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
      gap: 1.6rem;
      align-items: center;

      font-weight: bold;
      font-size: 2.2rem;
    }
  }

  .info-wrap {
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 2.2rem;

    .manager-text {
      font-weight: bold;
      color: ${p => p.theme.colors.textColor2};
      font-size: ${p => p.theme.sizes.textSmall};
      background-color: ${p => p.theme.colors.innerBg};
      padding: 0.2rem 0.8rem 0;
      height: 100%;
    }

    .explanation-text {
      font-size: ${p => p.theme.sizes.textSmall};
      color: ${p => p.theme.colors.textColor3};
      padding-top: 1px;
    }
  }
`;
