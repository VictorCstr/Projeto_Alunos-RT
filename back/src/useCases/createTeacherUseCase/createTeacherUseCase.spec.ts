import app from "../../app";
import supertest, { Response } from "supertest";
import { Teacher } from "../../entities/Teacher";
import { ApiError } from "../../errors";
import { ITeacherRepository } from "../../interfaces/ITeacherRepository";
import { FakeTeacherRepository } from "../../repositories/FakeTeacherRepository";
import { hashPassword } from "../../utils/encrypt";
import { CreateTeacherUseCase } from "./createTeacherUseCase";

describe("Criação de usuário do Professor, POST /teacher", () => {
  jest.setTimeout(10000);
  let fakeRepository: ITeacherRepository;
  let useCase: CreateTeacherUseCase;
  let server;

  fakeRepository = new FakeTeacherRepository();

  beforeAll(() => {
    useCase = new CreateTeacherUseCase(fakeRepository);
    server = supertest(app);
  });

  it("Deveria criar os dados do professor retornando um objeto de sucesso", async () => {
    const user = {
      id: "50",
      name: "Victor Castro",
      email: "victor2@teste.com",
      password: "teste",
    };

    const create = await useCase.execute(user);

    expect(create).toBeDefined();
    expect(create.success).toBe(true);
    expect(create.message).toBe("Criação do usuário enviado com sucesso");
  });

  it("Deveria retornar um erro se já existir o endereço de email cadastrado", async () => {
    const user = {
      id: "50",
      name: "Victor Castro",
      email: "victor@teste.com",
      password: "teste",
    };
    await useCase.execute(user).catch((err) => {
      expect(err).toBeInstanceOf(ApiError);
      expect(err.statusCode).toEqual(404);
      expect(err.msg).toMatch(/Endereço de email já em uso/);
    });
  });

  it("Deveria transformar a senha em hash", async () => {
    const user = {
      id: "50",
      name: "Victor Castro",
      email: "victor@teste.com",
      password: "teste",
    };

    const hash = await hashPassword(user.password);

    expect(hash).toBeDefined;
    expect(hash).not.toEqual(user.password);
  });

  it("Deveria retornar um erro se faltar o nome ou estar de forma incorreta no body", async () => {
    const user = {
      id: "50",
      email: "victor@teste.com",
      password: "@Teste123",
    };

    return await server!
      .post("/teacher")
      .send(user)
      .then((res: Response) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toMatch(
          /Nome completo informado com tamanho errado ou não foi definido/
        );
      });
  });

  it("Deveria retornar um erro se faltar a senha ou estar de forma incorreta no body", async () => {
    const user = {
      id: "50",
      email: "victor@teste.com",
      password: "teste",
    };

    return await server!
      .post("/teacher")
      .send(user)
      .then((res: Response) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toMatch(
          /A senha não está definida ou não contém pelo menos /
        );
      });
  });

  it("Deveria retornar um erro se faltar o email ou estar de forma incorreta no body", async () => {
    const user = {
      id: "50",
      email: "victor.com",
      password: "@Teste123",
    };

    return await server!
      .post("/teacher")
      .send(user)
      .then((res: Response) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toMatch(/Email não foi informado corretamente./);
      });
  });
});
