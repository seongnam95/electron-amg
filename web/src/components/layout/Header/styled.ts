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
        color: var(--text);
        font-size: var(--font-size-2xl);
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
          fill: var(--text) !important;
        }
      }
    }

    .description-content {
      color: var(--text-sub);
      font-size: var(--font-size-xs);
      line-height: 150%;
    }
  }
`;
