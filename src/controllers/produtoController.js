const produtoService = require("../services/produtoService");

async function listar(req, res, next) {
  try {
    const { nome } = req.query;
    const produtos = nome ? await produtoService.buscarPorNome(nome) : await produtoService.listarTodos();
    res.json(produtos);
  } catch (erro) {
    next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const produto = await produtoService.buscarPorId(req.params.id);
    res.json(produto);
  } catch (erro) {
    next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const produto = await produtoService.criar(req.body);
    res.status(201).json(produto);
  } catch (erro) {
    next(erro);
  }
}

async function atualizar(req, res, next) {
  try {
    const produto = await produtoService.atualizar(req.params.id, req.body);
    res.json(produto);
  } catch (erro) {
    next(erro);
  }
}

async function excluir(req, res, next) {
  try {
    await produtoService.excluir(req.params.id);
    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, excluir };
