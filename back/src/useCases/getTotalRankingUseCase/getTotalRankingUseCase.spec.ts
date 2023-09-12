import app from "../../app";
import supertest, { Response } from "supertest";
import { ApiError } from "../../errors";
import { GetTotalRankingUseCase } from "./getTotalRankingUseCase";
import { School } from "../../entities/enums/School";
import { IGradeRepository } from "../../interfaces/IGradeRepository";
import { FakeGradesRepository } from "../../repositories/FakeGradesRepository";

describe("Criação de usuário do Professor, POST /teacher", () => {
  jest.setTimeout(10000);
  let fakeRepository: IGradeRepository;
  let useCase: GetTotalRankingUseCase;

  fakeRepository = new FakeGradesRepository();

  beforeAll(() => {
    useCase = new GetTotalRankingUseCase(fakeRepository);
  });

  it("Deveria retornar um array com uma lista de estudantes sem filtro", async () => {
    const list = await useCase.execute();

    expect(list).toBeDefined();
    expect(list).toHaveLength(3);
  });

  it("Deveria retornar o array ordenado por notas", async () => {
    const list = await useCase.execute();

    expect(list).toBeDefined();
    expect(list[0].activity!.grade.valueOf()).toBeGreaterThan(
      list[2].activity!.grade.valueOf()
    );
  });
});
