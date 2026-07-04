// Camada de servico responsavel pelas regras de negocio relacionadas a Produto.
// Mantem os controllers enxutos e centraliza a logica de CRUD.

const { Op } = require("sequelize");
const Produto = require("../models/Produto");
const { RecursoNaoEncontradoError } = require("../utils/erros");

async function listarTodos() {
  return Produto.findAll({ order: [["id", "ASC"]] });
}

async function buscarPorNome(nome) {
  return Produto.findAll({
    where: { nome: { [Op.like]: `%${nome}%` } },
    order: [["id", "ASC"]]
  });
}

async function buscarPorId(id) {
  const produto = await Produto.findByPk(id);
  if (!produto) {
    throw new RecursoNaoEncontradoError(`Produto nao encontrado com id: ${id}`);
  }
  return produto;
}

async function criar(dados) {
  return Produto.create({
    nome: dados.nome,
    estilo: dados.estilo,
    descricao: dados.descricao,
    precoVenda: dados.precoVenda,
    estoque: dados.estoque,
    ativo: dados.ativo === undefined ? true : dados.ativo
  });
}

async function atualizar(id, dados) {
  const produto = await buscarPorId(id);

  produto.nome = dados.nome;
  produto.estilo = dados.estilo;
  produto.descricao = dados.descricao;
  produto.precoVenda = dados.precoVenda;
  produto.estoque = dados.estoque;
  if (dados.ativo !== undefined) {
    produto.ativo = dados.ativo;
  }

  await produto.save();
  return produto;
}

async function excluir(id) {
  const produto = await buscarPorId(id);
  await produto.destroy();
}

module.exports = { listarTodos, buscarPorNome, buscarPorId, criar, atualizar, excluir };
