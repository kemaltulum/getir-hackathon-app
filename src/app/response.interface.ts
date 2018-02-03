import { Record } from './record.interface';
export interface Response {
  code: number;
  msg: string;
  records: Array<Record>;
}
