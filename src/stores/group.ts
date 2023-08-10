import { atom } from 'recoil';

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

// const filteredWorkerState = selectorFamily<GroupData[], string>({
//   key: 'filteredWorkerState',
//   get:
//     groupId =>
//     ({ get }) => {
//       const workers = get(workerState);

//       switch (groupId) {
//         case 'all':
//           return workers;
//         case 'etc':
//           return workers.filter(worker => worker.groupId === null);
//         default:
//           return workers.filter(worker => worker.groupId === parseInt(groupId));
//       }
//     },
// });

export { groupState };
