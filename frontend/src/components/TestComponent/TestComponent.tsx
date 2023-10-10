import { ReactNode } from 'react';

import clsx from 'clsx';

import { TestComponentStyled } from './styled';

export interface TestComponentProps {
  className?: string;
  children?: ReactNode;
}

const TestComponent = ({ className, children }: TestComponentProps) => {
  return (
    <TestComponentStyled className={clsx('TestComponent', className)}>
      {children}
    </TestComponentStyled>
  );
};

export default TestComponent;
