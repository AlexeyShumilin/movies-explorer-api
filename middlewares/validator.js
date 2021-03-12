const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const mongoose = require('mongoose');

const checkMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': 'country must be filled ',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'director must be filled ',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'duration must be filled ',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'year must be filled ',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'description must be filled ',
      }),
    image: Joi.string().required()
      .messages({
        'any.required': 'image must be filled ',
      })
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('incorrect link');
      }),
    trailer: Joi.string().required()
      .messages({
        'any.required': 'trailer must be filled ',
      })
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('incorrect link');
      }),
    thumbnail: Joi.string().required()
      .messages({
        'any.required': 'thumbnail must be filled ',
      })
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('incorrect link');
      }),
    movieId: Joi.number().required()
      .messages({
        'any.required': 'movieId must be filled ',
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'nameRU must be filled ',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'nameEN must be filled ',
      }),
  }),
});

const checkMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24).custom((value, helpers) => {
      if (mongoose.Types.ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Incorrect id');
    }),
  }),
});

const checkUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'must be longer than 2 characters ',
        'string.max': 'must be longer than 30 characters',
        'any.required': 'must be filled',
      }),
    email: Joi.string().required()
      .email().message('Incorrect email')
      .messages({
        'any.required': 'email must be filled',
      }),
  }),
});

const checkSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'must be longer than 2 characters',
        'string.max': 'must be longer than 30 characters',
        'any.required': 'name must be filled',
      }),
    email: Joi.string().required()
      .email().message('incorrect email')
      .messages({
        'any.required': 'email must be filled',
      }),
    password: Joi.string().required().min(5)
      .messages({
        'string.min': 'password must be longer than 5 characters',
        'any.required': 'password must be filled',
      }),
  }),
});

const checkSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required()
      .email().message('Incorrect email')
      .messages({
        'any.required': 'email must be filled',
      }),
    password: Joi.string().required().min(5)
      .messages({
        'string.min': 'password must be longer than 5 characters',
        'any.required': 'password must be filled',
      }),
  }),
});

module.exports = {
  checkMovieId, checkUser, checkMovie, checkSignup, checkSignIn,
};
