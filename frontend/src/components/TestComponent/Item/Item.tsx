import { ReactNode } from 'react';

import clsx from 'clsx';

import { ItemStyled } from './styled';

export interface ItemProps {
  className?: string;
  children?: ReactNode;
}

const Item = ({ className, children }: ItemProps) => {
  return (
    <ItemStyled className={clsx('Item', className)}>
      {children}
    </ItemStyled>
  );
};

export default Item;
