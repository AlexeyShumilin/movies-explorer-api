require('dotenv').config();

const mongoSettings = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
const { MONGO_URL = 'mongodb://localhost:27017/moviedb' } = process.env;

module.exports = {
  PORT: 3000,
  JWT_SECRET: (process.env.NODE_ENV !== 'production') ? 'JWT_SECRET' : process.env.JWT_SECRET,
  MONGO_URL,
  mongoSetting,
};
