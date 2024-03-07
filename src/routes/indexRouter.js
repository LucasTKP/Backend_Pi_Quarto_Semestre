const router = require('express').Router();

const temperaturaRouter = require('./temperaturaRoutes');
const umidadeRouter = require('./umidadeRoutes');
const userRouter = require('./userRoutes');

router.use('/temperatura', temperaturaRouter);
router.use('/umidade', umidadeRouter);
router.use('/user', userRouter);

module.exports= router;