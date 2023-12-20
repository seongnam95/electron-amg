import { ReactNode } from 'react';

import { atom } from 'recoil';

export interface BreadcrumbData {
  key: string;
  path: string;
  menu?: boolean;
  text?: string;
  icon?: JSX.Element | ReactNode;
}

export const breadcrumbStore = atom<BreadcrumbData[]>({
  key: 'breadcrumbState',
  default: [],
});
