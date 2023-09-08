/** 워커 데이터 인터페이스 */
export interface WorkerData {
  id: string;
  name: string;
  phone: string;
  residence: string;
  genderCode: number;
  positionCode: number;
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
