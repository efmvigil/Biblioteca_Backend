const client = require('./database');

exports.listar = async function () {
  try {
    const res = await client.query('SELECT * FROM autores');
    return res.rows;
  } catch (err) {
    throw {
      status: 'erro',
      codigo: 500,
      msg: 'Falha na consulta de dados',
    };
  }
};

exports.inserir = async function (obj) {
  try {
    const res = await client.query(
      'INSERT INTO autores (nome, nacionalidade) VALUES ($1, $2) RETURNING *',
      [obj.nome, obj.nacionalidade] 
    );
    return res.rows;
  } catch (err) {
    throw {
      status: 'erro',
      codigo: 500,
      msg: 'Falha na inserção de dados',
    };
  }
};

exports.buscarPorId = async function (id) {
  try {
    const res = await client.query('SELECT * FROM autores WHERE id = $1', [id]);
    return res.rows[0];
  } catch (err) {
    throw {
      status: 'erro',
      codigo: 500,
      msg: 'Falha na consulta de dados',
    };
  }
};

exports.atualizar = async function (id, obj) {
  try {
    const res = await client.query(
      'UPDATE autores SET nome = $1, nacionalidade = $2 WHERE id = $3 RETURNING *',
      [obj.nome, obj.nacionalidade, id]
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

exports.deletar = async function (id) {
  try {
    const res = await client.query(
      'DELETE FROM autores WHERE id = $1 RETURNING *',
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