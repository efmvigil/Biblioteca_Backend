const express = require('express');
const livrosRetiradosController = require('../controller/livrosRetirados_controller');
const router = express.Router();

router.param('id', (req, res, next, val) => {
  req.id = val;
  next();
});

router.route('/infos').get(livrosRetiradosController.infos);

router.route('/listarLporU').get(livrosRetiradosController.listarLporU);

router.route('/').get(livrosRetiradosController.listar).post(livrosRetiradosController.inserir);

router
  .route('/:id')
  .get(livrosRetiradosController.buscarPorId)
  .patch(livrosRetiradosController.devolver)
  .put(livrosRetiradosController.atualizar)
  .delete(livrosRetiradosController.deletar);

module.exports = router;
