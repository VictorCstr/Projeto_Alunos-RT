import { randomUUID } from "crypto";
import { School } from "./enums/School";
import { Activity } from "./Activity";

export class Student {
  id!: string;
  name!: string;
  school!: School;
  totalSum?: number = 0;
  activity?: Activity;

  constructor(props: Student) {
    Object.assign(this, props);
  }
}
