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
      background-color: ${(p) => p.theme.colors.primary};
    }
  }

  .btn-text {
    color: ${(p) => p.theme.colors.textColor1};
    font-size: ${(p) => p.theme.sizes.textSmall};
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

      border: 1px solid ${(p) => p.theme.colors.borderColor};
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

    .down-arrow-icon {
      padding-top: 2px;
      font-size: 1.4rem;
      color: ${(p) => p.theme.colors.textColor2};
    }
  }
`;
