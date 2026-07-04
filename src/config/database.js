// Configuracao da conexao com o banco de dados via Sequelize.
// Em producao/desenvolvimento usa MySQL; em ambiente de teste usa SQLite em
// memoria, para que a suite de testes rode sem depender de um MySQL real.

require("dotenv").config();
const { Sequelize } = require("sequelize");

const ambiente = process.env.NODE_ENV || "development";

let sequelize;

if (ambiente === "test") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || "cervejaria_db",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "root",
    {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      dialect: "mysql",
      logging: false,
      define: {
        underscored: true,
        timestamps: true
      }
    }
  );
}

module.exports = sequelize;
