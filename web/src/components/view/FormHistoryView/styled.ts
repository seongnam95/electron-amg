import styled from "styled-components";

export const FormHistoryViewStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.4rem;

  font-size: ${(p) => p.theme.sizes.textMedium};
  color: ${(p) => p.theme.colors.textColor1};

  .draft-item {
    cursor: pointer;

    section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 0.4rem;
      margin-top: 1.2rem;
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .group-name-text {
      font-weight: bold;
      font-size: ${(p) => p.theme.sizes.textLazy};
    }

    .id-chip {
      color: ${(p) => p.theme.colors.textColor2};
      border-radius: 4px;
      padding: 0.4rem 0.8rem;
      background-color: ${(p) => p.theme.colors.innerBg};
    }

    .wage {
      font-weight: bold;
      color: ${(p) => p.theme.colors.accent};
    }
  }
`;
