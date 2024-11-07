const livrosRetiradosRepository = require('../repository/livrosRetirados_repository');

exports.listar = async function () {
  return await livrosRetiradosRepository.listar();
};

exports.inserir = async function (livroRetirado) {
  if (livroRetirado) {
    return livrosRetiradosRepository.inserir(livroRetirado);
  } else {
    throw {
      status: 'erro',
      codigo: 400,
      msg: 'Livro retirado inserido com dados incorretos',livroRetirado
    };
  }
};
exports.infos = async function () {
  return await livrosRetiradosRepository.infos();
};

exports.listarLporU = async function () {
  return await livrosRetiradosRepository.listarLporU();
};

exports.retirar = async function (id,devolvido) {
  if (devolvido) {
    return livrosRetiradosRepository.retirar(id,devolvido);
  } else {
    throw {
      status: 'erro',
      codigo: 400,
      msg: 'Livro retirado inserido com dados incorretos',devolvido
    };
  }
};
exports.buscarPorId = async function (id) {
  const livroRetiradoEncontrado = await livrosRetiradosRepository.buscarPorId(id);
  if (livroRetiradoEncontrado) return livroRetiradoEncontrado;
  else
    throw {
      status: 'erro',
      codigo: 404,
      msg: 'Livro retirado com este id não existe',
    };
};

exports.atualizar = async function (id, atualizacao) {
  const livroRetiradoEncontrado = await livrosRetiradosRepository.buscarPorId(id);
  if (livroRetiradoEncontrado) {
    if (atualizacao ) {
      return livrosRetiradosRepository.atualizar(id, atualizacao);
    } else {
      throw {
        status: 'erro',
        codigo: 400,
        msg: 'Livro retirado inserido com dados incorretos',
      };
    }
  } else
    throw {
      status: 'erro',
      codigo: 404,
      msg: 'Livro retirado com este id não existe',
    };
};

exports.deletar = async function (id) {
  const livroRetiradoEncontrado = await livrosRetiradosRepository.buscarPorId(id);
  if (livroRetiradoEncontrado) return livrosRetiradosRepository.deletar(id);
  else
    throw {
      status: 'erro',
      codigo: 404,
      msg: 'Livro retirado com este id não existe',
    };
};

