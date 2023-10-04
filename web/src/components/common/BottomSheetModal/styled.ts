import styled from "styled-components";

export const BottomSheetModalStyled = styled.div<{ height?: string }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  .mask-wrap {
    width: 100vw;
    height: calc(var(--vh, 1vh) * 100);
    background-color: rgba(50, 50, 50, 0.4);
  }

  .modal-wrap {
    position: absolute;
    bottom: 0;

    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;

    width: 100vw;
    height: ${(p) => (p.height ? p.height : "90%")};
    padding: 4rem 2rem;

    background-color: white;

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      color: ${(p) => p.theme.colors.textColor1};
      font-weight: bold;
      font-size: 22px;

      height: 2.5rem;
      margin-bottom: 4.2rem;

      .close-btn {
        border: none;
        outline: none;
        background-color: transparent;
        -webkit-tap-highlight-color: transparent;

        > svg {
          width: 1.8rem;
          color: ${(p) => p.theme.colors.textColor1};
        }
      }
    }

    .modal-content {
      height: calc(100% - 5.5rem);
      overflow-y: scroll;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;
