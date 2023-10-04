import styled from "styled-components";

export const CompletePageStyled = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
  overflow: hidden;

  .complete-card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    width: 80%;
    justify-content: center;
    align-items: center;

    background-color: ${(p) => p.theme.colors.innerBg};
    border: 1px solid ${(p) => p.theme.colors.borderColor};

    padding: 3rem;
    border-radius: 0.8rem;
    box-shadow: var(--shadow-gray-100);

    .card-text-wrap {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      align-items: center;

      .card-title {
        flex: 1;
        font-size: ${(p) => p.theme.sizes.textLazy};
        font-weight: bold;
        color: ${(p) => p.theme.colors.textColor1};
      }

      .card-text {
        text-align: center;
        font-size: ${(p) => p.theme.sizes.textMedium};
        color: ${(p) => p.theme.colors.textColor2};
        line-height: 1.6rem;
      }
    }

    .complete-icon {
      width: 8.2rem;
      margin-bottom: 1rem;
    }
  }

  .info-wrap {
    display: flex;
    gap: 2.4rem;
    padding: 1.4rem 1rem;
    border-top: 1px solid ${(p) => p.theme.colors.borderColor};
    border-bottom: 1px solid ${(p) => p.theme.colors.borderColor};
    width: 100%;

    .info-label {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;

      color: ${(p) => p.theme.colors.textColor1};
      font-size: ${(p) => p.theme.sizes.textSmall};
      font-weight: bold;
    }

    .info-text {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;

      color: ${(p) => p.theme.colors.textColor1};
      font-size: ${(p) => p.theme.sizes.textSmall};
    }
  }

  .save-document-btn {
    border: none;
    outline: none;

    font-size: ${(p) => p.theme.sizes.textLazy};
    color: white;

    width: 100%;
    background-color: ${(p) => p.theme.colors.primary};
    padding: 1.6rem 0 1.4rem;
    border-radius: 50rem;
    box-shadow: var(--shadow-gray-100);
  }

  .document-view {
    position: absolute;
    bottom: 150%;
  }
`;
