import { ReactNode } from 'react';

import { atom } from 'recoil';

export interface MenuItemData {
  key: string;
  text: string;
  path: string;
  icon?: JSX.Element | ReactNode;
}

const initBreadcrumb: MenuItemData = {
  key: '',
  path: '/',
  icon: '',
  text: '대시보드',
};

export const breadcrumbStore = atom<MenuItemData[]>({
  key: 'breadcrumbState',
  default: [initBreadcrumb],
});
