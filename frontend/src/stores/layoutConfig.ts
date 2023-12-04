import { atom } from 'recoil';

interface LayoutConfig {
  sideBarMode: 'default' | 'mini';
}

const initLayout: LayoutConfig = {
  sideBarMode: 'default',
};

export const layoutStore = atom<LayoutConfig>({
  key: 'layoutStore',
  default: initLayout,
});
