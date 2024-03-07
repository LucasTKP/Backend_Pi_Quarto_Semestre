const router = require('express').Router();
const controller = require('../controllers/umidadeController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/getUmidadeAtual', authMiddleware, controller.getUmidadeAtual);
router.get('/getUmidadeHistorico', authMiddleware, controller.getUmidadeHistorico);
router.post('/createUmidadeIOT', controller.createUmidadeIOT);

module.exports = router;