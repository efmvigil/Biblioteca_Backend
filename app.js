const express = require('express');
const app = express();
const PORT = 3200;

const livrosRouter = require('./router/livros_router');
const editorasRouter = require('./router/editoras_router');
const bibliotecariosRouter = require('./router/bibliotecarios_router');
const livrosRetiradosRouter = require('./router/livrosRetirados_router');

app.use(express.json());

app.use('/api/livros', livrosRouter);

app.use('/api/editoras', editorasRouter);

app.use('/api/bibliotecarios', bibliotecariosRouter);

app.use('/api/livrosRetirados', livrosRetiradosRouter);

app.listen(PORT, () => console.log(`Servidor executando na porta ${PORT}`));
