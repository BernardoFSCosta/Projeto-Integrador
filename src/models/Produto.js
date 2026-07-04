// Representa um produto (cerveja artesanal) comercializado pela cervejaria.
// Corresponde a entidade PRODUTO do modelo de dados do projeto.

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Produto = sequelize.define(
  "Produto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: "O nome do produto e obrigatorio" } }
    },
    estilo: {
      // ex: IPA, Pilsen, Stout
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: "O estilo da cerveja e obrigatorio" } }
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true
    },
    precoVenda: {
      field: "preco_venda",
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: { args: [0.01], msg: "O preco deve ser maior que zero" } }
    },
    estoque: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: { args: [0], msg: "O estoque nao pode ser negativo" } }
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    tableName: "produto"
  }
);

module.exports = Produto;
