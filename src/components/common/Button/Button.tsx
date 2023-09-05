import clsx from 'clsx';

import { ButtonStyled, ButtonStyledProps } from './styled';

const Button = ({ children, variations = 'fill', ...rest }: ButtonStyledProps) => {
  return (
    <ButtonStyled
      className={clsx('Button', `${variations}-style`)}
      variations={variations}
      {...rest}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;
