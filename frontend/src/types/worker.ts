export const POSITION_CODE = {
  1: '팀장',
  2: '부팀장',
  3: '알바',
  4: '기사',
  5: '홍보단',
  6: '기타',
} as const;

export const GENDER_CODE = {
  1: '남자',
  2: '여자',
} as const;

export type PositionType = keyof typeof POSITION_CODE;
export type GenderType = keyof typeof GENDER_CODE;

/** 워커 데이터 인터페이스 */
export interface WorkerData {
  id: string;
  name: string;
  phone: string;
  residence: string;
  genderCode: GenderType;
  positionCode: PositionType;
  createDate: string;
  groupId?: string;
}

/** 워커 생성 API 바디 */
export type WorkerCreateBody = Pick<
  WorkerData,
  'name' | 'genderCode' | 'phone' | 'residence' | 'positionCode' | 'groupId'
>;

/** 워커 업데이트 API 바디 */
export type WorkerUpdateBody = Partial<Omit<WorkerCreateBody, 'genderCode'>>;

/** 워커 그룹 이동 API 바디 */
export type WorkerMoveGroupBody = {
  groupId?: string;
  workerIds: string[];
};
