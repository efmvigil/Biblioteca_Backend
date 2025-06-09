const express = require('express');
const livrosRetiradosController = require('../controller/livrosRetirados_controller');
const authController = require('../controller/auth_controller');

const router = express.Router();

router.param('id', (req, res, next, val) => {
  req.id = val;
  next();
});

router.route('/infos').get(livrosRetiradosController.infos);

router
  .route('/listarLporU/:id')
  .get(authController.autenticarToken, livrosRetiradosController.listarLporU);

router.route('/').get(livrosRetiradosController.listar);

router
  .route('/:id')
  .get(livrosRetiradosController.buscarPorId)
  .put(livrosRetiradosController.atualizar)
  .delete(livrosRetiradosController.devolver)
  .post(authController.autenticarToken, livrosRetiradosController.inserir);

module.exports = router;
