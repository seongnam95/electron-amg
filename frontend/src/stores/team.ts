import { atom } from 'recoil';

import { TeamData } from '~/types/team';

export const initTeamValue: TeamData = {
  id: '',
  name: '',
  mealCost: 0,
  color: '',
  createDate: '',
  otPay: 0,
  positions: [],
  units: [],
  existTeam: false,
};

export const teamStore = atom<TeamData>({
  key: 'teamState',
  default: initTeamValue,
});
