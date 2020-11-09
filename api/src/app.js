const express = require('express');
const bodyParser = require('body-parser');
const bunyan = require('bunyan');
const cors = require('cors');
const app = express();

const routes = require('./routes');
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const log = bunyan.createLogger({
  name: 'api-test',
  stream: process.stdout,
  level: 'info'
});

app.use((req, res, next) => {
  req.$scope = {};
  req.log = log;
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

app.listen(PORT, () => {
  log.info(`Server is listening on port: ${PORT}`);
});