const { dbHandler } = require('../../../src/db/handler');
const { movieWriter } = require('../../../src/service/movie-writer.service');

dbHandler.addMovie = jest.fn();

describe('[service/movie-writer]', () => {
  describe('addNewMovieFromRequest', () => {
    let addedMovie;

    beforeEach(() => {
      addedMovie = { id: 1 };
      dbHandler.addMovie.mockReturnValue(addedMovie);
    });

    it('should call dbHandler.addMovie() with request body and return new entry', () => {
      const request = {
        body: { title: 'Goodfellas' },
      };

      const result = movieWriter.addNewMovieFromRequest(request);

      expect(dbHandler.addMovie).toHaveBeenCalledWith(request.body);
      expect(result).toStrictEqual(addedMovie);
    });
  });
});
