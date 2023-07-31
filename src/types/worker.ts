import { Dayjs } from 'dayjs';

export interface ContractData {
  company: string;
  date: string;
  period: [string, string];
}

export interface WorkerData {
  id: string;
  name: string;
  age: number;
  phone: string;
  genderCode: number;
  residence: string;
  contract?: ContractData;
}

export interface CommuteData {
  id: string;
  workerId: string;
  workingDay: string;
  startTimeStamp: number;
  endTimeStamp: number;
}
