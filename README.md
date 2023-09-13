<p align="center">
 <a href="#computer-o-projeto">Sobre</a> •
  <a href="#computer-diagrama-do-banco-de-dados">Diagrama SQL</a> •
  <a href="#computer-solução-da-aplicação">Solução</a> •
 <a href="#computer-tecnologias">Tecnologias usadas</a> • 
 <a href="#mag_right-para-rodar-o-projeto-de-forma-local">Como rodar localmente</a> • 
  <a href="#mag_right-projeto-na-nuvem">Hospedado na nuvem</a> • 
 <a href="#mag_right-rotas">Rotas</a> • 
</p>

## :computer: O projeto

- Sistema de rankeamento de alunos. Utilizando Clean Architecture com sua arquitetura desacoplada, o que permite integrar outros microsserviços posteriormente e também prestar manutenção facilmente. O sistema possui cadastro e login de professores com JWT que permite, assim que logado, fazer o lançamento de notas de alunos informando a escola e matéria vinculada a cada aluno.
- Na página principal, de forma pública, é mostrado o rankeamento global do top 3 de todas as escolas, e através de botões é possível ver o top 10 de cada escola. Atualização do ranking em tempo real utilizando websockets, que são enviados e atualizados sempre que é enviada uma nota nova no sistema.
- De começo foi pensado e definido qual seria o MER da solução, e como seria o deploy, após definido foi feito todo o necessário inicialmente no back-end, e após o front-end para começar a interligação, fazendo ajustes para que ambos estivessem de acordo, foi feito a sincronia do tempo real da solução. Já definido que seria usado a cloud Azure, para iniciar em ambiente de produção foi implementado uma instância de servidor flexível Azure para MYSQL que escala e possui redundância com backup, e serviços de aplicativos dos dois containers (API, portal WEB) que possuem escalamente horizontal caso necessário.

## :computer: Diagrama do banco de Dados
  <p align="center">
  <img src="https://github.com/VictorCstr/Projeto_Alunos-RT/blob/main/diagramaDNC.png" width="70%">
 </p>

 ## :computer: Solução da Aplicação
  <p align="center">
  <img src="https://github.com/VictorCstr/Projeto_Alunos-RT/blob/main/diagramaazure.png" width="70%">
 </p>

## :computer: Tecnologias

- Node, Typescript, Express.
- Clean Architecture.
- Socket.Io.
- Angular, Bootstrap.
- NGIX para deploy do servidor Web.
- CORS.
- SOLID, POO.
- MySQL localmente, Prisma ORM.
- Azure MYSQL para produção com escalabilidade automática.
- Azure Container Registry para subir os container
- Azure App Service para Hospedagem dos Containers com scalling.
- Docker e Docker-Compose.
- JSON Web Token para uso de tokens no portal.
- Bcrypt para processamento de Hash mais confiável das senhas.
- Jest e supertest para testes unitários e de integração.
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
$ Para melhorar o teste da aplicação, foi retirado o .env de dentro do gitignore, para início imediato do sistema
 sem a necessidade de configuração.

# Faça a instalação dos containers com o compose
$ docker-compose up --build

# Para executar
$ Para testar a api basta acessar com alguma ferramenta como o Postman na rota http://localhost:9090/

$ Para testar o portal web basta acessar com o navegador na rota http://localhost:4200/

# Para rodar os testes
$ cd pasta/back/
$ npm test

```

## :mag_right: Projeto na nuvem:

```bash
API: apidnc.azurewebsites.net/
Portas liberadas para acesso total.

WEB: webdnc.azurewebsites.net/

```

## :mag_right: Rotas:

- Utilizar ferramentas como Postman ou Insomnia.

```bash

** Create Teacher **

$ Path: http://localhost:9090/teacher

$ Body:
#   {
#        "name": "Victor Castro",
#	       "email": "victor@gmail.com",
#       	"password": "@teste123"
#   }
#  Como retorno receberá um success booleano e uma mensagem.

** Login Teacher **

$ Path: http://localhost:9090/teacher/login

$ Body:
#   {
#	       "email": "victor@gmail.com",
#       	"password": "@teste123"
#   }
#  Como retorno receberá um success booleano e na mensagem o token JWT.

** Release Grades **

$ Path: http://localhost:9090/teacher/grades
$ Headers= Authorization ${Token JWT retornando no Login}

$ Body:
#   {
#       "id": "42",
#	      "name": "Victor",
#       "school": "Tecnologia",
#	      "activityName": "Python",
#       "grade": 100
#   }
#  Como retorno receberá um success booleano e uma mensagem.

** Ranking Total **

$ Path: http://localhost:9090/grades
#  Como retorno receberá um array com os 3 alunos com a maior somatória de notas.

** Ranking por escola **

$ Path: http://localhost:9090/grades/{school}, exemplos: http://localhost:9090/grades/Dados, http://localhost:9090/grades/Tecnologia
#  Como retorno receberá um array com os 10 alunos com a maior somatória de notas filtrados pela escola.

```
