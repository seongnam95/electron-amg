import styled from "styled-components";

export const ButtonStyled = styled.button<{
  secondary?: boolean;
  fixed?: boolean;
  fullWidth?: boolean;
}>`
  position: ${(p) => (p.fixed ? "fixed" : "")};
  bottom: ${(p) => (p.fixed ? "0" : "")};
  left: ${(p) => (p.fixed ? "0" : "")};

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  outline: none;

  width: 100%;
  height: 6.8rem;
  min-height: 6.8rem;

  padding-top: 0.4rem;
  background-color: ${(p) => p.theme.colors.primary};
  border-radius: 0.6rem;

  font-size: ${(p) => p.theme.sizes.textLarge};
  color: white;

  transition: all 0.1s ease-in-out;

  &:disabled {
    color: ${(p) => p.theme.colors.textColor3};
    background-color: ${(p) => p.theme.colors.disableBg};
  }

  &:not(:disabled):active {
    background-color: ${(p) => p.theme.colors.textColor1};
  }
`;
