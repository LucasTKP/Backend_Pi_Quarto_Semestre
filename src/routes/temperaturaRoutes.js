const router = require('express').Router();
const controller = require('../controllers/temperaturaController');

router.get('/getTemperaturaAtual', controller.getTemperaturaAtual);
router.get('/getTemperaturaHistorico', controller.getTemperaturaHistorico);
router.post('/createTemperaturaIOT', controller.createTemperaturaIOT);


module.exports = router;