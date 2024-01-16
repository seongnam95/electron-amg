import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

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

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'teamPersist',
  storage: sessionStorage,
});

export const teamStore = atom<TeamData>({
  key: 'teamState',
  default: initTeamValue,
  effects_UNSTABLE: [persistAtom],
});
