import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

export function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

// styled
const StyledButton = styled.button<{
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
  background-color: var(--primary);
  border-radius: 0.6rem;

  font-size: var(--font-size-2xl);
  color: white;

  transition: all var(--ease-in-out-1);

  &:disabled {
    color: var(--text-hint);
    background-color: var(--disable-color);
  }

  &:not(:disabled):active {
    background-color: var(--text);
  }
`;
