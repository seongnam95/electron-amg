import { ReactNode } from 'react';

import { Flex } from 'antd';
import clsx from 'clsx';

import { CardStyled } from './styled';

export interface CardProps {
  title?: string;
  className?: string;
  extra?: ReactNode;
  width?: string | number;
  children?: ReactNode;
}

const Card = ({ title, className, extra, width, children }: CardProps) => {
  return (
    <CardStyled className={clsx('Card', className)} style={{ width: width }}>
      <Flex gap={20} align="center" justify={extra ? 'space-between' : 'left'}>
        <p className="card-title">{title}</p>
        {extra}
      </Flex>

      <div className="card-content">{children}</div>
    </CardStyled>
  );
};

export default Card;
