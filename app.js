const express = require('express');
const app = express();

const livrosRouter = require('./router/livros_router');
const PORT = 3200;

app.use(express.json());

app.use('/api/livros', livrosRouter);

app.listen(PORT, () => console.log(`Servidor executando na porta ${PORT}`));
