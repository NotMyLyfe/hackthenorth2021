const router = require('express').Router();
const config = require('./api/config');

router.use('/config', config);

module.exports = router;