const { Router } = require('express')
const healthcheck = require('./healthcheck')

const router = Router()

router.use('/healthcheck', healthcheck);

module.exports = router