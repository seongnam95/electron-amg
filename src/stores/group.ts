import { atom, selector, selectorFamily } from 'recoil';

import { fetchGroups } from '~/api/groupApi';
import { GroupData } from '~/types/group';

export const groupStore = atom<GroupData[]>({
  key: 'groupState',
  default: [],
});

export const groupQuery = selector<GroupData[]>({
  key: 'groupQuery',
  get: async () => {
    const response = await fetchGroups();
    if (response.success) return response.result;
    else return [];
  },
});
