const router = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies.js');
const { checkMovieId, checkMovie } = require('../middlewares/validator.js');

router.get('/', getMovies);
router.post('/', checkMovie, createMovie);
router.delete('/:movieId', checkMovieId, deleteMovie);

module.exports = router;
