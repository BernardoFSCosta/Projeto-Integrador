// Representa um insumo utilizado na producao das cervejas (malte, lupulo, levedura, etc).
// Corresponde a entidade INSUMO do modelo de dados do projeto.

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Insumo = sequelize.define(
  "Insumo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: "O nome do insumo e obrigatorio" } }
    },
    unidade: {
      // ex: kg, g, litro
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: "A unidade de medida e obrigatoria" } }
    },
    quantidadeEstoque: {
      field: "quantidade_estoque",
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: { args: [0], msg: "A quantidade nao pode ser negativa" } }
    },
    estoqueMinimo: {
      field: "estoque_minimo",
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: { args: [0], msg: "O estoque minimo nao pode ser negativo" } }
    },
    precoUnitario: {
      field: "preco_unitario",
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    tableName: "insumo"
  }
);

module.exports = Insumo;
