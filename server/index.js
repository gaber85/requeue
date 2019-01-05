const Koa = require('koa');
const app = new Koa;
const PORT = 3000;

const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

app.use(cors({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
}));

app.listen(PORT, () => console.log( // eslint-disable-line no-console
  `Server running on port: ${PORT}`));