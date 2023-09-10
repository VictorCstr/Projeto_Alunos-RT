import { randomUUID } from "crypto";
import { School } from "./enums/School";
import { Activity } from "./Activity";

export class Student {
  readonly id!: string;
  name!: string;
  school!: School;
  activity?: Activity;

  constructor(props: Student) {
    Object.assign(this, props);
  }
}
