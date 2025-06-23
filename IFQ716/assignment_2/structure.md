### Route path 
- The route path should follow the endpoints documented in Swagger

### GET requests

# 1. Movie Functionality
- GET /movies/search
it takes title and search movies that matches the title provided from movie DB. 

Exmaple response body:
{
  "data": [
    {
      "Title": "Moana",
      "Year": "2016",
      "imdbID": "tt3521164",
      "Type": "movie"
    }
  ],
  "pagination": {
    "total": 1,
    "lastPage": 1,
    "perPage": 100,
    "currentPage": 1,
    "from": 0,
    "to": 1
  }
}

Response Headers:
 access-control-allow-origin: * 
 content-length: 162 
 content-type: application/json; charset=utf-8 
 date: Sun,22 Jun 2025 00:54:00 GMT 
 etag: W/"a2-652GsDQUzWOv7fNa/pr4GbOFgoI" 
 x-powered-by: Express 

- GET  /movies/data/{imdbID}
It takes imdbID to search movie DB and returns data in json format
Need to jjoin multple tables, and hard code the line insdie the rating: "source": "Internet movid databse"

Example response:
[
  {
    "Title": "Moana",
    "Year": "2016",
    "Runtime": "107 min",
    "Genre": "Adventure,Animation,Comedy",
    "Director": "Ron Clements,John Musker,Don Hall,Chris Williams",
    "Writer": "Pamela Ribon,Jared Bush",
    "Actors": "Dwayne Johnson,Temuera Morrison",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.6/10"
      }
    ]
  }
]

Response headers: 
access-control-allow-origin: * 
 content-length: 296 
 content-type: application/json; charset=utf-8 
 date: Mon,23 Jun 2025 11:18:24 GMT 
 etag: W/"128-IgbRA/g9esTdp9aOq7vYugyiqPw" 
 x-powered-by: Express 

# 2. Poster functionality
The poster endpoints provided a way for users to both upload and download psoter images. Authentication was introduced for these endpoints given the nature of their functionality.

- GET /posters/{imdbID}
Get a poster image from local directory. Authentication is required 

- Post /posters/{imdbID}
Upload a poster image to local directory. Authentication is required


# 3. Authentication functionality
These endpoints consisted of functionality related to user registration and login such that a user could access protected endpoints

- Post /user/register
Create a new user information in movie DB. Authentication is required

- Post /user/login
Check user information in movie DB. Authenticatin is required 
