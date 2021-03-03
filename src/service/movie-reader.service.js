const { dbHandler } = require('../db/handler');

const getSingleRandomMovie = () => {
  const movies = dbHandler.getAllMovies();

  const randomMovie = movies
    .slice()
    .sort(() => Math.random() - 0.5)
    .shift();

  return [randomMovie];
};

const getSingleRandomMovieInRuntimeRange = (duration, range = 10) => {
  const movies = dbHandler.getAllMovies();

  const randomMovie = movies
    .filter((movie) => {
      const runtime = parseInt(movie.runtime, 10);

      return runtime >= duration - range && runtime <= duration + range;
    })
    .sort(() => Math.random() - 0.5)
    .shift();

  return randomMovie ? [randomMovie] : [];
};

const getMoviesWithGenresSortedByNumberOfMatches = (givenGenres) => {
  const movies = dbHandler.getAllMovies();
  const givenGenresLowerCase = givenGenres.map((genre) => genre.toLowerCase());

  return movies
    .filter((movie) => movie.genres.some((genre) => givenGenresLowerCase.includes(genre.toLowerCase())))
    .sort((movieA, movieB) => {
      const aIntersection = movieA.genres.filter((genre) => givenGenresLowerCase.includes(genre.toLowerCase()));
      const bIntersectiom = movieB.genres.filter((genre) => givenGenresLowerCase.includes(genre.toLowerCase()));

      return bIntersectiom.length - aIntersection.length;
    });
};

const getMoviesWithGenresAndInRuntimeRange = (givenGenres, duration, range = 10) => {
  const moviesWithGenres = this.movieReader.getMoviesWithGenresSortedByNumberOfMatches(givenGenres);

  return moviesWithGenres
    .filter((movie) => {
      const runtime = parseInt(movie.runtime, 10);

      return runtime >= duration - range && runtime <= duration + range;
    });
};

module.exports.movieReader = {
  getSingleRandomMovie,
  getSingleRandomMovieInRuntimeRange,
  getMoviesWithGenresSortedByNumberOfMatches,
  getMoviesWithGenresAndInRuntimeRange,
};
