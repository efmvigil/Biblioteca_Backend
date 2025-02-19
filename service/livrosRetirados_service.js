const livrosRetiradosRepository = require('../repository/livrosRetirados_repository');

exports.listar = async function () {
  return await livrosRetiradosRepository.listar();
};

exports.inserir = async function (idLivro, idUsuario) {
  if (idLivro && idUsuario) {
    const verificacao = await livrosRetiradosRepository.verificarLivroRetirado(
      idLivro
    );
    if (verificacao == null || verificacao == '') {
      const livrosRetiradosUsuario =
        await livrosRetiradosRepository.listarLporU(idUsuario);
      if (livrosRetiradosUsuario.length < 3) {
        return await livrosRetiradosRepository.inserir(idLivro, idUsuario);
      } else
        throw {
          status: 'erro',
          codigo: 403,
          msg: 'Não é possível retirar mais de 3 livros ao mesmo tempo',
        };
    } else {
      throw {
        status: 'erro',
        codigo: 409,
        msg: 'Livro indisponivel para retirada',
      };
    }
  } else {
    throw {
      status: 'erro',
      codigo: 400,
      msg: 'Erro ao retirar livro',
    };
  }
};

exports.infos = async function () {
  return await livrosRetiradosRepository.infos();
};

exports.listarLporU = async function (id) {
  return await livrosRetiradosRepository.listarLporU(id);
};

exports.retirar = async function (id, devolvido) {
  if (devolvido) {
    return livrosRetiradosRepository.retirar(id, devolvido);
  } else {
    throw {
      status: 'erro',
      codigo: 400,
      msg: 'Livro retirado inserido com dados incorretos',
      devolvido,
    };
  }
};
exports.buscarPorId = async function (id) {
  const livroRetiradoEncontrado = await livrosRetiradosRepository.buscarPorId(
    id
  );
  if (livroRetiradoEncontrado) return livroRetiradoEncontrado;
  else
    throw {
      status: 'erro',
      codigo: 404,
      msg: 'Livro retirado com este id não existe',
    };
};

exports.atualizar = async function (id, atualizacao) {
  const livroRetiradoEncontrado = await livrosRetiradosRepository.buscarPorId(
    id
  );
  if (livroRetiradoEncontrado) {
    if (atualizacao) {
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
  const livroRetiradoEncontrado = await livrosRetiradosRepository.buscarPorId(
    id
  );
  if (livroRetiradoEncontrado) return livrosRetiradosRepository.deletar(id);
  else
    throw {
      status: 'erro',
      codigo: 404,
      msg: 'Livro retirado com este id não existe',
    };
};
