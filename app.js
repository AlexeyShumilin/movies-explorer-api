require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { corsConfig } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const centralErrorsHandler = require('./middlewares/centralErrorsHandler');
const limiter = require('./middlewares/limiter');

const { PORT = 3000, DB_ADDRESS = 'mongodb://localhost:27017/movies-explorer' } = process.env;
const app = express();

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('*', cors(corsConfig));
app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errors());
app.use(errorLogger);
app.use(centralErrorsHandler);

app.listen(PORT, () => {
  console.log(`Start server on port ${PORT}`);
});
