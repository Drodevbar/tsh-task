const { checkSchema } = require('express-validator');

module.exports = (availableGenres) => checkSchema({
  title: {
    in: ['body'],
    isString: {
      errorMessage: 'title property needs to be a string',
    },
    isLength: {
      options: {
        min: 1,
        max: 255,
      },
      errorMessage: 'Given title should be in range of <1,255> characters',
    },
  },
  year: {
    in: ['body'],
    isInt: {
      errorMessage: 'year property needs to be a number',
    },
  },
  runtime: {
    in: ['body'],
    isInt: {
      errorMessage: 'runtime property needs to be a number',
    },
  },
  director: {
    in: ['body'],
    isString: {
      errorMessage: 'director property needs to be a string',
    },
    isLength: {
      options: {
        min: 1,
        max: 255,
      },
      errorMessage: 'Given director should be in range of <1,255> characters',
    },
  },
  genres: {
    in: ['body'],
    isArray: {
      errorMessage: 'genres property needs to be an array',
    },
    custom: {
      options: (genres) => genres.every((genre) => availableGenres.includes(genre)),
      errorMessage: `Some of given genres are not allowed. Allowed values are: ${availableGenres.join(', ')}`,
    },
  },
  actors: {
    in: ['body'],
    isString: {
      errorMessage: 'actors property needs to be a string',
    },
    optional: true,
  },
  plot: {
    in: ['body'],
    isString: {
      errorMessage: 'plot property needs to be a string',
    },
    optional: true,
  },
  posterUrl: {
    in: ['body'],
    isString: {
      errorMessage: 'posterUrl property needs to be a string',
    },
    optional: true,
  },
});
