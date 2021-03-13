module.exports.corsConfig = {
  origin: [
    'https://shdiplom.students.nomoredomains.icu',
    'http://shdiplom.students.nomoredomains.icu',
    'https://www.shdiplom.students.nomoredomains.icu',
    'http://www.shdiplom.students.nomoredomains.icu',
    'http://localhost:3000',
    'https://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Origin', 'Referer', 'Accept', 'Authorization'],
  credentials: true,
};
