// Cria um usuario administrador padrao na primeira execucao da aplicacao,
// apenas se ainda nao existir nenhum usuario com o e-mail abaixo.
//
// Login de demonstracao:
//   e-mail: admin@cervejaria.com
//   senha:  admin123

const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

async function semearUsuarioAdmin() {
  const emailAdmin = "admin@cervejaria.com";

  const existente = await Usuario.findOne({ where: { email: emailAdmin } });
  if (existente) return;

  const senhaHash = await bcrypt.hash("admin123", 10);

  await Usuario.create({
    nome: "Administrador",
    email: emailAdmin,
    senha: senhaHash,
    tipo: "ADMIN"
  });

  console.log(`>> Usuario administrador padrao criado: ${emailAdmin} / senha: admin123`);
}

module.exports = semearUsuarioAdmin;
