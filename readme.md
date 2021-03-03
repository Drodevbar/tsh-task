# Brief outline

## Requirements:
1. Docker && docker-compose

## Running application locally
1. `cp .env.example .env`
1. _fill all environmental variables_
1. _ensure Docker Daemon is running_
1. `docker-compose up`
1. app is available on port 4000

Note: in order to change the port, see `docker-compose.yml`

## Buzzwords:
1. the whole application has been contenerized using Docker
1. simple CI powered by GitHub has been added in order to automate running linter and unit tests
1. for testing purposes jest has been used
1. for linting purposes eslint has been used

## API documentation

### 1. Fetching available movies

`GET /api/movie`

_query params specication and logic are described in task description_

Possible responses:

| Status | Description                                                         | Body                               |
|--------|---------------------------------------------------------------------|------------------------------------|
| 200    | N/A | array of movies        |


### 2. Adding new movie

`POST /api/movie`

Request body (JSON):
```json
{
  "title": "Goodfellas",
  "year": 1990,
  "runtime": 221,
  "director": "Martin Scorsese",
  "genres": ["Drama", "Crime"],
  "actors": "Robert De Niro, Al Pacino",
  "plot": "The story of Irish-Italian American, Henry Hill, and how he lives day-to-day life as a member of the Mafia. Based on a true story, the plot revolves around Henry and his two unstable friends Jimmy and Tommy as they gradually climb the ladder from petty crime to violent murders.",
  "posterUrl": "https://images-na.ssl-images-amazon.com/images/I/51rOnIjLqzL._AC_.jpg"
}
```

_fields description and validation rules are described in task description_

Possible responses:

| Status | Description                                                         | Body                               |
|--------|---------------------------------------------------------------------|------------------------------------|
| 201    | New movie created successfully       | new movie (with id)       |
| 400    | Validation error occurred | `errors` array of all validation errors        |

---
# Original task description

## The Software House - Node.js Developer recruitment task

Hey there!

Not so long ago we decided create a catalogue of our favourite movies (data/db.json) as json. It is hard to update, so we would like to build an API
for it, however we don't need a database, we still need it as a file.

### TODOS

1. We need to be able to add a new movie. Each movie should contain information about:

- a list of genres (only predefined ones from db file) (required, array of predefined strings)
- title (required, string, max 255 characters)
- year (required, number)
- runtime (required, number)
- director (required, string, max 255 characters)
- actors (optional, string)
- plot (optional, string)
- posterUrl (optional, string)

Each field should be properly validated and meaningful error message should be return in case of invalid value.

2. We also need an endpoint that will return an array of movies (it might be a single movie) based on few conditions. The endpoint should take 2 optional query parameters:

- duration
- an array of genres

If we don't provide any parameter, then it should return a single random movie.

If we provide only duration parameter, then it should return a single random movie that has a runtime between <duration - 10> and <duration + 10>.

If we provide only genres parameter, then it should return all movies that contain at least one of the specified genres. Also movies should be orderd by a number of genres that match. For example if we send a request with genres [Comedy, Fantasy, Crime] then the top hits should be movies that have all three of them, then there should be movies that have one of [Comedy, Fantasy], [comedy, crime], [Fantasy, Crime] and then those with Comedy only, Fantasy only and Crime only.

And the last one. If we provide both duration and genres parameter, then we should get the same result as for genres parameter only, but narrowed by a runtime. So we should return only those movies that contain at least one of the specified genres and have a runtime between <duration - 10> and <duration + 10>.

In any of those cases we don't want to have duplicates.

### Rules

**Use express.js**

**Keep code clean**

**The code should be unit tested**

**Remember about proper error handling**

**We require code in git repository**
