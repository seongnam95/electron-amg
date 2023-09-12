import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
  fixed?: boolean;
  fullWidth?: boolean;
}

export function Button(props: ButtonProps) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
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

  width: ${(p) => (p.fullWidth ? "100vw" : "auto")};
  height: 6.8rem;
  padding: 0 3.4rem;
  background-color: ${(p) => (p.secondary ? "white" : "var(--primary)")};

  border-top: 1px solid var(--border-accent-color);
  font-size: var(--font-size-2xl);
  color: ${(p) => (p.secondary ? "var(--text)" : "white")};

  transition: all var(--ease-in-out-1);

  &:disabled {
    color: var(--text-hint);
    background-color: var(--disable-color);
  }

  &:not(:disabled):active {
    background-color: ${(p) => (p.secondary ? "white" : "var(--text)")};
  }
`;
