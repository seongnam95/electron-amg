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
    color: ${(p) => p.theme.colors.textColor1};
    font-size: ${(p) => p.theme.sizes.textMedium};

    .modal-header-text {
      font-size: ${(p) => p.theme.sizes.textLazy};
      font-weight: bold;
      margin-bottom: 0.7rem;
    }

    .modal-header-sub-text {
      color: ${(p) => p.theme.colors.textColor3};
      font-size: ${(p) => p.theme.sizes.textSmall};
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
        color: ${(p) => p.theme.colors.textColor2};
        width: 30%;
      }

      .bank-name {
        font-size: ${(p) => p.theme.sizes.textSmall};
        color: ${(p) => p.theme.colors.textColor2};
        padding: 0.4rem 0.8rem;
        background-color: ${(p) => p.theme.colors.innerBg};
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
        font-size: ${(p) => p.theme.sizes.textSmall};

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
        font-size: ${(p) => p.theme.sizes.textLazy};
      }

      &.link {
        background-color: transparent;

        .btn-label {
          color: ${(p) => p.theme.colors.textColor2};
          font-weight: normal;
          padding: 0 4px 4px 4px;
          border-bottom: 1px solid ${(p) => p.theme.colors.borderColor};
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
