### Route path 
- The route path should follow the endpoints documented in Swagger

## URL
# GET request
- Movies
/moveis/search/{title}
/movies/data/{imdbID}

- Poster
/posters/{imdbID}

# POST request
- Poster
/posters/add/{imdbId}

## Information source
- Combined Review and Streaming service information and create a new JSON which follows the above swagger response format
# Review
- Movie information and rating
- https://www.omdbapi.com/#usage 
- Use By Ttile or By ID

# Streaming service
- https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability

## Exmaples responses
# /movies/search/mist

- Reqest URL: htttp:/localhost3000/moveis/search/mist
- code 200
- Response body
{
    "Search" [...],
    "totalResults": 186,
    "Response": "True"
}

- Response header: content-type: application/json 

# /movies/code/tt0884328
- Requsest URL: htttp:/localhost3000/movies/data/tt0884328
- {
  "details": {
    "Title": "The Mist",
    "Year": "2007",
    "Rated": "R",
    "Released": "21 Nov 2007",
    "Runtime": "126 min",
    "Genre": "Horror, Sci-Fi, Thriller",
    "Director": "Frank Darabont",
    "Writer": "Frank Darabont, Stephen King",
    "Actors": "Thomas Jane, Marcia Gay Harden, Laurie Holden",
    "Plot": "After a massive thunderstorm, an eerie, unwavering fog descends upon a Maine community. Locals seek refuge in a grocery store from the monstrous creatures now roaming the countryside killing everyone they encounter.",
    "Language": "English",
    "Country": "United States",
    "Awards": "6 wins & 13 nominations total",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTU2NjQyNDY1Ml5BMl5BanBnXkFtZTcwMTk1MDU1MQ@@._V1_SX300.jpg",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.1/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "73%"
      },
      {
        "Source": "Metacritic",
        "Value": "58/100"
      }
    ],
    "Metascore": "58",
    "imdbRating": "7.1",
    "imdbVotes": "358,327",
    "imdbID": "tt0884328",
    "Type": "movie",
    "DVD": "N/A",
    "BoxOffice": "$25,594,957",
    "Production": "N/A",
    "Website": "N/A",
    "Response": "True"
  },
  "streamingInfo": {
    "error": true,
    "message": "{\"message\":\"You are not subscribed to this API.\"}"
  }
}

#







