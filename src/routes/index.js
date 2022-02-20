const { Router } = require('express');
const pages = require('./pages');
const apiRoutesV1 = require('./api/v1');
// const data = require('./data')

const router = Router();

router.use('/api/v1', apiRoutesV1);
router.use('/', pages);

module.exports = router;