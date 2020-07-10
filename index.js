require('dotenv').config();
const express = require('express');
const config = require('./config');
const { connection } = require('./database');
const { carsRouter, crashRouter } = require('./routers');
const { HttpError } = require('./HttpError');
const { errorHandler } = require('./error-handler');

const app = express();

async function main() {
  await connection.init();

  app.use(express.json());

  app.use('/cars', carsRouter);
  app.use('/crashes', crashRouter);

  app.use(errorHandler());

  app.listen(config.server.port, err => {
    err ? console.error(err) : console.info(`Server started at ${config.server.port}`);
  });
}

main().catch(console.error);
