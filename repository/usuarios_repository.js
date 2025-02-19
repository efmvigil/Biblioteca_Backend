const client = require('./database');

// Listar todos os usuários
exports.listar = async function () {
  try {
    const res = await client.query('SELECT * FROM usuarios');

    return res.rows;
  } catch (err) {
    throw {
      status: 'erro',
      codigo: 500,
      msg: 'Falha na consulta de dados',
    };
  }
};

// Inserir novo usuário
exports.inserir = async function (obj) {
  try {
    const res = await client.query(
      'INSERT INTO usuarios (nome, matricula, senha, email, telefone, d_e_l_e_t_e) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *',
      [obj.nome, obj.matricula, obj.senha, obj.email, obj.telefone, false]
    );
    return res.rows[0];
  } catch (err) {
    throw {
      status: 'erro',
      codigo: 500,
      msg: 'Falha na inserção de dados',
    };
  }
};

// Buscar usuário por ID
exports.buscarPorId = async function (id) {
  try {
    const res = await client.query('SELECT * FROM usuarios WHERE id = $1', [
      id,
    ]);
    return res.rows[0];
  } catch (err) {
    throw {
      status: 'erro',
      codigo: 500,
      msg: 'Falha na consulta de dados',
    };
  }
};

// Atualizar usuário
exports.atualizar = async function (id, obj) {
  try {
    const res = await client.query(
      'UPDATE usuarios SET nome = $1, matricula = $2, senha = $3, email = $4, telefone = $5 WHERE id = $6 RETURNING *',
      [obj.nome, obj.matricula, obj.senha, obj.email, obj.telefone, id]
    );
    return res.rows[0];
  } catch (err) {
    throw {
      status: 'erro',
      codigo: 500,
      msg: 'Falha na atualização de dados',
    };
  }
};

// "Deletar" usuário (marcar como deletado)
exports.deletar = async function (id) {
  try {
    const res = await client.query(
      'UPDATE usuarios SET d_e_l_e_t_e = true WHERE id = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  } catch (err) {
    throw {
      status: 'erro',
      codigo: 500,
      msg: 'Falha na remoção de dados',
    };
  }
};
