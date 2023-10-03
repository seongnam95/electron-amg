import styled from "styled-components";

export const ConsentCheckStyled = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;

  input {
    display: none;

    &:checked + .check-box-wrap > .check-box {
      background-color: var(--primary);
    }
  }

  .btn-text {
    color: var(--text);
    font-size: var(--font-size-m);
    padding-top: 4px;
  }

  .check-box-wrap {
    display: flex;
    align-items: center;
    gap: 1.4rem;

    .check-box {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 2rem;
      height: 2rem;

      border: 1px solid var(--border-color);
      border-radius: 4px;
      padding: 2px;

      transition: all 80ms;

      svg {
        height: 1.4rem;
        fill: white !important;
      }
    }
  }

  .more-btn {
    border: none;
    outline: none;
    background-color: transparent;

    > .icon {
      transform: rotate(-90deg);
    }
  }
`;
