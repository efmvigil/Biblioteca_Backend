const express = require('express');
const usuariosController = require('../controller/usuarios_controller');
const router = express.Router();

// Middleware para capturar o parâmetro 'id' e anexá-lo ao request
router.param('id', (req, res, next, val) => {
  req.id = val;
  next();
});

// Rotas para listar e inserir usuários
router
  .route('/')
  .get(usuariosController.listar)
  .post(usuariosController.inserir);

// Rotas para operações em usuários por ID
router
  .route('/:id')
  .get(usuariosController.buscarPorId)
  .put(usuariosController.atualizar)
  .patch(usuariosController.deletar)

module.exports = router;
