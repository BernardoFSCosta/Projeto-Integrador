// Teste de integracao do fluxo completo de CRUD de Produto via HTTP,
// exercitando a aplicacao Express de ponta a ponta com Supertest.

process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../src/app");
const sequelize = require("../src/config/database");
const Produto = require("../src/models/Produto");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

afterEach(async () => {
  await Produto.destroy({ where: {}, truncate: true });
});

describe("API /api/produtos", () => {
  test("deve executar o fluxo completo de CRUD", async () => {
    // CREATE
    const respostaCriacao = await request(app)
      .post("/api/produtos")
      .send({
        nome: "Pilsen Dourada",
        estilo: "Pilsen",
        descricao: "Cerveja leve e refrescante",
        precoVenda: 15.9,
        estoque: 100
      });

    expect(respostaCriacao.status).toBe(201);
    expect(respostaCriacao.body.nome).toBe("Pilsen Dourada");
    const id = respostaCriacao.body.id;

    // READ
    const respostaBusca = await request(app).get(`/api/produtos/${id}`);
    expect(respostaBusca.status).toBe(200);
    expect(respostaBusca.body.nome).toBe("Pilsen Dourada");

    // UPDATE
    const respostaAtualizacao = await request(app)
      .put(`/api/produtos/${id}`)
      .send({
        nome: "Pilsen Dourada",
        estilo: "Pilsen",
        precoVenda: 17.5,
        estoque: 90
      });
    expect(respostaAtualizacao.status).toBe(200);
    expect(Number(respostaAtualizacao.body.precoVenda)).toBe(17.5);

    // DELETE
    const respostaExclusao = await request(app).delete(`/api/produtos/${id}`);
    expect(respostaExclusao.status).toBe(204);

    // Confere que foi realmente excluido
    const respostaAposExclusao = await request(app).get(`/api/produtos/${id}`);
    expect(respostaAposExclusao.status).toBe(404);
  });

  test("deve retornar erro 400 ao criar produto com dados invalidos", async () => {
    const resposta = await request(app).post("/api/produtos").send({
      nome: "",
      estilo: "",
      precoVenda: -5,
      estoque: -1
    });

    expect(resposta.status).toBe(400);
    expect(resposta.body.erro).toBeDefined();
  });
});
