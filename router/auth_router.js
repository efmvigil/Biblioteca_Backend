const express = require('express');
const authController = require('../controller/auth_controller');
const router = express.Router();

router.post('/registrar', authController.registrarUsuario);

router.post('/login', authController.logarUsuario);

/*
router.get('/recurso-protegido', authController.autenticarToken, (req, res) => {
  res.json({ message: 'Acesso permitido', user: req.user });
});
*/
module.exports = router;
