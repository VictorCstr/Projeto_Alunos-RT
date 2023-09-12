import { randomUUID } from "crypto";

export class Teacher {
  readonly id!: string;
  name!: string;
  password!: string;
  email!: string;

  constructor(props: Omit<Teacher, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    }
  }
}
