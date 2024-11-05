const express = require('express');
const autoresController = require('../controller/autores_controller');
const router = express.Router();

router.param('id', (req, res, next, val) => {
  req.id = val;
  next();
});

router.route('/').get(autoresController.listar).post(autoresController.inserir);

router
  .route('/:id')
  .get(autoresController.buscarPorId)
  .put(autoresController.atualizar)
  .delete(autoresController.deletar);

module.exports = router;
