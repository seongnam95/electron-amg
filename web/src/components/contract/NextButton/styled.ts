import styled from "styled-components";

export const NextButtonStyled = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  border: none;
  outline: none;

  color: ${(p) => p.theme.colors.textColorWhite1};
  font-weight: bold;
  font-size: ${(p) => p.theme.sizes.textLazy};
  height: 6rem;
  background-color: ${(p) => p.theme.colors.primary};
`;
