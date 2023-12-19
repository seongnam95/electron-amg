import { ReactNode } from 'react';

import clsx from 'clsx';

import Info from '../Info';
import { DescriptionsBoxStyled, DescriptionsBoxStyledProps } from './styled';

export interface DescriptionsBoxProps extends DescriptionsBoxStyledProps {
  title?: string;
  info?: string;
  children?: ReactNode;
  className?: string;
}

const DescriptionsBox = ({ className, title, info, children, ...props }: DescriptionsBoxProps) => {
  return (
    <DescriptionsBoxStyled className={clsx('DescriptionsBox', className)} {...props}>
      <div className="description-title">{info ? <Info title={info}>{title}</Info> : title}</div>
      <div className="description-content">{children}</div>
    </DescriptionsBoxStyled>
  );
};

export default DescriptionsBox;
