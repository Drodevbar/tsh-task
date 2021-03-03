const fs = require('fs');
const config = require('../config');

const getDbContent = () => fs.readFileSync(config.dbFilePath);

const getAllMovies = () => JSON.parse(this.dbHandler.getDbContent()).movies;

const getAllGenres = () => JSON.parse(this.dbHandler.getDbContent()).genres;

const addMovie = (movie) => {
  const dbContent = JSON.parse(this.dbHandler.getDbContent());
  const { movies } = dbContent;
  const newMovieId = movies[movies.length - 1].id + 1;
  const movieToInsert = { id: newMovieId, ...movie };

  movies.push(movieToInsert);
  dbContent.movies = movies;

  fs.writeFileSync(config.dbFilePath, JSON.stringify(dbContent, null, 4));

  return movieToInsert;
};

module.exports.dbHandler = {
  getDbContent,
  getAllMovies,
  getAllGenres,
  addMovie,
};
