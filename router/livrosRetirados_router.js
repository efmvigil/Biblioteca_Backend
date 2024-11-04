const express = require('express');
const livrosRetiradosController = require('../controller/livrosRetirados_controller');
const router = express.Router();

router.param('id', (req, res, next, val) => {
  req.id = val;
  next();
});

router.route('/').get(livrosRetiradosController.listar).post(livrosRetiradosController.inserir);

router
  .route('/:id')
  .get(livrosRetiradosController.buscarPorId)
  .put(livrosRetiradosController.atualizar)
  .delete(livrosRetiradosController.deletar);

module.exports = router;
