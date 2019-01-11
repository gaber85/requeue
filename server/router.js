const router = require('koa-router')();
const controller = require('./controller.js');

router.get('/login', controller.login);
router.get('/callback', controller.callback);
router.get('/test', controller.test);

module.exports = router;
