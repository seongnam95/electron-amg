import clsx from 'clsx';

import { ButtonStyled, ButtonStyledProps } from './styled';

const Button = ({ children, className, $variations = 'fill', ...rest }: ButtonStyledProps) => {
  return (
    <ButtonStyled className={clsx('Button', className)} $variations={$variations} {...rest}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
