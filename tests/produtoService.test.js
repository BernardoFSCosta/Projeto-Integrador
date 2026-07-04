// Teste unitario/de integracao leve da camada de servico de Produto.
// Usa SQLite em memoria (configurado em src/config/database.js quando
// NODE_ENV=test) para nao depender de um MySQL real durante os testes.

process.env.NODE_ENV = "test";

const sequelize = require("../src/config/database");
const Produto = require("../src/models/Produto");
const produtoService = require("../src/services/produtoService");
const { RecursoNaoEncontradoError } = require("../src/utils/erros");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

afterEach(async () => {
  await Produto.destroy({ where: {}, truncate: true });
});

describe("produtoService", () => {
  test("deve criar um produto com sucesso", async () => {
    const produto = await produtoService.criar({
      nome: "IPA Tropical",
      estilo: "IPA",
      precoVenda: 18.9,
      estoque: 50
    });

    expect(produto.id).toBeDefined();
    expect(produto.nome).toBe("IPA Tropical");
    expect(produto.ativo).toBe(true);
  });

  test("deve buscar um produto por id quando ele existe", async () => {
    const criado = await produtoService.criar({
      nome: "Pilsen Dourada",
      estilo: "Pilsen",
      precoVenda: 15.9,
      estoque: 100
    });

    const encontrado = await produtoService.buscarPorId(criado.id);

    expect(encontrado.id).toBe(criado.id);
    expect(encontrado.nome).toBe("Pilsen Dourada");
  });

  test("deve lancar erro ao buscar produto inexistente", async () => {
    await expect(produtoService.buscarPorId(9999)).rejects.toThrow(RecursoNaoEncontradoError);
  });

  test("deve atualizar um produto existente", async () => {
    const criado = await produtoService.criar({
      nome: "Stout Escura",
      estilo: "Stout",
      precoVenda: 20,
      estoque: 30
    });

    const atualizado = await produtoService.atualizar(criado.id, {
      nome: "Stout Escura Especial",
      estilo: "Stout",
      precoVenda: 22.5,
      estoque: 25
    });

    expect(atualizado.nome).toBe("Stout Escura Especial");
    expect(Number(atualizado.precoVenda)).toBe(22.5);
    expect(Number(atualizado.estoque)).toBe(25);
  });

  test("deve excluir um produto existente", async () => {
    const criado = await produtoService.criar({
      nome: "Weiss Clara",
      estilo: "Weiss",
      precoVenda: 17,
      estoque: 40
    });

    await produtoService.excluir(criado.id);

    await expect(produtoService.buscarPorId(criado.id)).rejects.toThrow(RecursoNaoEncontradoError);
  });
});
