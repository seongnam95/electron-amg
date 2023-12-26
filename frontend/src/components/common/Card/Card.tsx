import { ReactNode, forwardRef } from 'react';

import { Flex } from 'antd';
import clsx from 'clsx';
import { CSSObject } from 'styled-components';

import { CardStyled } from './styled';

export interface CardProps {
  className?: string;
  title?: ReactNode;
  children?: ReactNode;
  hint?: string;
  suffix?: ReactNode;
  extra?: ReactNode;
  style?: CSSObject;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, className, suffix, extra, children, ...props }, cardRef) => {
    return (
      <CardStyled ref={cardRef} className={clsx('Card', className)} {...props}>
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
