const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

/**
 * Rota para login de usuário.
 *
 * @route POST /auth/login
 * @group Auth - Operações de Autenticação
 * @param {string} login.body.required - O login do usuário
 * @param {string} password.body.required - A senha do usuário
 * @returns {object} 200 - Objeto de autenticação bem-sucedido
 * @returns {object} 401 - Não autorizado
 * @returns {object} 400 - Requisição inválida
 */
router.post('/login', async (req, res) => {
    if (req.body.login && req.body.password) {
        const result = await authController.login(req.body);
        if (result?.auth) {
            res.status(200).json(result);
        } else {
            res.status(401).json({ error: true, message: 'Unauthorized' });
        }
    } else {
        res.status(400).json({ error: true, message: 'Bad Request' });
    }
});

/**
 * Rota para registro de novo usuário.
 *
 * @route POST /auth/register
 * @group Auth - Operações de Autenticação
 * @param {object} body.required - Objeto contendo dados do usuário a ser registrado
 * @returns {object} 201 - Objeto de autenticação bem-sucedido
 * @returns {object} 400 - Falha no registro
 */
router.post('/register', async (req, res) => {
    if (req.body) {
        const result = await authController.register(req.body);
        if (result?.auth) {
            res.status(201).json(result);
        } else {
            res.status(400).json({ error: true, message: 'Registration failed' });
        }
    } else {
        res.status(400).json({ error: true, message: 'Bad Request' });
    }
});

module.exports = router;
