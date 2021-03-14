const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
const NotFoundError = require('../errors/notfounderr');
const ConflictError = require('../errors/conflicterr');
const BadRequestError = require('../errors/badrequest.js');

const { JWT_SECRET } = require('../config');

const getUsers = (req, res, next) => {
  userModel.find({})
    .then((data) => res.status(200).send(data))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  userModel.findById(userId)
    .orFail(() => {
      throw new NotFoundError('wrong id');
    })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.kind === 'ObjectId' || err.kind === 'CastError') {
        throw new BadRequestError('Data not valid');
      } else {
        next(err);
      }
    });
};

const updateCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;
  if (!email || !name) {
    throw new BadRequestError('Data not valid');
  }
  userModel.findByIdAndUpdate(userId, { email, name }, { new: true })
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.kind === 'ObjectId' || err.kind === 'CastError') {
        next(new BadRequestError('Data not valid'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  if (!email || !password || !name) {
    throw new BadRequestError('Data not valid');
  }

  bcrypt.hash(password, 10)
    .then((hash) => {
      userModel.create({ email, name, password: hash })
        .then((data) => {
          res.status(200).send({ email: data.email, name: data.name });
        })
        .catch((err) => {
          if (err.name === 'MongoError' && err.code === 11000) {
            throw new ConflictError('email is already registered');
          }
          if (err.kind === 'ObjectId' || err.kind === 'CastError') {
            throw new BadRequestError('Data not valid');
          } else {
            next(err);
          }
        })
        .catch(next);
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUsers, getCurrentUser, updateCurrentUser, createUser, loginUser,
};
