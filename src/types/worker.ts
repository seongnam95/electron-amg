export interface ContractData {
  company: string;
  date: string;
  period: [string, string];
}

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

export interface CommuteData {
  id: string;
  workerId: string;
  workingDay: string;
  startTimeStamp: number;
  endTimeStamp: number;
}
