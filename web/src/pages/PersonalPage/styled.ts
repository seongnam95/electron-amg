import styled from "styled-components";

export const PersonalPageStyled = styled.div`
  padding: 3.4rem 2rem 11.8rem;
  height: 100%;

  .btn-wrap {
    margin-top: 8rem;

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

      &.link {
        background-color: transparent;

        .btn-label {
          color: var(--text-sub);
          font-weight: normal;
          padding: 0 4px 4px 4px;
          border-bottom: 1px solid var(--text-hint);
        }
      }
    }
  }
`;
