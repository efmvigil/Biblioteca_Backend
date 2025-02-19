const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = 3200;

const livrosRouter = require('./router/livros_router');
const editorasRouter = require('./router/editoras_router');
const bibliotecariosRouter = require('./router/bibliotecarios_router');
const livrosRetiradosRouter = require('./router/livrosRetirados_router');
const autoresRouter = require('./router/autores_router');
const usuariosRouter = require('./router/usuarios_router');
const authRouter = require('./router/auth_router');

app.use(cors());

app.use(express.json());

app.use('/', authRouter);

app.use('/api/livros', livrosRouter);

app.use('/api/editoras', editorasRouter);

app.use('/api/bibliotecarios', bibliotecariosRouter);

app.use('/api/autores', autoresRouter);

app.use('/api/usuarios', usuariosRouter);

app.use('/api/livrosRetirados', livrosRetiradosRouter);

// Servir arquivos estáticos da pasta 'public'
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rota de exemplo para buscar um livro
app.get('/api/livros/:id', async (req, res) => {
  try {
    // Suponha que você esteja pegando os dados do banco
    const livro = await db.query('SELECT * FROM livros WHERE id = $1', [
      req.params.id,
    ]);

    if (livro.rows.length === 0) {
      return res.status(404).json({ msg: 'Livro não encontrado' });
    }

    res.json(livro.rows[0]);
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao buscar livro', error });
  }
});

// Iniciar o servidor

app.listen(PORT, () => console.log(`Servidor executando na porta ${PORT}`));
