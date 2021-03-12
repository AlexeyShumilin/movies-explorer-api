const Movie = require('../models/movie.js');
const BadRequestError = require('../errors/badrequest');
const NotFoundError = require('../errors/notfounderr');

const createMovie = (req, res, next) => {
  const {
    country,
    year,
    director,
    duration,
    trailer,
    description,
    image,
    movieId,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    year,
    director,
    duration,
    image,
    trailer,
    description,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(200).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Data not valid');
      }
    })
    .catch(next);
};

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie || movie.owner.toString() !== req.user._id) {
        throw new NotFoundError('The user does not have such a movie');
      }
      Movie.findByIdAndDelete(req.params.movieId)
        .then(() => {
          res.send({ message: 'Movie deleted' });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Data not valid');
      }
      throw err;
    })
    .catch(next);
};

module.exports = { createMovie, getMovies, deleteMovie };
