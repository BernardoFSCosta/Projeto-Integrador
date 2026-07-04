// Camada de servico responsavel pelas regras de negocio relacionadas a Insumo.

const { Op } = require("sequelize");
const Insumo = require("../models/Insumo");
const { RecursoNaoEncontradoError } = require("../utils/erros");

async function listarTodos() {
  return Insumo.findAll({ order: [["id", "ASC"]] });
}

async function buscarPorNome(nome) {
  return Insumo.findAll({
    where: { nome: { [Op.like]: `%${nome}%` } },
    order: [["id", "ASC"]]
  });
}

async function listarComEstoqueBaixo() {
  const todos = await listarTodos();
  return todos.filter(
    (insumo) => Number(insumo.quantidadeEstoque) <= Number(insumo.estoqueMinimo)
  );
}

async function buscarPorId(id) {
  const insumo = await Insumo.findByPk(id);
  if (!insumo) {
    throw new RecursoNaoEncontradoError(`Insumo nao encontrado com id: ${id}`);
  }
  return insumo;
}

async function criar(dados) {
  return Insumo.create({
    nome: dados.nome,
    unidade: dados.unidade,
    quantidadeEstoque: dados.quantidadeEstoque,
    estoqueMinimo: dados.estoqueMinimo,
    precoUnitario: dados.precoUnitario,
    ativo: dados.ativo === undefined ? true : dados.ativo
  });
}

async function atualizar(id, dados) {
  const insumo = await buscarPorId(id);

  insumo.nome = dados.nome;
  insumo.unidade = dados.unidade;
  insumo.quantidadeEstoque = dados.quantidadeEstoque;
  insumo.estoqueMinimo = dados.estoqueMinimo;
  insumo.precoUnitario = dados.precoUnitario;
  if (dados.ativo !== undefined) {
    insumo.ativo = dados.ativo;
  }

  await insumo.save();
  return insumo;
}

async function excluir(id) {
  const insumo = await buscarPorId(id);
  await insumo.destroy();
}

module.exports = {
  listarTodos,
  buscarPorNome,
  listarComEstoqueBaixo,
  buscarPorId,
  criar,
  atualizar,
  excluir
};
