const authService = require('../service/auth_service');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'chave_secreta';

exports.registrarUsuario = async function (req, res) {
  try {
    const result = await authService.registrarUsuario(req.body);
    res.send(result);
  } catch (err) {
    res.status(err.codigo).send(err);
  }
};

exports.logarUsuario = async function (req, res) {
  try {
    const result = await authService.logarUsuario(req.body);
    res.send(result);
  } catch (err) {
    res.status(err.codigo).send(err);
  }
};

exports.autenticarToken = function (req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user; // Armazena as informações do usuário no objeto req
    next();
  });
};
