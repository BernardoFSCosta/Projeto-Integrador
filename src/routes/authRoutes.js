const express = require("express");
const authController = require("../controllers/authController");
const { regrasLogin } = require("../middlewares/validacao");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Autenticacao
 *   description: Endpoint de login do sistema
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Autentica um usuario
 *     tags: [Autenticacao]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@cervejaria.com
 *               senha:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: E-mail ou senha invalidos
 */
router.post("/login", regrasLogin, authController.login);

module.exports = router;
