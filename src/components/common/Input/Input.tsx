import { InputHTMLAttributes } from 'react';

import clsx from 'clsx';

import { InputStyled } from './styled';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

const Input = ({ className, icon, ...rest }: InputProps) => {
  return (
    <InputStyled className={clsx('Input', className)}>
      {icon && <i className={clsx('bx', icon)} />}
      <input {...rest} />
    </InputStyled>
  );
};

export default Input;
