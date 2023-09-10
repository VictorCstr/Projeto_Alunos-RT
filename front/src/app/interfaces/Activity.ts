import { School } from './enums/School';

export interface Activity {
  readonly id: string;
  school: School;
  name: string;
  grade: number;
}
