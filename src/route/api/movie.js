const router = require('express').Router();
const { readMovies, addNewMovie } = require('../../controller/movie.controller');
const newMovieSchema = require('../../validation/new-movie-schema');

router.get('/', readMovies);
router.post('/', newMovieSchema, addNewMovie);

module.exports = router;
