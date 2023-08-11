import { atom, selectorFamily } from 'recoil';

import { fetchGroups } from '~/api/groupApi';
import { GroupData } from '~/types/group';

const mapGroupDataFromResponse = (group: any): GroupData => ({
  id: group.id.toString(),
  name: group.name,
  explanation: group.explanation,
  hexColor: group.hex_color,
  wage: group.wage,
  createDate: group.create_date,
});

const groupState = atom<GroupData[]>({
  key: 'groupState',
  default: [],
  effects_UNSTABLE: [
    ({ setSelf }) => {
      fetchGroups().then(response => {
        if (response.success) {
          const groups = response.result.map(mapGroupDataFromResponse);
          setSelf(groups);
        }
      });
    },
  ],
});

const filteredGroupState = selectorFamily<GroupData, string>({
  key: 'filteredWorkerState',
  get:
    groupId =>
    ({ get }) => {
      const groups = get(groupState);
      return groups.filter(group => group.id === groupId)[0];
    },
});

export { groupState, filteredGroupState };
