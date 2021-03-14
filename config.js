require('dotenv').config();

const { JWT_SECRET = 'dev-secret', MONGO_URL = 'mongodb://localhost:27017/moviedb' } = process.env;

const mongoSettings = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = {
  JWT_SECRET,
  MONGO_URL,
  mongoSettings,
};
