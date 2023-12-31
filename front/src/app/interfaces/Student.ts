import { Activity } from './Activity';
import { School } from './enums/School';

export interface Student {
  id: string;
  name: string;
  school: School;
  totalSum: number;
  activity?: Activity;
}
