import { InputHTMLAttributes } from 'react';

import clsx from 'clsx';

import { InputStyled, InputStyledProps } from './styled';

export interface InputProps extends InputStyledProps, InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

const Input = ({ className, icon, ...rest }: InputProps) => {
  const { fullWidth, variations = 'fill' } = rest;
  const styled = { fullWidth, variations };

  return (
    <InputStyled className={clsx('Input', className)} {...styled}>
      {icon && <i className={clsx('bx', icon)} />}
      <input {...rest} />
    </InputStyled>
  );
};

export default Input;
