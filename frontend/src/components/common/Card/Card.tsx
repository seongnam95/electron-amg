import { ReactNode } from 'react';

import { Flex } from 'antd';
import clsx from 'clsx';

import { CardStyled } from './styled';

export interface CardProps {
  icon?: ReactNode;
  title?: string;
  className?: string;
  extra?: ReactNode;
  width?: string | number;
  height?: string | number;
  maxHeight?: string | number;
  maxWidth?: string | number;
  children?: ReactNode;
}

const Card = ({
  icon,
  title,
  className,
  extra,
  width,
  height,
  maxHeight,
  maxWidth,
  children,
}: CardProps) => {
  return (
    <CardStyled className={clsx('Card', className)} style={{ width, maxWidth, height, maxHeight }}>
      <Flex gap={20} align="center" justify={extra ? 'space-between' : 'left'}>
        <Flex gap={8}>
          <span className="card-icon">{icon}</span>
          <span className="card-title">{title}</span>
        </Flex>
        {extra}
      </Flex>
      <div className="card-content">{children}</div>
    </CardStyled>
  );
};

export default Card;
