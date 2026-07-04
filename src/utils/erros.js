// Erros customizados usados para mapear situacoes de negocio para o status
// HTTP correto no middleware de tratamento de erros.

class RecursoNaoEncontradoError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = "RecursoNaoEncontradoError";
    this.status = 404;
  }
}

class CredenciaisInvalidasError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = "CredenciaisInvalidasError";
    this.status = 401;
  }
}

module.exports = { RecursoNaoEncontradoError, CredenciaisInvalidasError };
