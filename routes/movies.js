const router = require('express').Router();

//const { getMovies, createMovie: createMovie, deleteMovieById } = require('../controllers/movies');
const {checkMovieId, checkBodyMovie} = require('../middlewares/validator');

router.get('/', getMovies);
router.post('/', checkBodyMovie, createMovie);
router.delete('/:movieId', checkMovieId, deleteMovieById);

module.exports = router;
