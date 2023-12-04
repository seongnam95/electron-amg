import { ReactNode, forwardRef } from 'react';

import { Flex } from 'antd';
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

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, className, suffix, extra, width, height, maxHeight, maxWidth, children }, cardRef) => {
    const style = { width, maxWidth, height, maxHeight };

    return (
      <CardStyled ref={cardRef} className={clsx('Card', className)} style={style}>
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
  },
);

export default Card;
