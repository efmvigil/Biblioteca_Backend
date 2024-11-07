const livrosRetiradosService = require('../service/livrosRetirados_service');

exports.listar = async function (req, res) {
  try {
    const result = await livrosRetiradosService.listar();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.infos = async function (req, res) {
  try {
    const result = await livrosRetiradosService.infos();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.listarLporU = async function (req, res) {
  try {
    const result = await livrosRetiradosService.listarLporU();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.inserir = async function (req, res) {
  try {
    const result = await livrosRetiradosService.inserir(req.body);
    res.status(201).send(result);
  } catch (err) {
    res.status(err.codigo || 500).send(err);
  }
};

exports.buscarPorId = async function (req, res) {
  try {
    const result = await livrosRetiradosService.buscarPorId(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(err.codigo || 500).send(err);
  }
};

exports.atualizar = async function (req, res) {
  try {
    const result = await livrosRetiradosService.atualizar(req.params.id, req.body);
    res.send(result);
  } catch (err) {
    res.status(err.codigo || 500).send(err);
  }
};
exports.devolver = async function (req, res) {
  try {
    const result = await livrosRetiradosService.retirar(req.params.id, req.body);
    res.send(result);
  } catch (err) {
    res.status(err.codigo || 500).send(err);
  }
};
exports.deletar = async function (req, res) {
  try {
    const result = await livrosRetiradosService.deletar(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(err.codigo || 500).send(err);
  }
};
