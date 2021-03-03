const router = require('express').Router();
const { readMovies, addNewMovie } = require('../../controller/movie.controller');
const { dbHandler } = require('../../db/handler');
const newMovieSchema = require('../../validation/new-movie-schema');

router.get('/', readMovies);
router.post('/', newMovieSchema(dbHandler.getAllGenres()), addNewMovie);

module.exports = router;
