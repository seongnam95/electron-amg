import styled from 'styled-components';

export const PayStatsStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .description-wrap {
    flex: 1;
    flex-direction: column;
    gap: 0.2rem;
    align-items: center;
    white-space: nowrap;
    border-radius: 0.8rem;
    padding: 1rem 0;
    background-color: ${p => p.theme.colors.innerBg};

    .description-title {
      color: ${p => p.theme.colors.textColor2};
      font-size: ${p => p.theme.sizes.textMedium};
    }

    .description-label {
      color: ${p => p.theme.colors.textColor1};
      font-size: ${p => p.theme.sizes.textLarge};
      font-weight: bold;
    }
  }
`;
