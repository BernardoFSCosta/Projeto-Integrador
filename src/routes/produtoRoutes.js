const express = require("express");
const produtoController = require("../controllers/produtoController");
const { regrasProduto } = require("../middlewares/validacao");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de produtos (cervejas) da cervejaria
 */

/**
 * @swagger
 * /api/produtos:
 *   get:
 *     summary: Lista todos os produtos, ou filtra por nome via ?nome=
 *     tags: [Produtos]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get("/", produtoController.listar);

/**
 * @swagger
 * /api/produtos/{id}:
 *   get:
 *     summary: Busca um produto pelo id
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto nao encontrado
 */
router.get("/:id", produtoController.buscarPorId);

/**
 * @swagger
 * /api/produtos:
 *   post:
 *     summary: Cadastra um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, estilo, precoVenda, estoque]
 *             properties:
 *               nome:
 *                 type: string
 *               estilo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               precoVenda:
 *                 type: number
 *               estoque:
 *                 type: number
 *     responses:
 *       201:
 *         description: Produto criado
 *       400:
 *         description: Dados invalidos
 */
router.post("/", regrasProduto, produtoController.criar);

/**
 * @swagger
 * /api/produtos/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       404:
 *         description: Produto nao encontrado
 */
router.put("/:id", regrasProduto, produtoController.atualizar);

/**
 * @swagger
 * /api/produtos/{id}:
 *   delete:
 *     summary: Exclui um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Produto excluido
 *       404:
 *         description: Produto nao encontrado
 */
router.delete("/:id", produtoController.excluir);

module.exports = router;
