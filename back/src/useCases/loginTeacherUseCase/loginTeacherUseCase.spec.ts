import app from "../../app";
import supertest, { Response } from "supertest";
import { Teacher } from "../../entities/Teacher";
import { ApiError } from "../../errors";
import { ITeacherRepository } from "../../interfaces/ITeacherRepository";
import { FakeTeacherRepository } from "../../repositories/FakeTeacherRepository";
import { hashPassword } from "../../utils/encrypt";
import { LoginTeacherUseCase } from "./loginTeacherUseCase";

describe("Criação de usuário do Professor, POST /teacher", () => {
  jest.setTimeout(10000);
  let fakeRepository: ITeacherRepository;
  let useCase: LoginTeacherUseCase;
  let server;

  fakeRepository = new FakeTeacherRepository();

  beforeAll(() => {
    useCase = new LoginTeacherUseCase(fakeRepository);
    server = supertest(app);
  });

  it("Deveria criar os dados do professor retornando um objeto de sucesso com o JWT", async () => {
    const user = {
      email: "victor@teste.com",
      password: "@Teste123",
    };

    const login = await useCase.execute(user);

    expect(login).toBeDefined();
    expect(login.success).toBe(true);
    expect(login.message).toBeDefined();
  });

  it("Deveria retornar um erro se o email não for informado", async () => {
    const user = {
      email: "",
      password: "teste",
    };
    await useCase.execute(user).catch((err) => {
      expect(err).toBeInstanceOf(ApiError);
      expect(err.statusCode).toEqual(400);
      expect(err.msg).toMatch(/Dados não informados pelo cliente/);
    });
  });

  it("Deveria retornar um erro se a senha não for informada", async () => {
    const user = {
      email: "victor@teste.com",
      password: "",
    };
    await useCase.execute(user).catch((err) => {
      expect(err).toBeInstanceOf(ApiError);
      expect(err.statusCode).toEqual(400);
      expect(err.msg).toMatch(/Dados não informados pelo cliente/);
    });
  });

  it("Deveria confirmar se o professor está cadastrado", async () => {
    const user = {
      email: "victor@teste.com",
      password: "@Teste123",
    };

    const userExist = await fakeRepository.existUser(user.email);

    expect(userExist).toBe(true);
  });

  it("Deveria retornar um erro se o email não estiver cadastrado", async () => {
    const user = {
      email: "victor@teste32.com",
      password: "@Teste123",
    };
    await useCase.execute(user).catch((err) => {
      expect(err).toBeInstanceOf(ApiError);
      expect(err.statusCode).toEqual(404);
      expect(err.msg).toMatch(/Usuário não cadastrado/);
    });
  });

  it("Deveria retornar um erro se a senha não condizer com o hash cadastrado", async () => {
    const user = {
      email: "victor@teste.com",
      password: "@Teste1234",
    };
    await useCase.execute(user).catch((err) => {
      expect(err).toBeInstanceOf(ApiError);
      expect(err.statusCode).toEqual(401);
      expect(err.msg).toMatch(/Erro no login,/);
    });
  });
});
