const insumoService = require("../services/insumoService");

async function listar(req, res, next) {
  try {
    const { nome } = req.query;
    const insumos = nome ? await insumoService.buscarPorNome(nome) : await insumoService.listarTodos();
    res.json(insumos);
  } catch (erro) {
    next(erro);
  }
}

async function listarEstoqueBaixo(req, res, next) {
  try {
    const insumos = await insumoService.listarComEstoqueBaixo();
    res.json(insumos);
  } catch (erro) {
    next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const insumo = await insumoService.buscarPorId(req.params.id);
    res.json(insumo);
  } catch (erro) {
    next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const insumo = await insumoService.criar(req.body);
    res.status(201).json(insumo);
  } catch (erro) {
    next(erro);
  }
}

async function atualizar(req, res, next) {
  try {
    const insumo = await insumoService.atualizar(req.params.id, req.body);
    res.json(insumo);
  } catch (erro) {
    next(erro);
  }
}

async function excluir(req, res, next) {
  try {
    await insumoService.excluir(req.params.id);
    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
}

module.exports = { listar, listarEstoqueBaixo, buscarPorId, criar, atualizar, excluir };
