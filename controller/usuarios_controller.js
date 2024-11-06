const usuariosService = require('../service/usuarios_service');

exports.listar = async function (req, res) {
  try {
    const result = await usuariosService.listar();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.inserir = async function (req, res) {
  try {
    const result = await usuariosService.inserir(req.body);
    res.status(201).send(result);
  } catch (err) {
    res.status(err.codigo).send(err);
  }
};

exports.buscarPorId = async function (req, res) {
  try {
    const result = await usuariosService.buscarPorId(req.id);
    res.send(result);
  } catch (err) {
    res.status(err.codigo).send(err);
  }
};

exports.atualizar = async function (req, res) {
  try {
    const result = await usuariosService.atualizar(req.id, req.body);
    res.send(result);
  } catch (err) {
    res.status(err.codigo).send(err);
  }
};

exports.deletar = async function (req, res) {
  try {
    const result = await usuariosService.deletar(req.id);
    res.send(result);
  } catch (err) {
    res.status(err.codigo).send(err);
  }
};
