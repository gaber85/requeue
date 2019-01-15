const router = require('koa-router')();
const controller = require('./controller.js');

router.get('/login', controller.login);
router.get('/callback', controller.callback);
router.get('/createSession/:id', controller.createSession);
router.get('/search/:item', controller.search);
router.put('/add/:id/:playlistId', controller.addToPlaylist);
router.delete('/remove/:songId/:playlistId', controller.removeSong);
router.get('/playlist/:playlistId', controller.getPlaylist);

module.exports = router;
