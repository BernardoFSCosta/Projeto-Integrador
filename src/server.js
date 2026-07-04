require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");
const semearUsuarioAdmin = require("./utils/seed");

const PORTA = process.env.PORT || 8080;

async function iniciar() {
  try {
    await sequelize.authenticate();
    console.log(">> Conexao com o banco de dados estabelecida com sucesso.");

    // Cria/atualiza as tabelas automaticamente a partir dos models
    await sequelize.sync({ alter: true });

    await semearUsuarioAdmin();

    app.listen(PORTA, () => {
      console.log(`>> Servidor rodando em http://localhost:${PORTA}`);
      console.log(`>> Login:   http://localhost:${PORTA}/login.html`);
      console.log(`>> Swagger: http://localhost:${PORTA}/swagger-ui.html`);
    });
  } catch (erro) {
    console.error(">> Nao foi possivel iniciar a aplicacao:", erro.message);
    process.exit(1);
  }
}

iniciar();
