const router = require('express').Router();
const controller = require('../controllers/temperaturaController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/getTemperaturaAtual', authMiddleware, controller.getTemperaturaAtual);
router.get('/getTemperaturaHistorico', authMiddleware, controller.getTemperaturaHistorico);
router.post('/createTemperaturaIOT', controller.createTemperaturaIOT);


module.exports = router;