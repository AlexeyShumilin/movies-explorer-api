const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');

const helmet = require('helmet');
const bodyParser = require('body-parser');
const { corsConfig } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const centralErrorsHandler = require('./middlewares/centralErrorsHandler');
const limiter = require('./middlewares/limiter');

const { MONGO_URL, mongoSettings } = require('./config');

const { PORT = 3000 } = process.env;

const app = express();
app.use('*', cors(corsConfig));
app.use(helmet());

mongoose.connect(MONGO_URL, mongoSettings);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(requestLogger);
app.use(limiter);

app.use(router);

app.use(errors());
app.use(errorLogger);
app.use(centralErrorsHandler);

app.listen(PORT);
