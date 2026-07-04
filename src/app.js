// Configuracao central da aplicacao Express: middlewares, rotas, Swagger UI
// e servico dos arquivos estaticos do frontend (login, menu, produtos).

const path = require("path");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./config/swagger");
const authRoutes = require("./routes/authRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const insumoRoutes = require("./routes/insumoRoutes");
const tratadorDeErros = require("./middlewares/tratadorDeErros");

const app = express();

app.use(cors());
app.use(express.json());

// Frontend estatico (login.html, menu.html, produtos.html, css, js)
app.use(express.static(path.join(__dirname, "..", "public")));

// Documentacao da API
app.use("/swagger-ui.html", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/v3/api-docs", (req, res) => res.json(swaggerSpec));

// Rotas da API
app.use("/api/auth", authRoutes);
app.use("/api/produtos", produtoRoutes);
app.use("/api/insumos", insumoRoutes);

// Tratamento centralizado de erros (deve ser o ultimo middleware)
app.use(tratadorDeErros);

module.exports = app;
