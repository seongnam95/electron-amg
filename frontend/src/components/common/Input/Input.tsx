import { InputHTMLAttributes, ReactNode, RefObject } from 'react';

import clsx from 'clsx';

import { InputStyled, InputStyledProps } from './styled';

export interface InputProps extends InputStyledProps {
  icon?: ReactNode;
  inputRef?: RefObject<HTMLInputElement>;
}

const Input = ({ className, icon, inputRef, ...rest }: InputProps) => {
  const { width, fullWidth, variations = 'fill' } = rest;
  const styled = { width, fullWidth, variations };

  return (
    <InputStyled className={clsx('Input', className)} {...styled}>
      {icon && icon}
      <input ref={inputRef} {...rest} />
    </InputStyled>
  );
};

export default Input;
