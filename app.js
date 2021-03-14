const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/centralErrorsHandler.js');
const limiter = require('./middlewares/limiter.js');

const { MONGO_URL, mongoSetting } = require('./config');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());
app.use(helmet());

mongoose.connect(MONGO_URL, mongoSetting);

app.use(requestLogger);
app.use(limiter);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Start server on port ${PORT}`);
});
