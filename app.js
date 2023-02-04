require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { API_PORT } = require('./config');

const app = express();
app.use('*', cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token',
    'authorization',
    'credentials',
  ],
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, }));
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.listen(API_PORT);
