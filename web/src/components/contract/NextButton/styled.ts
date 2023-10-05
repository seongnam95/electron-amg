import styled from "styled-components";

export const NextButtonStyled = styled.button`
  width: 100%;

  border: none;
  outline: none;

  border-radius: 0.6rem;
  color: ${(p) => p.theme.colors.textColorWhite1};
  font-weight: bold;
  font-size: ${(p) => p.theme.sizes.textLazy};
  height: 6rem;
  background-color: ${(p) => p.theme.colors.primary};
`;
