const { validationResult } = require('express-validator');
const { addNewMovie, readMovies } = require('../../../src/controller/movie.controller');
const { movieReader } = require('../../../src/service/movie-reader.service');
const { movieWriter } = require('../../../src/service/movie-writer.service');

movieReader.getSingleRandomMovieInRuntimeRange = jest.fn();
movieReader.getMoviesWithGenresSortedByNumberOfMatches = jest.fn();
movieReader.getMoviesWithGenresAndInRuntimeRange = jest.fn();
movieReader.getSingleRandomMovie = jest.fn();
movieWriter.addNewMovieFromRequest = jest.fn();

jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

describe('[controller/movie-controller]', () => {
  const responseMock = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  describe('readMovies', () => {
    const movies = [{ id: 1 }];

    beforeEach(() => {
      movieReader.getSingleRandomMovieInRuntimeRange.mockReturnValue(movies);
      movieReader.getMoviesWithGenresSortedByNumberOfMatches.mockReturnValue(movies);
      movieReader.getMoviesWithGenresAndInRuntimeRange.mockReturnValue(movies);
      movieReader.getSingleRandomMovie.mockReturnValue(movies);
    });

    afterEach(() => {
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.json).toHaveBeenCalledWith(movies);
    });

    it('should call getSingleRandomMovieInRuntimeRange() when only duration was provided', () => {
      const request = { query: { duration: 10 } };

      readMovies(request, responseMock);

      expect(movieReader.getSingleRandomMovieInRuntimeRange).toHaveBeenCalledWith(10);
    });

    it('should call getMoviesWithGenresSortedByNumberOfMatches() when only genres were provided', () => {
      const request = { query: { genres: 'Foo,Bar' } };

      readMovies(request, responseMock);

      expect(movieReader.getMoviesWithGenresSortedByNumberOfMatches).toHaveBeenCalledWith(['Foo', 'Bar']);
    });

    it('should call getMoviesWithGenresAndInRuntimeRange() when both duration & genres were provided', () => {
      const request = { query: { genres: 'Foo,Bar', duration: 10 } };

      readMovies(request, responseMock);

      expect(movieReader.getMoviesWithGenresAndInRuntimeRange).toHaveBeenCalledWith(['Foo', 'Bar'], 10);
    });

    it('should call getSingleRandomMovie() when nothing was provided', () => {
      const request = { query: {} };

      readMovies(request, responseMock);

      expect(movieReader.getSingleRandomMovie).toHaveBeenCalledWith();
    });
  });

  describe('addNewMovie', () => {
    const newMovie = { id: 1 };
    const request = { body: { title: 'Goodfellas' } };

    beforeEach(() => {
      movieWriter.addNewMovieFromRequest.mockReturnValue(newMovie);
    });

    it('should call addNewMovieFromRequest() and return status 201 with new movie when validation passed', () => {
      validationResult.mockImplementation(() => ({
        isEmpty: () => true,
      }));

      addNewMovie(request, responseMock);

      expect(movieWriter.addNewMovieFromRequest).toHaveBeenCalledWith(request);
      expect(responseMock.status).toHaveBeenCalledWith(201);
      expect(responseMock.json).toHaveBeenCalledWith(newMovie);
    });

    it('should return status 400 with errors when validation failed', () => {
      validationResult.mockImplementation(() => ({
        isEmpty: () => false,
        array: () => ['array of errors'],
      }));

      addNewMovie(request, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(responseMock.json).toHaveBeenCalledWith({ errors: ['array of errors'] });
    });
  });
});
