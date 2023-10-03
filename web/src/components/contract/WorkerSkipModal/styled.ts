import styled from "styled-components";

export const WorkerSkipModalStyled = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 9999;

  .mask-wrap {
    width: 100vw;
    height: 100vh;
    background-color: rgba(50, 50, 50, 0.4);
  }

  .modal-wrap {
    position: fixed;
    background-color: white;
    padding: 3.4rem 3rem 1.4rem;
    border-radius: 1rem;
    color: var(--text);
    font-size: var(--font-size-m);

    .modal-header-text {
      font-size: var(--font-size-2xl);
      font-weight: bold;
      margin-bottom: 0.7rem;
    }

    .modal-header-sub-text {
      color: var(--text-hint);
      font-size: var(--font-size-xs);
      font-weight: 300;
      padding-left: 0.2rem;
      margin-bottom: 3.4rem;
    }

    li {
      display: flex;
      align-items: center;
      padding: 0 0.4rem;
      height: 3.4rem;

      > span:first-child {
        color: var(--text-sub);
        width: 30%;
      }

      .bank-name {
        font-size: var(--font-size-xs);
        color: var(--text-sub);
        padding: 0.4rem 0.8rem;
        background-color: var(--inner-color);
        border-radius: 0.2rem;
        margin-right: 0.8rem;
      }
    }
  }

  .btn-wrap {
    margin-top: 4rem;

    .card-btn {
      display: flex;
      flex-direction: column;
      gap: 2rem;

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

  .img-wrap {
    display: flex;
    gap: 0.4rem;
    height: 10rem;
    margin-bottom: 1.8rem;

    .img-box {
      border-radius: 6px;
      width: 100%;
      object-fit: cover;
    }
  }
`;
