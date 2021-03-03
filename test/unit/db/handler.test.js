const fs = require('fs');
const { dbHandler } = require('../../../src/db/handler');

dbHandler.getDbContent = jest.fn();
fs.writeFileSync = jest.fn();

describe('[db/handler]', () => {
  let genres;
  let movies;

  beforeEach(() => {
    genres = ['Foo', 'Bar', 'Baz'];
    movies = [{ id: 1 }, { id: 2 }, { id: 3 }];
    dbHandler.getDbContent.mockReturnValue(JSON.stringify({ genres, movies }));
  });

  describe('getAllMovies', () => {
    it('should return parsed JSON with movies', () => {
      expect(dbHandler.getAllMovies()).toStrictEqual(movies);
    });
  });

  describe('getAllGenres', () => {
    it('should return parsed JSON with genres', () => {
      expect(dbHandler.getAllGenres()).toStrictEqual(genres);
    });
  });

  describe('addMovie', () => {
    it('should call fs.writeFileSync() with collection of movies containing new entry and return new entry', () => {
      const newMovie = { title: 'Goodfellas' };
      const updatedMoviesJson = [...movies, { id: 4, ...newMovie }];
      const expectedMoviesJsonString = JSON.stringify({ genres, movies: updatedMoviesJson }, null, 4);

      const result = dbHandler.addMovie(newMovie);

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        'db-file-path-test',
        expectedMoviesJsonString,
      );
      expect(result).toStrictEqual({ id: 4, ...newMovie });
    });
  });
});
