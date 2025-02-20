import styled from "styled-components";

export const InputStyled = styled.label<{ doseExist: boolean }>`
  flex: 1;

  .input-wrap {
    position: relative;

    input {
      background: none;

      width: 100%;

      color: ${(p) => p.theme.colors.textColor1};
      font-size: ${(p) => p.theme.sizes.textLarge};

      outline: none;
      border: none;
      border-bottom: solid 1px ${(p) => p.theme.colors.borderColor};
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

      color: ${(p) =>
        p.doseExist ? p.theme.colors.textColor2 : p.theme.colors.textColor3};
      font-size: ${(p) =>
        p.doseExist ? p.theme.sizes.textSmall : p.theme.sizes.textLarge};
      transition: all 0.2s;
    }
  }

  .placeholder-space {
    height: 2.8rem;
  }

  .hint-text {
    color: ${(p) => p.theme.colors.textColor3};
    font-size: ${(p) => p.theme.sizes.textSmall};
    margin: 1.2rem 0 0 0.6rem;
  }
`;
