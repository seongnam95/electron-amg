import styled from "styled-components";

export const ContractorInfoTableStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  font-size: var(--font-size-s);
  color: var(--text);

  .stamp-img {
    position: absolute;
    width: 5rem;
    height: 5rem;
    left: 50%;
    right: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .sign-hint {
    text-align: right;
    padding-right: 0.8rem;
    font-size: var(--font-size-xs);
    color: var(--blue);
  }

  .contractor-wrap {
    background-color: white;
    padding: 1.4rem 0;

    &.second {
      cursor: pointer;
    }

    .field-title {
      display: flex;
      align-items: center;
      font-weight: bold;
      padding: 1rem 1.2rem;
      font-size: var(--font-size-l);
    }

    .field-list {
      flex: 1;

      .field-list-row {
        display: flex;
        align-items: center;

        & > span {
          width: 7.6rem;
          font-weight: bold;
          padding: 1rem 0.8rem 0.8rem 0.8rem;
        }

        & > p {
          display: flex;
          flex: 1;
          padding: 1rem 0.8rem 0.8rem 0.8rem;
          justify-content: space-between;

          > span {
            position: relative;
            color: var(--text-hint);
          }
        }
      }
    }
  }
`;

// styled
export const ContractorInfoTablePrintStyled = styled.div`
  display: flex;
  font-size: var(--font-size-2xs);

  @media print {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;

    .field-title {
      background-color: var(--canvas-color) !important;
    }
  }

  .stamp-img {
    position: absolute;
    width: 5rem;
    right: 1rem;
    top: -1.2rem;
  }

  .contractor-wrap {
    display: flex;
    border: 1px solid var(--text);
    width: 100%;

    :first-child {
      border-right: none;
    }

    .field-title {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      line-height: 150%;
      font-weight: bold;
      border-right: 1px solid var(--text);
      padding: 0.4rem 0.6rem 0 0.6rem;
      background-color: var(--canvas-color) !important;
    }

    .field-list {
      flex: 1;

      .field-list-row {
        display: flex;
        border-bottom: 1px solid var(--text);

        .address-text {
          font-size: var(--font-size-3xs);
        }

        &:last-child {
          border-bottom: none;
        }

        & > span {
          text-align: center;
          width: 6.4rem;
          font-weight: bold;
          border-right: 1px solid var(--text);
          padding: 0.5rem 0 0.3rem 0;
        }

        & > p {
          position: relative;
          display: flex;
          flex: 1;
          padding: 0.5rem 0.4rem 0.3rem 0.8rem;
          justify-content: space-between;

          > span {
            color: var(--text-hint);
            font-size: var(--font-size-3xs);
          }
        }
      }
    }
  }
`;
