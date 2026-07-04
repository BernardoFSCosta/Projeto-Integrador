// Responsavel pela autenticacao dos usuarios do sistema.
// A senha e armazenada com hash bcrypt.
// Para simplificar, o "token" retornado é um identificador
// opaco gerado no momento do login, sem persistencia de sessao no servidor.

const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { CredenciaisInvalidasError } = require("../utils/erros");

async function autenticar({ email, senha }) {
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) {
    throw new CredenciaisInvalidasError("E-mail ou senha invalidos");
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    throw new CredenciaisInvalidasError("E-mail ou senha invalidos");
  }

  const token = crypto.randomBytes(24).toString("hex");

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    tipo: usuario.tipo,
    token
  };
}

module.exports = { autenticar };
