import { randomUUID } from "crypto";
import { School } from "./enums/School";
import { Activity } from "./Activity";

export class Student {
  readonly id: string;
  school: School;
  activity: Activity;

  constructor(props: Omit<Student, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    }
  }
}
