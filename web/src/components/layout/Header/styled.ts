import styled from "styled-components";

export const HeaderStyled = styled.div<{ height?: string }>`
  padding: 0 2rem;

  .title-wrap {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    height: ${(p) => (p.height ? p.height : "9rem")};

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title-text {
        color: ${(p) => p.theme.colors.textColor1};
        font-size: 2.4rem;
        font-weight: bold;
      }

      .action-btn {
        height: 4rem;
        width: 4rem;
        border: none;
        outline: none;
        background-color: transparent;
        border-radius: 50%;
        transition: all 200ms;

        > svg {
          font-size: 2.4rem;
          color: ${(p) => p.theme.colors.textColor1};
        }
      }
    }

    .description-content {
      color: ${(p) => p.theme.colors.textColor2};
      font-size: ${(p) => p.theme.sizes.textSmall};
      line-height: 150%;
    }
  }
`;
