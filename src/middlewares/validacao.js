const { body, validationResult } = require("express-validator");

/** Middleware que interrompe a requisicao caso existam erros de validacao. */
function validar(req, res, next) {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    const campos = {};
    erros.array().forEach((erro) => {
      campos[erro.path] = erro.msg;
    });
    return res.status(400).json({
      timestamp: new Date().toISOString(),
      status: 400,
      erro: "Dados invalidos",
      campos
    });
  }
  next();
}

const regrasLogin = [
  body("email").isEmail().withMessage("E-mail invalido"),
  body("senha").notEmpty().withMessage("A senha e obrigatoria"),
  validar
];

const regrasProduto = [
  body("nome").trim().notEmpty().withMessage("O nome do produto e obrigatorio"),
  body("estilo").trim().notEmpty().withMessage("O estilo da cerveja e obrigatorio"),
  body("precoVenda").isFloat({ gt: 0 }).withMessage("O preco deve ser maior que zero"),
  body("estoque").isFloat({ min: 0 }).withMessage("O estoque nao pode ser negativo"),
  validar
];

const regrasInsumo = [
  body("nome").trim().notEmpty().withMessage("O nome do insumo e obrigatorio"),
  body("unidade").trim().notEmpty().withMessage("A unidade de medida e obrigatoria"),
  body("quantidadeEstoque").isFloat({ min: 0 }).withMessage("A quantidade nao pode ser negativa"),
  body("estoqueMinimo").isFloat({ min: 0 }).withMessage("O estoque minimo nao pode ser negativo"),
  validar
];

module.exports = { regrasLogin, regrasProduto, regrasInsumo };
