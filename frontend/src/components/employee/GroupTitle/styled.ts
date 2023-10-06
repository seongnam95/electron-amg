import styled from 'styled-components';

export const GroupTitleStyled = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 2rem 1rem 1rem 2rem;

  > .title-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1.4rem;

    .header-text {
      display: flex;
      align-items: center;

      font-weight: bold;
      font-size: 2.2rem;
    }

    .manager-text {
      font-weight: bold;
      color: ${p => p.theme.colors.textColor2};
      font-size: ${p => p.theme.sizes.textSmall};
      background-color: ${p => p.theme.colors.innerBg};
      padding: 0.2rem 0.8rem 0;
    }
  }
`;
