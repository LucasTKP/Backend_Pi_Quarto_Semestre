const router = require('express').Router();
const dashboardController = require('../controllers/dashboardController');

const temperaturaRouter = require('./temperaturaRoutes');
const umidadeRouter = require('./umidadeRoutes');
const userRouter = require('./userRoutes');

router.use('/temperatura', temperaturaRouter);
router.use('/umidade', umidadeRouter);
router.use('/user', userRouter);
router.get('/dashboard', dashboardController.getDashboard)
router.get('/analise', dashboardController.getAll)

module.exports= router;