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

  .explanation-text {
    height: 2rem;
    color: ${p => p.theme.colors.textColor3};
    font-size: ${p => p.theme.sizes.textSmall};
  }
`;
