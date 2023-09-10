<p align="center">
 <a href="#computer-o-projeto">Sobre</a> •
 <a href="#computer-tecnologias">Tecnologias usadas</a> • 
 <a href="#mag_right-para-rodar-o-projeto-de-forma-local">Como rodar</a> • 
 <a href="#mag_right-rotas">Rotas</a> • 
</p>

## :computer: O projeto

- Sistema de rankeamento de alunos. Utilizando Clean Architecture com sua arquitetura desacoplada, o que permite integrar outros microsserviços posteriormente e também prestar manutenção facilmente. O sistema possui cadastro e login de professores com JWT que permite, assim que logado, fazer o lançamento de notas de alunos informando a escola e matéria vinculada a cada aluno.
- Na página principal, de forma pública, é mostrado o rankeamento global do top 3 de todas as escolas, e através de botões é possível ver o top 10 de cada escola.

## :computer: Tecnologias

- Node, Typescript, Express.
- Clean Architecture.
- Socket.Io.
- Angular, Bootstrap.
- CORS.
- SOLID, POO.
- MySQL, Prisma ORM.
- Docker e Docker-Compose.
- JSON Web Token para uso de tokens no portal.
- Bcrypt para processamento de Hash mais confiável das senhas.
- Jest para testes.
- Wiston para logs locais em arquivos da aplicação.
- Cluster e Compress para melhoria de desempenho.

## :mag_right: Para rodar o projeto de forma local:

```bash
# Pré requisitos
- Docker instalado na máquina

# Faça o clone do repositório
$ git clone

# Acesse a pasta do projeto no terminal
$ cd pasta

# Criar as variaveis para o container.
$ Para melhorar o teste da aplicação, foi retirado o .env de dentro do gitignore, para início imediato
$ do sistema sem a necessidade de configuração

# Faça a instalação dos containers com o compose
$ docker compose up --build

# Para executar
$ Para testar a api basta acessar com alguma ferramenta como o Postman na rota http://localhost:9090/
$ Para testar o portal web basta acessar com o navegador na rota http://localhost:4200/

# Para rodar os testes
$ cd pasta/back/
$ npm test

```

## :mag_right: Rotas:

- Utilizar ferramentas como Postman ou Insomnia.

```bash


```
