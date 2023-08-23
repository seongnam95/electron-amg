import { ButtonHTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

import { ButtonStyled, ButtonStyledProps } from './styled';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styled?: ButtonStyledProps;
}

const Button = ({ className, children, styled, ...rest }: ButtonProps) => {
  return (
    <ButtonStyled
      className={clsx('Button', className)}
      variations={styled?.variations ?? 'fill'}
      animate={styled?.animate ?? false}
      {...styled}
      {...rest}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;
