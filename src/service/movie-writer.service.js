const { dbHandler } = require('../db/handler');

const addNewMovieFromRequest = (req) => {
  const moviePayload = req.body;

  return dbHandler.addMovie(moviePayload);
};

module.exports.movieWriter = {
  addNewMovieFromRequest,
};
