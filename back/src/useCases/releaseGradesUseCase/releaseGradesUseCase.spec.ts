import app from "../../app";
import supertest, { Response } from "supertest";
import { ApiError } from "../../errors";
import { ITeacherRepository } from "../../interfaces/ITeacherRepository";
import { FakeTeacherRepository } from "../../repositories/FakeTeacherRepository";
import { hashPassword } from "../../utils/encrypt";
import { ReleaseGradesUseCase } from "./releaseGradesUseCase";
import { School } from "../../entities/enums/School";
import { IGradeRepository } from "../../interfaces/IGradeRepository";
import { FakeGradesRepository } from "../../repositories/FakeGradesRepository";
import { signJwt } from "../../utils/signJwt";

describe("Criação de usuário do Professor, POST /teacher", () => {
  jest.setTimeout(10000);
  let fakeRepository: ITeacherRepository;
  let token: Promise<string>;
  let useCase: ReleaseGradesUseCase;
  let server;

  fakeRepository = new FakeTeacherRepository();

  beforeAll(() => {
    useCase = new ReleaseGradesUseCase(fakeRepository);
    token = signJwt({
      id: "1",
      name: "Victor",
      email: "victor@teste.com",
      password: "$2b$10$UXdibzMOCHkL/6xUvmahXeiJVNE8I7iXW3WaXeY3ZcngJ4ZHXMyw2",
    });
    server = supertest(app);
  });

  it("Deveria criar os dados de lançamento de notas retornando um objeto de sucesso", async () => {
    const grade = {
      id: "42",
      name: "Victor",
      school: School.Tecnologia,
      activity: {
        activityName: "Pytho32n 322",
        grade: 100,
        school: School.Tecnologia,
      },
    };

    const create = await useCase.execute(grade);

    expect(create).toBeDefined();
    expect(create.success).toBe(true);
    expect(create.message).toBe("Lançamento de notas feita com sucesso");
  });

  it("Deveria confirmar se o estudante já está cadastrado", async () => {
    const user = {
      id: "1",
      name: "Victor",
      school: School.Tecnologia,
      activity: {
        activityName: "Pytho32n 322",
        grade: 100,
        school: School.Tecnologia,
      },
    };
    const userExist = await fakeRepository.existStudent(user.id);

    expect(userExist).toBe(true);
  });

  it("Deveria cadastrar o estudante caso ele ainda não esteja", async () => {
    const user = {
      id: "90",
      name: "Victor",
      school: School.Tecnologia,
    };

    let createStudent;

    const userExist = await fakeRepository.existStudent(user.id);

    if (userExist == false) {
      createStudent = await fakeRepository.createStudent(user);
    }

    expect(createStudent).toBeDefined;
    expect(createStudent).toBe(true);
  });

  it("Deveria pular a função de cadastrar o usuário caso ele já esteja cadastrado", async () => {
    const user = {
      id: "1",
      name: "Victor",
      school: School.Tecnologia,
    };

    let createStudent;

    const userExist = await fakeRepository.existStudent(user.id);

    if (userExist == false) {
      createStudent = await fakeRepository.createStudent(user);
    }

    expect(createStudent).toBeUndefined;
  });

  it("Deveria cadastrar a nota vinculado ao estudante cadastrado", async () => {
    const user = {
      id: "1",
      activity: {
        activityName: "Python",
        grade: 100,
        school: School.Tecnologia,
      },
    };

    const userExist = await fakeRepository.existStudent(user.id);

    const releasedGrades = await fakeRepository.releaseGrades(
      user.activity,
      user.id
    );

    expect(releasedGrades).toBe(true);
    expect(userExist).toBe(true);
  });

  it("Deveria retornar um erro se faltar o headers de autorização JWT", async () => {
    const user = {
      id: 30,
      name: "Victor",
      school: "Tecnologia",
      activityName: "Pytho32n 322",
      grade: 100,
    };

    return await server!
      .post("/teacher/grades")
      .send(user)
      .then((res: Response) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toMatch(/No token provided./);
      });
  });
  it("Deveria retornar um erro se headers de autorização JWT for falso", async () => {
    const user = {
      id: 30,
      name: "Victor",
      school: "Tecnologia",
      activityName: "Pytho32n 322",
      grade: 100,
    };

    return await server!
      .post("/teacher/grades")
      .send(user)
      .set("Authorization", "abc123")
      .then((res: Response) => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.message).toMatch(/Failed to authenticate token./);
      });
  });

  it("Deveria retornar um erro se faltar o id ou estar de forma incorreta no body", async () => {
    const user = {
      name: "Victor",
      school: "Tecnologia",
      activityName: "Pytho32n 322",
      grade: 100,
    };

    return await server!
      .post("/teacher/grades")
      .send(user)
      .then((res: Response) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toMatch(/O ID precisa ser inserido./);
      });
  });

  it("Deveria retornar um erro se faltar o nome do aluno, atividade ou estar de forma incorreta no body", async () => {
    const user = {
      id: "99",
      school: "Tecnologia",
      grade: 100,
    };

    return await server!
      .post("/teacher/grades")
      .send(user)
      .then((res: Response) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toMatch(/Nome completo informado/);
      });
  });
  it("Deveria retornar um erro se faltar a escola ou estar de forma incorreta no body", async () => {
    const user = {
      id: "99",
      name: "Victor",
      activityName: "Pytho32n 322",
      grade: 100,
    };

    return await server!
      .post("/teacher/grades")
      .send(user)
      .then((res: Response) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toMatch(
          /A escola está informada incorretamente/
        );
      });
  });

  it("Deveria retornar um erro se faltar a nota ou estar de forma incorreta no body", async () => {
    const user = {
      id: "99",
      name: "Victor",
      school: School.Tecnologia,
      activityName: "Pytho32n 322",
    };

    return await server!
      .post("/teacher/grades")
      .send(user)
      .then((res: Response) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toMatch(/A nota do aluno vai de 0 a 100/);
      });
  });
});
