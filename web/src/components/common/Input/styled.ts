import styled from "styled-components";

export const InputStyled = styled.label<{ doseExist: boolean }>`
  flex: 1;

  .input-wrap {
    position: relative;

    input {
      background: none;

      width: 100%;

      color: var(--text);
      font-size: var(--font-size-2xl);

      outline: none;
      border: none;
      border-bottom: solid 1px var(--border-color);
      border-radius: 0;

      padding-bottom: 0.8rem;
      padding-left: 0.4rem;

      text-align: left;

      :focus ~ .border-bar {
        width: 100%;
      }
    }

    .border-bar {
      position: absolute;
      bottom: 0;
      left: 0;

      display: block;
      background-color: #333333;
      width: 0;
      height: 2px;

      border-radius: 2px;
      transition: 0.5s;
      z-index: 6;
    }

    .placeholder-text {
      z-index: -1;
      position: absolute;
      bottom: ${(p) => (p.doseExist ? "calc(100% + 1rem)" : "1rem")};
      left: 0.4rem;

      color: ${(p) => (p.doseExist ? "var(--text-sub)" : "var(--text-hint)")};
      font-size: ${(p) =>
        p.doseExist ? "var(--font-size-s)" : "var(--font-size-2xl)"};
      transition: all 0.2s;
    }
  }

  .placeholder-space {
    height: 2.8rem;
  }

  .hint-text {
    color: var(--text-hint);
    font-size: var(--font-size-2xs);
    margin: 1.2rem 0 0 0.6rem;
  }
`;
