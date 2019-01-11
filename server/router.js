const router = require('koa-router')();
const controller = require('./controller.js');
require('dotenv').config();

router.get('/login', controller.login);
router.get('/callback', controller.callback);
router.get('/test', controller.test);

module.exports = router;
