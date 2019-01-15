const router = require('koa-router')();
const controller = require('./controller.js');

router.get('/login', controller.login);
router.get('/callback', controller.callback);
router.get('/createSession/:id', controller.createSession);
router.get('/search/:item', controller.search);

module.exports = router;
