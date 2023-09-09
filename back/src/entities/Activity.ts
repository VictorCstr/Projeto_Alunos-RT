import { randomUUID } from "crypto";

export class Activity {
  readonly id: string;
  name: string;
  grade: number;

  constructor(props: Omit<Activity, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    }
  }
}
