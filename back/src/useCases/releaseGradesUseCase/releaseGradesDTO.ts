import { Activity } from "../../entities/Activity";
import { School } from "../../entities/enums/School";

export interface IReleaseGradesDTO {
  id: string;
  name: string;
  school: School;
  activity: Activity;
}
