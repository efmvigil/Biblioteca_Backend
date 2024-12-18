const authRepository = require('../repository/auth_repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'chave_secreta';

exports.registrarUsuario = async function (usuario) {
  if (
    usuario &&
    usuario.nome &&
    usuario.matricula &&
    usuario.senha &&
    usuario.email &&
    usuario.telefone
  ) {
    const verificacao = await authRepository.verificarUsuarioExistente(usuario);
    if (verificacao)
      throw {
        status: 'erro',
        codigo: 400,
        msg: 'Já existe uma conta vinculada a este numero de matricula',
      };
    else {
      usuario.senha = await bcrypt.hash(usuario.senha, 10);
      return authRepository.registrarUsuario(usuario);
    }
  } else
    throw {
      status: 'erro',
      codigo: 400,
      msg: 'Usuario com dados incorretos',
    };
};

exports.logarUsuario = async function (login) {
  if (login.matricula && login.senha) {
    const usuario = await authRepository.verificarUsuarioExistente(login);
    if (usuario) {
      const senhaCorreta = await bcrypt.compare(login.senha, usuario.senha);
      if (senhaCorreta) {
        const token = jwt.sign(
          {
            id: usuario.id,
            matricula: usuario.matricula,
          },
          SECRET_KEY,
          { expiresIn: '1h' }
        );
        return { token: token, idUsuario: usuario.id };
      } else
        throw {
          status: 'erro',
          codigo: 401,
          msg: 'Senha incorreta',
        };
    } else
      throw {
        status: 'erro',
        codigo: 404,
        msg: 'Usuário não encontrado',
      };
  } else {
    throw {
      status: 'erro',
      codigo: 400,
      msg: 'Informe a matricula e a senha',
    };
  }
};
