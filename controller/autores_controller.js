const autoresService = require('../service/autores_service');

exports.listar = async function (req, res) {
  try {
    const result = await autoresService.listar();
    res.send(result);
  } catch (err) {
    res.status(err.codigo || 500).send(err);
  }
};

exports.inserir = async function (req, res) {
  try {
    const result = await autoresService.inserir(req.body);
    res.status(201).send(result);
  } catch (err) {
    res.status(err.codigo || 500).send(err);
  }
};

exports.buscarPorId = async function (req, res) {
  try {
    const result = await autoresService.buscarPorId(req.params.id);
    if (result) {
      res.send(result);
    } else {
      res.status(404).send({ status: 'erro', msg: 'Autor não encontrado' });
    }
  } catch (err) {
    res.status(err.codigo || 500).send(err);
  }
};

exports.atualizar = async function (req, res) {
  try {
    const result = await autoresService.atualizar(req.params.id, req.body);
    res.send(result);
  } catch (err) {
    res.status(err.codigo || 500).send(err);
  }
};

exports.deletar = async function (req, res) {
  try {
    const result = await autoresService.deletar(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(err.codigo || 500).send(err);
  }
};