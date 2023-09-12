import app from "../../app";
import supertest, { Response } from "supertest";
import { ApiError } from "../../errors";
import { GetRankingBySchoolUseCase } from "./getRankingBySchoolUseCase";
import { School } from "../../entities/enums/School";
import { IGradeRepository } from "../../interfaces/IGradeRepository";
import { FakeGradesRepository } from "../../repositories/FakeGradesRepository";

describe("Criação de usuário do Professor, POST /teacher", () => {
  jest.setTimeout(10000);
  let fakeRepository: IGradeRepository;
  let useCase: GetRankingBySchoolUseCase;
  let server;

  fakeRepository = new FakeGradesRepository();

  beforeAll(() => {
    useCase = new GetRankingBySchoolUseCase(fakeRepository);
    server = supertest(app);
  });

  it("Deveria retornar um array com uma lista de estudantes", async () => {
    const school = School.Dados;

    const list = await useCase.execute({ school });

    expect(list).toBeDefined();
    expect(list).toHaveLength(2);
  });

  it("Deveria retornar o array ordenado por notas", async () => {
    const school = School.Dados;

    const list = await useCase.execute({ school });

    expect(list).toBeDefined();
    expect(list[0].activity!.grade.valueOf()).toBeGreaterThan(
      list[1].activity!.grade.valueOf()
    );
  });

  it("Deveria retornar um erro caso nao seja informado o nome da escola para pesquisa", async () => {
    const school = School.Dados;

    await useCase.execute({ school }).catch((err) => {
      expect(err).toBeInstanceOf(ApiError);
      expect(err.statusCode).toEqual(404);
      expect(err.msg).toMatch(/O nome da escola precisa /);
    });
  });
});
