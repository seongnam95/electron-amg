import styled from "styled-components";

export const ContractClauseView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.4rem;

  font-size: ${(p) => p.theme.sizes.textSmall};
  font-weight: 500;
  color: ${(p) => p.theme.colors.textColor1};
  line-height: 160%;
  letter-spacing: 0.8px;

  background-color: white;

  .text-accent {
    color: ${(p) => p.theme.colors.accent};
    font-weight: bold;
  }

  .text-underline {
    text-decoration: underline;
  }

  .article-content {
    display: flex;
    flex-direction: column;
    gap: 2.8rem;

    .text-block {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;

      .text-title {
        font-size: ${(p) => p.theme.sizes.textLarge};
        font-weight: bold;
        margin-bottom: 0.4rem;
      }

      .text-list {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        padding-left: 0.6rem;

        .list-item {
          display: flex;

          > span {
            font-weight: bold;
            margin-right: 0.6rem;
          }
        }
      }
    }
  }

  .contract-date {
    text-align: center;
    margin: 2rem 0 2rem;
  }
`;

export const ContractClausePrintView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.6rem;

  font-size: ${(p) => p.theme.sizes.textSmall};
  color: black;
  line-height: 110%;
  letter-spacing: 0.8px;

  .text-accent {
    font-weight: bold;
  }

  .text-underline {
    text-decoration: underline;
  }

  .article-content {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    .text-title {
      font-weight: 900;
      margin-bottom: 0.4rem;
    }

    .text-list {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      padding: 0.4rem 0 0 1rem;

      .list-item {
        display: flex;

        > span {
          font-weight: bold;
          margin-right: 0.6rem;
        }
      }
    }
  }

  .contract-date {
    text-align: center;
    margin: 2rem 0 2rem;
  }
`;
