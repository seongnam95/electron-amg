import styled from "styled-components";

export const CompleteStyled = styled.div`
  position: relative;

  width: 100vw;
  height: 100%;
  background-color: var(--inner-color);

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

    background-color: white;
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
        font-size: var(--font-size-2xl);
        font-weight: bold;
        color: var(--text);
      }

      .card-text {
        text-align: center;
        font-size: var(--font-size-m);
        color: var(--text-sub);
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
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    width: 100%;

    .info-label {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;

      color: var(--text);
      font-size: var(--font-size-xs);
      font-weight: bold;
    }

    .info-text {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;

      color: var(--text);
      font-size: var(--font-size-xs);
    }
  }

  .save-document-btn {
    border: none;
    outline: none;

    font-size: var(--font-size-l);
    color: white;

    width: 100%;
    background-color: var(--primary);
    padding: 1.6rem 0 1.4rem;
    border-radius: 50rem;
    box-shadow: var(--shadow-gray-100);
  }

  .document-page {
    position: absolute;
    bottom: 100%;
  }
`;
