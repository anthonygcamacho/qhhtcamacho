const { Router } = require('express')

const { notFoundPage } = require('../../controllers/pages/404.controller')
const { homePage } = require('../../controllers/pages/home.controller')
const { privacyPage } = require('../../controllers/pages/privacy.controller')
const { tosPage } = require('../../controllers/pages/tos.controller')
const { sitemapPage } = require('../../controllers/pages/sitemap.controller')

const router = Router()

router.get('/', homePage)
router.get('/privacy-policy', privacyPage)
router.get('/terms-of-service', tosPage)
router.get('/sitemap.xml', sitemapPage)

router.get('*', notFoundPage)

module.exports = router
