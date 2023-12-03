import { ReactNode } from 'react';

import clsx from 'clsx';

import { DescriptionsBoxStyled, DescriptionsBoxStyledProps } from './styled';

export interface DescriptionsBoxProps extends DescriptionsBoxStyledProps {
  title?: string;
  children?: ReactNode;
  className?: string;
}

const DescriptionsBox = ({ className, title, children, ...props }: DescriptionsBoxProps) => {
  return (
    <DescriptionsBoxStyled className={clsx('DescriptionsBox', className)} {...props}>
      <p className="description-title">{title}</p>
      <div className="description-content">{children}</div>
    </DescriptionsBoxStyled>
  );
};

export default DescriptionsBox;
