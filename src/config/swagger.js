// Configuracao da documentacao da API (Swagger), gerada a partir
// dos comentarios JSDoc presentes nos arquivos de rotas (src/routes/*.js).

const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API - Sistema de Gestao para Cervejaria Maddock",
      version: "1.0.0",
      description:
        "API REST para gerenciamento de produtos, insumos e autenticacao de " +
        "usuarios de uma cervejaria artesanal. Projeto Integrador - UNOESC.",
      contact: {
        name: "Bernardo Francisco Surdi Costa e Marcelo Rossa"
      }
    },
    servers: [
      { url: "http://localhost:8080", description: "Servidor local" }
    ]
  },
  apis: ["./src/routes/*.js"]
};

module.exports = swaggerJsdoc(options);
