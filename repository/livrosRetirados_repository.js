const client = require('./database');

// Função para converter data do formato YYYY-MM-DD para DD/MM/YYYY
function dataBr(dateStr) {
  const [ano, mes, dia] = dateStr.split('-');
  return `${dia}/${mes}/${ano}`;
}
function dataEua(data) {
  const [dia, mes, ano] = data.split('/');
  return `${ano}/${mes}/${dia}`;
}
function dataBanco(data) {
  const [dia, mes, ano] = data.split('/');
  return `${ano}-${mes}-${dia}`;
}
function CalcMulta(dataDevolucao, dataDevolvido) {
  const multaPorDia = 0.5;

  const timeDevolucao = dataDevolucao.getTime();
  const timeDevolvido = dataDevolvido.getTime();

  const diferencaDias = Math.ceil(
    (timeDevolvido - timeDevolucao) / (1000 * 60 * 60 * 24)
  );

  return diferencaDias > 0 ? diferencaDias * multaPorDia : 0.0;
}

exports.listar = async function () {
  try {
    const res = await client.query(`
        SELECT r.id, l.titulo, a.nome AS autor, u.nome AS usuario, r.data_retirada, r.data_devolucao, r.multa
FROM livros_retirados AS r, livros AS l,  usuarios AS u, autores AS a
WHERE u.id = r.usuario AND r.livro = l.id AND l.autor = a.id
    `);
    const formattedRows = res.rows.map((row) => ({
      ...row,
      data_retirada: row.data_retirada
        ? dataBr(row.data_retirada.toISOString().split('T')[0])
        : null,
      data_devolucao: row.data_devolucao
        ? dataBr(row.data_devolucao.toISOString().split('T')[0])
        : null,
      data_devolvido: row.data_devolvido
        ? dataBr(row.data_devolvido.toISOString().split('T')[0])
        : null,
    }));

    return formattedRows;
  } catch (err) {
    throw {
      status: 'erro',
      codigo: 500,
      msg: 'Falha na consulta de dados',
    };
  }
};

exports.inserir = async function (idLivro, idUsuario) {
  try {
    const data_retirada = new Date();
    const data_devolucao = new Date(data_retirada);
    data_devolucao.setDate(data_devolucao.getDate() + 15);
    const data_devolvido = null;
    const res = await client.query(
      'INSERT INTO livros_retirados (livro, usuario, data_retirada, data_devolucao, data_devolvido, multa) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [idLivro, idUsuario, data_retirada, data_devolucao, data_devolvido, 0]
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

exports.retirar = async function (id, devolvido) {
  try {
    const res = await client.query(
      'SELECT data_retirada, data_devolucao, data_devolvido FROM livros_retirados WHERE id = $1',
      [id]
    );
    const registro = res.rows[0];

    if (!registro) {
      throw {
        status: 'erro',
        codigo: 404,
        msg: 'Registro de retirada não encontrado',
      };
    } else if (registro.data_devolvido !== null) {
      throw {
        status: 'info',
        codigo: 104,
        msg: 'Registro já possui Data de Devolução',
      };
    }

    dataDevolvido = dataBanco(devolvido.data_devolvido);
    const dataDevolucao = registro.data_devolucao.toISOString().split('T')[0];
    // Calcular a multa
    const multa = dataDevolvido
      ? CalcMulta(new Date(dataDevolucao), new Date(dataDevolvido))
      : 0.0;

    const resAtualizado = await client.query(
      'UPDATE livros_retirados SET data_devolvido = $1, multa = $2 WHERE id = $3 RETURNING *',
      [devolvido.data_devolvido || null, multa, id]
    );

    return resAtualizado.rows[0];
  } catch (err) {
    // Lançar erro detalhado
    throw err.status
      ? err
      : {
          status: 'erro',
          codigo: 500,
          msg: `Falha na atualização de dados: ${err.message}`,
        };
  }
};

exports.infos = async function () {
  try {
    const res = await client.query(`
      SELECT 
        u.Nome AS Nome_Usuario,
        u.Matricula,
        l.Titulo AS Nome_Livro,
        lr.data_devolvido AS Devolvido
      FROM 
        Livros_Retirados lr
      JOIN 
        Usuarios u ON lr.Usuario = u.ID
      JOIN 
        Livros l ON lr.Livro = l.ID;
    `);

    return res.rows;
  } catch (err) {
    console.error('Erro na consulta de livros retirados:', err);
    throw {
      status: 'erro',
      codigo: 500,
      msg: 'Falha na consulta de dados',
    };
  }
};

exports.listarLporU = async function (id) {
  try {
    const res = await client.query(
      `
    SELECT 
    u.Nome AS Nome_Usuario,
    u.Matricula,
    lr.id,
    l.Titulo AS Nome_Livro,
    l.imagem as imagem,
    lr.data_devolvido AS Devolvido
    FROM 
      Livros_Retirados lr
    JOIN 
      Usuarios u ON lr.Usuario = u.ID
    JOIN 
      Livros l ON lr.Livro = l.ID
    where u.id = $1 
      `,
      [id]
    );

    return res.rows;
  } catch (err) {
    console.error('Erro na consulta de livros retirados:', err);
    throw {
      status: 'erro',
      codigo: 500,
      msg: 'Falha na consulta de dados',
    };
  }
};

exports.buscarPorId = async function (id) {
  try {
    const res = await client.query(
      'SELECT * FROM livros_retirados WHERE id = $1',
      [id]
    );
    if (res.rows[0]) {
      const row = res.rows[0];
      return {
        ...row,
        data_retirada: row.data_retirada
          ? dataBr(row.data_retirada.toISOString().split('T')[0])
          : null,
        data_devolucao: row.data_devolucao
          ? dataBr(row.data_devolucao.toISOString().split('T')[0])
          : null,
        data_devolvido: row.data_devolvido
          ? dataBr(row.data_devolvido.toISOString().split('T')[0])
          : null,
      };
    } else {
      return null;
    }
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
    if (obj.data_retirada) {
      obj.data_retirada = dataEua(obj.data_retirada);
    }

    if (obj.data_devolucao) {
      obj.data_devolucao = dataEua(obj.data_devolucao);
    }
    if (obj.data_devolvido) {
      obj.data_devolvido = dataEua(obj.data_devolvido);
    }

    const res = await client.query(
      'UPDATE livros_retirados SET Livro = $1, Usuario = $2, Data_Retirada = $3, Data_Devolucao = $4, Data_Devolvido = $5, Multa = $6 WHERE id = $7 RETURNING *',
      [...Object.values(obj), id]
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
      'DELETE FROM livros_retirados WHERE id = $1 RETURNING *',
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

exports.verificarLivroRetirado = async function (id) {
  try {
    const res = await client.query(
      'SELECT * FROM livros WHERE id = $1 AND id IN (SELECT livro from livros_retirados)',
      [id]
    );
    console.log();
    return res.rows;
  } catch (err) {
    throw {
      status: 'erro',
      codigo: 500,
      msg: 'Falha na consulta de dadosss',
      idd: id,
    };
  }
};
