import { randomUUID } from "crypto";
import { School } from "./enums/School";

export class Activity {
  readonly id?: string;
  school!: School;
  activityName!: string;
  grade!: number;

  constructor(props: Omit<Activity, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    }
  }
}
