# Sistema de Gestão para Cervejaria Artesanal

Projeto Integrador — UNOESC
Bernardo Francisco Surdi Costa (430168) e Marcelo Rossa (406151)

Aplicação web para gestão de **produtos** (cervejas) e **insumos** (matéria-prima),
com telas de **login**, **menu** e **gerenciamento de produtos e insumos** (CRUD completo).

## Tecnologias

- **Node.js + Express** — backend
- **Sequelize** — ORM
- **MySQL** — banco de dados (SQLite em memória apenas nos testes)
- **Swagger** — documentação da API
- **HTML, CSS e JavaScript puro** — frontend
- **Jest + Supertest** — testes
- **npm** — gerenciador de dependências

## Como executar

```bash
npm install
cp .env.example .env   # ajuste usuário/senha do MySQL, se necessário
npm start
```

Crie o banco antes de iniciar:
```sql
CREATE DATABASE cervejaria_db;
```

A aplicação sobe em `http://localhost:8080`.

**Login de demonstração** (criado automaticamente):
- E-mail: `admin@cervejaria.com`
- Senha: `admin123`

## Acessar

| Recurso              | URL                                   |
|-----------------------|----------------------------------------|
| Login                 | http://localhost:8080/login.html      |
| Menu                   | http://localhost:8080/menu.html       |
| Produtos e Insumos     | http://localhost:8080/produtos.html   |
| Swagger (documentação) | http://localhost:8080/swagger-ui.html |

## Testes

```bash
npm test
```
Roda com SQLite em memória — não precisa de MySQL para testar.

## Principais endpoints

| Método | Endpoint                | Descrição              |
|--------|---------------------------|--------------------------|
| POST   | `/api/auth/login`          | Login                  |
| GET/POST/PUT/DELETE | `/api/produtos`(`/{id}`) | CRUD de produtos |
| GET/POST/PUT/DELETE | `/api/insumos`(`/{id}`)  | CRUD de insumos  |
| GET    | `/api/insumos/estoque-baixo`| Insumos abaixo do estoque mínimo |

Todos os endpoints podem ser testados diretamente pelo Swagger.
