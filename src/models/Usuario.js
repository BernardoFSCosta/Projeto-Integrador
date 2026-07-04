// Representa um usuario do sistema (administrador, producao, vendas ou gestor).
// Corresponde a entidade USUARIO do modelo de dados do projeto.

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: "O nome e obrigatorio" } }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: { msg: "E-mail invalido" } }
    },
    senha: {
      // armazenada com hash bcrypt, nunca em texto puro
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo: {
      // ADMIN, PRODUCAO, VENDAS ou GESTOR
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "ADMIN"
    }
  },
  {
    tableName: "usuario"
  }
);

module.exports = Usuario;
