const router = require('express').Router();
const controller = require('../controllers/umidadeController');

router.get('/getUmidadeAtual', controller.getUmidadeAtual);
router.get('/getUmidadeHistorico', controller.getUmidadeHistorico);
router.post('/createUmidadeIOT', controller.createUmidadeIOT);

module.exports = router;