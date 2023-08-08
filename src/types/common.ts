import { WorkerData } from './worker';

export interface ApiResponse {
  success: boolean;
  count: number;
  result: WorkerData[];
}
