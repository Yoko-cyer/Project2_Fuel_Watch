const router = require('express').Router();

const landingRoutes = require('./landing-routes');
const loggedInRoutes = require('./loggedIn-routes');

router.use('/users', landingRoutes);
router.use('/loggedIn', loggedInRoutes);

module.exports = router;