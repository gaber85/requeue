const Koa = require('koa');
const app = new Koa;
const PORT = process.env.PORT || 3001;

const bodyParser = require('koa-bodyparser');
const router = require('./router.js');
const cors = require('@koa/cors');
require('./model'); //requires the database

app.use(cors({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
}));
app.use(bodyParser());
app.use(router.routes());

app.listen(PORT, () => console.log( // eslint-disable-line no-console
  `Server running on port: ${PORT}`));