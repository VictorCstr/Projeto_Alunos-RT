import { School } from "../entities/enums/School";

export async function emailIsCorrect(email: string) {
  let regex = /^\w+([\.-]?\w+)*@\D+\.\D+$/gm;
  if (
    email == null ||
    email == undefined ||
    regex.test(email) == false ||
    email.length < 5
  ) {
    return {
      sucess: false,
      result:
        "Email não foi informado corretamente. (Apenas números, letras e underscore antes do @ e depois apenas letras e ponto(.) )",
    };
  } else {
    return {
      sucess: true,
    };
  }
}

export async function nameIsCorrect(name: string) {
  if (
    name == null ||
    name == undefined ||
    name.length > 50 ||
    name.length < 4
  ) {
    return {
      sucess: false,
      result: "Nome completo informado com tamanho errado ou não foi definido",
    };
  } else {
    return {
      sucess: true,
    };
  }
}

export async function passwordIsCorrect(password: string) {
  let regex = /(?=.*[@!#$%^&*()/\\])[@!#$%^&*()/\\a-zA-Z0-9]{6,30}$/;
  if (
    regex.test(password) == false ||
    password == null ||
    password == undefined ||
    password.length < 6 ||
    password.length > 30
  ) {
    return {
      sucess: false,
      result:
        "A senha não está definida ou não contém pelo menos 1 caracteres especial, Letra maíuscula, mínuscula e algum número. Ou não contém de 6 a 30 caracteres",
    };
  } else {
    return {
      sucess: true,
    };
  }
}

export async function gradeIsCorrect(grade: number) {
  if (grade == null || grade == undefined || grade < 0 || grade > 100) {
    return {
      sucess: false,
      result: "A nota do aluno vai de 0 a 100",
    };
  } else {
    return {
      sucess: true,
    };
  }
}

export async function IdIsCorrect(id: string) {
  if (id == null || id == undefined) {
    return {
      sucess: false,
      result: "O ID precisa ser inserido. (String).",
    };
  } else {
    return {
      sucess: true,
    };
  }
}

export async function schoolIsCorrect(school: School) {
  if (school == "Dados" || school == "Produto" || school == "Tecnologia") {
    return {
      sucess: true,
    };
  } else {
    return {
      sucess: false,
      result:
        "A escola está informada incorretamente, opções: Dados, Produto e Tecnologia.",
    };
  }
}
