import { ReactNode } from 'react';

import clsx from 'clsx';

import { AffixStyled } from './styled';

export interface AffixProps {
  className?: string;
  children?: ReactNode;
}

const Affix = ({ className, children }: AffixProps) => {
  return (
    <AffixStyled className={clsx('Affix', className)}>
      {children}
    </AffixStyled>
  );
};

export default Affix;
