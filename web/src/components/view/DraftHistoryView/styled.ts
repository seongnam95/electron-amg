import styled from "styled-components";

export const DraftHistoryViewStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 0 0.6rem;

  width: 100%;
  height: 100%;

  font-size: ${(p) => p.theme.sizes.textMedium};
  color: ${(p) => p.theme.colors.textColor1};

  .draft-item {
    cursor: pointer;

    section {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      padding: 0.4rem;
      margin-top: 0.8rem;
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .group-name-text {
      font-weight: bold;
      font-size: ${(p) => p.theme.sizes.textLarge};
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

  .empty-view {
    position: absolute;
    left: 50%;
    top: 24%;
    transform: translateX(-50%);
  }
`;
