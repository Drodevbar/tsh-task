const { dbHandler } = require('../../../src/db/handler');
const { movieReader } = require('../../../src/service/movie-reader.service');

dbHandler.getAllMovies = jest.fn();

describe('[service/movie-reader]', () => {
  let movies;

  beforeEach(() => {
    movies = [
      { id: 1, runtime: 10, genres: ['Foo'] },
      { id: 2, runtime: 20, genres: ['Bar'] },
      { id: 3, runtime: 30, genres: ['Baz'] },
      { id: 4, runtime: 40, genres: ['Foo', 'Bar'] },
    ];
    dbHandler.getAllMovies.mockReturnValue(movies);
  });

  describe('getSingleRandomMovie', () => {
    it('should return collection with a single movie', () => {
      const returnedMovies = movieReader.getSingleRandomMovie();

      expect(returnedMovies).toHaveLength(1);
      expect(movies).toContain(returnedMovies[0]);
    });
  });

  describe('getSingleRandomMovieInRuntimeRange', () => {
    it('should return empty collection for duration 100 and range 20', () => {
      const returnedMovies = movieReader.getSingleRandomMovieInRuntimeRange(100, 20);

      expect(returnedMovies).toHaveLength(0);
      expect(returnedMovies).toEqual([]);
    });

    it('should return collection with movie with id 1 for duration 10 and range 0', () => {
      const returnedMovies = movieReader.getSingleRandomMovieInRuntimeRange(10, 0);

      expect(returnedMovies).toHaveLength(1);
      expect(returnedMovies[0]).toStrictEqual(movies[0]);
    });

    it('should return collection with movie with id 1 or 2 for duration 10 and range 10', () => {
      const returnedMovies = movieReader.getSingleRandomMovieInRuntimeRange(10, 10);

      expect(returnedMovies).toHaveLength(1);
      expect([movies[0], movies[1]]).toContain(returnedMovies[0]);
    });

    it('should return collection with any movie for duration 10 and range 500', () => {
      const returnedMovies = movieReader.getSingleRandomMovieInRuntimeRange(10, 500);

      expect(returnedMovies).toHaveLength(1);
      expect(movies).toContain(returnedMovies[0]);
    });
  });

  describe('getMoviesWithGenresSortedByNumberOfMatches', () => {
    it('should return 1 element collection of movies with genre "Baz"', () => {
      const returnedMovies = movieReader.getMoviesWithGenresSortedByNumberOfMatches(['Baz']);

      expect(returnedMovies).toHaveLength(1);
      expect(returnedMovies).toStrictEqual([movies[2]]);
    });

    it('should return 3 elements collection of movies with genres ["Foo", "Bar"] properly ordered', () => {
      const returnedMovies = movieReader.getMoviesWithGenresSortedByNumberOfMatches(['Foo', 'Bar']);

      expect(returnedMovies).toHaveLength(3);
      expect(returnedMovies).toStrictEqual([movies[3], movies[0], movies[1]]);
    });

    it('should return empty collection of movies when movie with given genre does not exist', () => {
      const returnedMovies = movieReader.getMoviesWithGenresSortedByNumberOfMatches(['wronggenre']);

      expect(returnedMovies).toHaveLength(0);
      expect(returnedMovies).toEqual([]);
    });
  });

  describe('getMoviesWithGenresAndInRuntimeRange', () => {
    it('should return movie with id 4 for genres ["Foo"], duration 40 and range 10', () => {
      const returnedMovies = movieReader.getMoviesWithGenresAndInRuntimeRange(['Foo'], 40, 10);

      expect(returnedMovies).toHaveLength(1);
      expect(returnedMovies).toStrictEqual([movies[3]]);
    });

    it('should return movies with ids 1 and 4 for genres ["Foo"], duration 40 and range 40', () => {
      const returnedMovies = movieReader.getMoviesWithGenresAndInRuntimeRange(['Foo'], 40, 40);

      expect(returnedMovies).toHaveLength(2);
      expect(returnedMovies).toStrictEqual([movies[0], movies[3]]);
    });

    it('should return movies with ids 4, 1, 2 for genres ["Foo", "Bar"], duration 40 and range 40', () => {
      const returnedMovies = movieReader.getMoviesWithGenresAndInRuntimeRange(['Foo', 'Bar'], 40, 40);

      expect(returnedMovies).toHaveLength(3);
      expect(returnedMovies).toStrictEqual([movies[3], movies[0], movies[1]]);
    });
  });
});
