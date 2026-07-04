const authService = require("../services/authService");

async function login(req, res, next) {
  try {
    const resultado = await authService.autenticar(req.body);
    res.json(resultado);
  } catch (erro) {
    next(erro);
  }
}

module.exports = { login };
