import { ReactNode } from 'react';

import { Flex, Input } from 'antd';
import clsx from 'clsx';

import { CardStyled, CardStyledProps } from './styled';

export interface CardProps extends CardStyledProps {
  className?: string;
  title?: string;
  children?: ReactNode;
  hint?: string;
  suffix?: ReactNode;
  extra?: ReactNode;
}

const Card = ({
  title,
  className,
  suffix,
  extra,
  width,
  height,
  maxHeight,
  maxWidth,
  children,
}: CardProps) => {
  const style = { width, maxWidth, height, maxHeight };
  return (
    <CardStyled className={clsx('Card', className)} style={style}>
      <Flex className="card-header" align="center" justify={extra ? 'space-between' : 'left'}>
        <Flex gap={12}>
          <span className="card-title">{title}</span>
          {suffix}
        </Flex>
        {extra}
      </Flex>
      <div className="card-content">{children}</div>
    </CardStyled>
  );
};

export default Card;
