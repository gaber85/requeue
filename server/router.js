const router = require('koa-router')();
const controller = require('./controller.js');

router.get('/login', controller.login);

module.exports = router;
