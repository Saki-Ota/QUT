# Movie API App

This is a Node.js-based REST API that allows users to search movies by title or IMDb ID, upload and retrieve movie poster images, and integrate data from external APIs.

# Features
- Search movies by title using external API
- Search movies by IMDb ID
- Retrieve movie poster images by IMDb ID
- Upload poster images associated with a movie
- Error handling for invalid or incomplete requests

## Installation
- Redirect to to Client folder - cd ./client
- npm install

## Run server 
- npm start 

## Usage
1. Search Movies by title
Send GET request:
http://localhost:3000/movies/search?title=Moana

2. Get movie details by IMDb ID
Send GET request:
http://localhost:3000/movies/data?imdbId=tt1234567

3. Retrieve Poster Image by IMDb ID
Send GET request:
http://localhost:3000/posters?imdbId=tt1234567

4. Upload Poster Image
Send POST request:
http://localhost:3000/posters/add?imdbId=tt1234567



