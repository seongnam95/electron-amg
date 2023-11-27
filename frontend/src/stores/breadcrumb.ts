import { ReactNode } from 'react';

import { atom } from 'recoil';

export interface BreadcrumbData {
  key: string;
  text: string;
  path: string;
  icon?: JSX.Element | ReactNode;
}

const initBreadcrumb: BreadcrumbData = {
  key: '',
  path: '/',
  icon: '',
  text: '대시보드',
};

export const breadcrumbStore = atom<BreadcrumbData[]>({
  key: 'breadcrumbState',
  default: [initBreadcrumb],
});
