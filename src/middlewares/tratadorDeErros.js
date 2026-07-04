// Centraliza o tratamento de erros da API, garantindo respostas padronizadas
// com o status HTTP adequado para cada tipo de excecao.

const { ValidationError } = require("sequelize");

function tratadorDeErros(erro, req, res, next) { // eslint-disable-line no-unused-vars
  if (erro instanceof ValidationError) {
    const campos = {};
    erro.errors.forEach((item) => {
      campos[item.path] = item.message;
    });
    return res.status(400).json({
      timestamp: new Date().toISOString(),
      status: 400,
      erro: "Dados invalidos",
      campos
    });
  }

  const status = erro.status || 500;
  const mensagem = status === 500 ? `Erro interno: ${erro.message}` : erro.message;

  if (status === 500) {
    console.error(erro);
  }

  res.status(status).json({
    timestamp: new Date().toISOString(),
    status,
    erro: mensagem
  });
}

module.exports = tratadorDeErros;
