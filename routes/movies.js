const router = require('express').Router();

const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies.js');
const { checkMovieId, checkMovie } = require('../middlewares/validator.js');

router.get('/', getMovies);
router.post('/', checkMovie, createMovie);
router.delete('/:movieId', checkMovieId, deleteMovieById);

module.exports = router;
