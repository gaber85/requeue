const router = require('koa-router')();
const controller = require('./controller.js');

router.get('/test', controller.test);

module.exports = router;
