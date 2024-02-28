const router = require('express').Router();

const temperaturaRouter = require('./temperaturaRoutes');
const umidadeRouter = require('./umidadeRoutes');

router.use('/temperatura', temperaturaRouter);
router.use('/umidade', umidadeRouter);

module.exports= router;