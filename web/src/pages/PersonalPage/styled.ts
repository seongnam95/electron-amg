import styled from "styled-components";

export const PersonalPageStyled = styled.div`
  padding: 3.4rem 2rem 11.8rem;
  height: 100%;

  .btn-wrap {
    margin-bottom: 4rem;

    .card-btn {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin-bottom: 1.4rem;

      justify-content: center;
      align-items: center;
      width: 100%;

      outline: none;
      padding: 2rem;

      border: none;
      border-radius: 8px;

      background-color: #333333;

      .worker-info {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;

        color: rgb(255, 255, 255, 0.8);
        font-size: var(--font-size-s);

        .text-name {
          font-weight: bold;

          .text-phone {
            font-weight: normal;
          }
        }
      }

      .btn-label {
        color: white;
        font-weight: bold;
        font-size: var(--font-size-l);
      }

      &.outline {
        border: 1px solid #333333;
        background-color: transparent;

        .btn-label {
          color: var(--text);
        }
      }
    }
  }

  .worker-wrap {
    display: flex;
    margin-bottom: 3rem;

    user-select: none;

    .info-wrap {
      flex: 1;

      display: flex;
      flex-direction: column;

      .text-name {
        font-weight: bold;
      }

      .text-phone {
        font-weight: normal;
        color: var(--text-sub);
      }
    }
  }

  .field-wrap {
    display: flex;
    gap: 2rem;
    flex-direction: column;
  }
`;
