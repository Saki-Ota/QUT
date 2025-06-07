// feference:
// EncodeURIComponent : https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
// fs.createReadStream(filePath).pipe(res); https://www.geeksforgeeks.org/node-js-stream-readable-pipe-method/
// formData : https://developer.mozilla.org/en-US/docs/Web/API/FormData

// This script handles the client-side functionality for searching movies by title or IMDb ID,
function fetchAndDisplayMoviesByTitle() {
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
      const data = await response.json();

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
}

// This function fetches and displays movie posters by IMDb ID
function fetchAndDisplayMoviessById() {
  const moviesImdbIdForm = document.getElementById("searchMoviesById");
  moviesImdbIdForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const imdbIdInput = document.getElementById("imdbIdInput").value;

    console.log(imdbIdInput);
    try {
      // Fetching movie data by IMDb ID
      const response = await fetch(
        `http://localhost:3000/movies/data?imdbId=${encodeURIComponent(
          imdbIdInput
        )}`
      );
      const data = await response.json();

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
}

// This function fetches and displays movie posters by IMDb ID
function fetchAndDisplayPostersById() {
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
}

// This function uploads a poster image for a movie by IMDb ID
function uploadPosterImage() {
  const uploadPosterForm = document.getElementById("uploadPosterFile");
  uploadPosterForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const imdbIdInput = document.getElementById("posterImdbIdInput").value;
    const posterFileInput = document.getElementById("posterFileInput").files[0];

    // create a Blob from the file input
    const blob = new Blob([posterFileInput], {
      type: "multipart/form-data",
    });

    // The image does not saved correctly
    // const form = new FormData();
    // form.append("posterFile", posterFileInput); // Append the file to the FormData object
    // form.append("imdbId", imdbIdInput); // Append the IMDb ID to the FormData object

    try {
      // Uploading the poster image
      const response = await fetch(
        `http://localhost:3000/posters/add?imdbId=${encodeURIComponent(
          imdbIdInput
        )}`,
        {
          method: "POST", // Use POST method for uploading since default is GET
          body: blob, // Use blob to send the file
        }
      );
      const data = await response.json();
    } catch (error) {
      const resultsContainer = document.getElementById("postersResults");
      resultsContainer.innerHTML = "An error occurred while uploading image.";
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayMoviesByTitle();
  fetchAndDisplayMoviessById();
  fetchAndDisplayPostersById();
  uploadPosterImage();
});
