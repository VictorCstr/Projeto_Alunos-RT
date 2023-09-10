import { School } from './enums/School';

export interface Activity {
  readonly id: string;
  school: School;
  activityName: string;
  grade: number;
}
