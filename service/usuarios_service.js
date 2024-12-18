const usuariosRepository = require('../repository/usuarios_repository');
const bcrypt = require('bcrypt');

// Listar todos os usuários
exports.listar = async function () {
  return await usuariosRepository.listar();
};

// Inserir um novo usuário
exports.inserir = async function (usuario) {
  if (
    usuario &&
    usuario.nome &&
    usuario.matricula &&
    usuario.senha &&
    usuario.email &&
    usuario.telefone
  ) {
    return usuariosRepository.inserir(usuario);
  } else {
    throw {
      status: 'erro',
      codigo: 400,
      msg: 'Usuário inserido com dados incorretos',
    };
  }
};

// Buscar usuário por ID
exports.buscarPorId = async function (id) {
  const usuarioEncontrado = await usuariosRepository.buscarPorId(id);
  if (usuarioEncontrado) return usuarioEncontrado;
  else
    throw {
      status: 'erro',
      codigo: 404,
      msg: 'Usuário com este ID não existe',
    };
};

// Atualizar usuário
exports.atualizar = async function (id, atualizacao) {
  const usuarioEncontrado = await usuariosRepository.buscarPorId(id);
  if (usuarioEncontrado) {
    if (
      atualizacao &&
      atualizacao.nome &&
      atualizacao.matricula &&
      atualizacao.senha &&
      atualizacao.email &&
      atualizacao.telefone
    ) {
      atualizacao.senha = await bcrypt.hash(atualizacao.senha, 10);
      return await usuariosRepository.atualizar(id, atualizacao);
    } else {
      throw {
        status: 'erro',
        codigo: 400,
        msg: 'Dados incorretos para atualização do usuário',
      };
    }
  } else
    throw {
      status: 'erro',
      codigo: 404,
      msg: 'Usuário com este ID não existe',
    };
};

// Deletar (marcar como deletado) usuário
exports.deletar = async function (id) {
  const usuarioEncontrado = await usuariosRepository.buscarPorId(id);
  if (usuarioEncontrado) return usuariosRepository.deletar(id);
  else
    throw {
      status: 'erro',
      codigo: 404,
      msg: 'Usuário com este ID não existe',
    };
};
