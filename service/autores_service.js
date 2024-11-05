const autoresRepository = require('../repository/autores_repository');

exports.listar = async function () {
  return await autoresRepository.listar();
};

exports.inserir = async function (autor) {
  if (autor) {
    return autoresRepository.inserir(autor);
  } else {
    throw {
      status: 'erro',
      codigo: 400,
      msg: 'Autor inserido com dados incorretos',
      tipo: typeof autor
    };
  }
};

exports.buscarPorId = async function (id) {
  const autorEncontrado = await autoresRepository.buscarPorId(id);
  if (autorEncontrado) return autorEncontrado;
  else
    throw {
      status: 'erro',
      codigo: 404,
      msg: 'Autor com este id não existe',
    };
};

exports.atualizar = async function (id, atualizacao) {
  const autorEncontrado = await autoresRepository.buscarPorId(id);
  if (autorEncontrado) {
    if (atualizacao || atualizacao.nome || atualizacao.nacionalidade) {
      return autoresRepository.atualizar(id, atualizacao);
    } else {
      throw {
        status: 'erro',
        codigo: 400,
        msg: 'Autor atualizado com dados incorretos',
      };
    }
  } else
    throw {
      status: 'erro',
      codigo: 404,
      msg: 'Autor com este id não existe',
    };
};

exports.deletar = async function (id) {
  const autorEncontrado = await autoresRepository.buscarPorId(id);
  if (autorEncontrado) return autoresRepository.deletar(id);
  else
    throw {
      status: 'erro',
      codigo: 404,
      msg: 'Autor com este id não existe',
    };
};
