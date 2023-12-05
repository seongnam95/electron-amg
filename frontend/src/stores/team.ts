import { atom } from 'recoil';

import { TeamData } from '~/types/team';

interface SelectTeamData extends TeamData {
  existTeam: boolean;
}

const initTeam: SelectTeamData = {
  id: '',
  name: '',
  mealCost: 0,
  color: '',
  createDate: '',
  positions: [],
  existTeam: false,
  otPay: 15000,
};

export const teamStore = atom<SelectTeamData>({
  key: 'teamState',
  default: initTeam,
});
