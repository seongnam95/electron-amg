import styled from "styled-components";

export const ArticleViewStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  .check-wrap {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    margin-bottom: 2rem;
  }

  .btn-wrap {
    display: flex;
    width: 100%;
    margin-top: 3rem;

    > button {
      flex: 1;
    }
  }

  .info-wrap {
    display: flex;
    gap: 2.4rem;
    padding: 2.4rem 1rem;
    border-top: 1px solid ${(p) => p.theme.colors.borderColor};
    border-bottom: 1px solid ${(p) => p.theme.colors.borderColor};
    width: 100%;

    .info-label {
      display: flex;
      flex-direction: column;
      gap: 1.4rem;

      color: ${(p) => p.theme.colors.textColor1};
      font-size: ${(p) => p.theme.sizes.textMedium};
      font-weight: bold;
    }

    .info-text {
      display: flex;
      flex-direction: column;
      gap: 1.4rem;

      color: ${(p) => p.theme.colors.textColor1};
      font-size: ${(p) => p.theme.sizes.textMedium};
    }
  }
`;
