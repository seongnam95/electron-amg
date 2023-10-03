import { ButtonHTMLAttributes } from "react";
import { ButtonStyled } from "./styled";

function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <ButtonStyled {...props}>{children}</ButtonStyled>;
}

export default Button;
