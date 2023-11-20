import { atom } from 'recoil';

import { TeamData } from '~/types/team';

const initTeam: TeamData = {
  id: '',
  name: '',
  mealCost: 0,
  color: '',
  createDate: '',
  positions: [],
};

export const teamStore = atom<TeamData>({
  key: 'teamState',
  default: initTeam,
});
