const express = require("express");
const insumoController = require("../controllers/insumoController");
const { regrasInsumo } = require("../middlewares/validacao");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Insumos
 *   description: Gerenciamento de insumos (materia-prima) da cervejaria
 */

/**
 * @swagger
 * /api/insumos:
 *   get:
 *     summary: Lista todos os insumos, ou filtra por nome via ?nome=
 *     tags: [Insumos]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de insumos
 */
router.get("/", insumoController.listar);

/**
 * @swagger
 * /api/insumos/estoque-baixo:
 *   get:
 *     summary: Lista os insumos com estoque abaixo ou igual ao minimo definido
 *     tags: [Insumos]
 *     responses:
 *       200:
 *         description: Lista de insumos com estoque baixo
 */
router.get("/estoque-baixo", insumoController.listarEstoqueBaixo);

/**
 * @swagger
 * /api/insumos/{id}:
 *   get:
 *     summary: Busca um insumo pelo id
 *     tags: [Insumos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Insumo encontrado
 *       404:
 *         description: Insumo nao encontrado
 */
router.get("/:id", insumoController.buscarPorId);

/**
 * @swagger
 * /api/insumos:
 *   post:
 *     summary: Cadastra um novo insumo
 *     tags: [Insumos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, unidade, quantidadeEstoque, estoqueMinimo]
 *             properties:
 *               nome:
 *                 type: string
 *               unidade:
 *                 type: string
 *               quantidadeEstoque:
 *                 type: number
 *               estoqueMinimo:
 *                 type: number
 *               precoUnitario:
 *                 type: number
 *     responses:
 *       201:
 *         description: Insumo criado
 *       400:
 *         description: Dados invalidos
 */
router.post("/", regrasInsumo, insumoController.criar);

/**
 * @swagger
 * /api/insumos/{id}:
 *   put:
 *     summary: Atualiza um insumo existente
 *     tags: [Insumos]
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
 *         description: Insumo atualizado
 *       404:
 *         description: Insumo nao encontrado
 */
router.put("/:id", regrasInsumo, insumoController.atualizar);

/**
 * @swagger
 * /api/insumos/{id}:
 *   delete:
 *     summary: Exclui um insumo
 *     tags: [Insumos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Insumo excluido
 *       404:
 *         description: Insumo nao encontrado
 */
router.delete("/:id", insumoController.excluir);

module.exports = router;
