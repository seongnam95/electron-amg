import { ButtonHTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

import { ButtonStyled, ButtonStyledProps } from './styled';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styled?: ButtonStyledProps;
}

const Button = ({ className, children, styled }: ButtonProps) => {
  return (
    <ButtonStyled
      className={clsx('Button', className)}
      variations={styled?.variations ?? 'primary'}
      {...styled}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;
