const router = require('express').Router();
// Routes in here are the ones in the api folder
const userRoutes = require('./user-Routes');

router.use('/users', userRoutes);

module.exports = router;