const livrosRetiradosRepository = require('../repository/livrosRetirados_repository');

exports.listar = async function () {
  return await livrosRetiradosRepository.listar();
};

exports.inserir = async function (livroRetirado) {
  if (
    livroRetirado.livro &&
    livroRetirado.usuario &&
    livroRetirado.data_retirada &&
    livroRetirado.data_devolucao &&
    livroRetirado.data_devolvido &&
    livroRetirado.multa) {
    return livrosRetiradosRepository.inserir(livroRetirado);
  } else {
    console.log('teste',livroRetirado)
    throw {
      status: 'erro',
      codigo: 400,
      msg: 'Livro retirado inserido com dados incorretos',livroRetirado
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
    if (
      atualizacao &&
      atualizacao.Livro &&
      atualizacao.Usuario &&
      atualizacao.Data_Retirada &&
      atualizacao.Data_Devolucao &&
      atualizacao.Data_Devolvido &&
      atualizacao.Multa !== undefined
    ) {
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

