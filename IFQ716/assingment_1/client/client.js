// feference:
// EncodeURIComponent : https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
// fs.createReadStream(filePath).pipe(res); https://www.geeksforgeeks.org/node-js-stream-readable-pipe-method/

document.addEventListener("DOMContentLoaded", () => {
  const moviesTitleForm = document.getElementById("searchMoviesByTitle");
  moviesTitleForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const titleInput = document.getElementById("titleInput").value;

    try {
      // Fetching movie data by title
      const response = await fetch(
        `http://localhost:3000/movies/search?title=${encodeURIComponent(
          titleInput
        )}`
      );
      console.log(response);
      const data = await response.json();
      console.log(data);

      // Appending the search results to the results container
      const resultsContainer = document.getElementById("movieResults");
      resultsContainer.innerHTML = ""; // Clear previous results

      resultsContainer.innerHTML = JSON.stringify(data, null, 2); // for testing pursposes, it only shows the JSON data for now
    } catch (error) {
      console.error(error);
      const resultsContainer = document.getElementById("searchResults");
      resultsContainer.innerHTML = "An error occurred while fetching data.";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const moviesImdbIdForm = document.getElementById("searchMoviesById");
  moviesImdbIdForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const imdbIdInput = document.getElementById("imdbIdInput").value;

    try {
      // Fetching movie data by IMDb ID
      const response = await fetch(
        `http://localhost:3000/movies/data?imdbId=${encodeURIComponent(
          imdbIdInput
        )}`
      );
      console.log(response);
      const data = await response.json();
      console.log(data);

      // Appending the search results to the results container
      const resultsContainer = document.getElementById("movieResults");
      resultsContainer.innerHTML = ""; // Clear previous results

      resultsContainer.innerHTML = JSON.stringify(data, null, 2); // for testing purposes, it only shows the JSON data for now
    } catch (error) {
      console.error(error);
      const resultsContainer = document.getElementById("movieResults");
      resultsContainer.innerHTML = "An error occurred while fetching data.";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const postersImdbIdForm = document.getElementById("searchPostersById");
  postersImdbIdForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const imdbIdInput = document.getElementById("searchPostersInput").value;

    try {
      // Fetching poster image by IMDb ID
      const response = await fetch(
        `http://localhost:3000/posters/?imdbId=${encodeURIComponent(
          imdbIdInput
        )}`
      );
      const blob = await response.blob();
      const data = URL.createObjectURL(blob); // Create a URL for the blob

      // Appending the poster image to the results container
      const resultsContainer = document.getElementById("postersResults");
      resultsContainer.innerHTML = ""; // Clear previous results
      const posterImage = document.createElement("img");
      posterImage.src = data; // Assuming data contains the image URL
      posterImage.alt = "Movie Poster";
      resultsContainer.appendChild(posterImage);
    } catch (error) {
      console.error(error);
      const resultsContainer = document.getElementById("posterResults");
      resultsContainer.innerHTML = "An error occurred while fetching data.";
    }
  });
});
