/**
 * http://localhost:8080/api/v1/healthcheck/status
 */

const { Router } = require('express')
const { healthCheckAPI } = require('../../../../controllers/api/healthcheckout/status.controller');

const router = Router()

// -------------------------------------------------------------------------------

router.get('/status', healthCheckAPI);

module.exports = router;