const { validationResult } = require('express-validator');
const { movieReader } = require('../service/movie-reader.service');
const { movieWriter } = require('../service/movie-writer.service');

const readMovies = (req, res) => {
  const duration = parseInt(req.query.duration, 10);
  const genres = req.query.genres
    ? req.query.genres.split(',')
    : undefined;

  if (duration && !genres) {
    return res.status(200).json(movieReader.getSingleRandomMovieInRuntimeRange(duration));
  }

  if (!duration && genres) {
    return res.status(200).json(movieReader.getMoviesWithGenresSortedByNumberOfMatches(genres));
  }

  if (duration && genres) {
    return res.status(200).json(movieReader.getMoviesWithGenresAndInRuntimeRange(genres, duration));
  }

  return res.status(200).json(movieReader.getSingleRandomMovie());
};

const addNewMovie = (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  const newMovie = movieWriter.addNewMovieFromRequest(req);

  return res.status(201).json(newMovie);
};

module.exports = {
  readMovies,
  addNewMovie,
};
