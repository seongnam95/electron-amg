import styled from "styled-components";

export const SignatureStyled = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  padding: 3.4rem 2rem 0;
  height: 100%;

  .content-wrap {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    height: 100%;

    .header-text {
      font-size: var(--font-size-m);
      color: var(--text);
      line-height: 120%;
    }

    .signature-canvas {
      width: 100%;
      height: 60%;

      border: 1px solid var(--border-color);
      background-color: var(--inner-color);
      border-radius: 0.4rem;
    }
  }
`;
