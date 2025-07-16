// This script handles the client-side functionality for searching movies by title or IMDb ID,
function fetchAndDisplayMoviesByTitle() {
  const moviesTitleForm = document.getElementById("searchMoviesByTitle");
  moviesTitleForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const titleInput = document.getElementById("titleInput").value;
    const yearInput = document.getElementById("yearInput").value;
    const pageInput = document.getElementById("pageInput").value;

    try {
      // Fetching movie data by title
      let url = `https://localhost:3000/movies/search?title=${encodeURIComponent(
        titleInput
      )}`;
      if (yearInput) {
        // if (isNaN(yearInput) || !/^\d{4}$/.test(yearInput)) {
        //   throw new Error("Invalid year format. Format must be yyyy");
        // }
        url += `&year=${encodeURIComponent(yearInput)}`;
      }

      if (pageInput) {
        // if (isNaN(pageInput) || pageInput < 1) {
        //   throw new Error("Invalid page number. It must be a positive integer.");
        // }
        url += `&page=${encodeURIComponent(pageInput)}`;
      }

      const response = await fetch(url);
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
        `https://localhost:3000/movies/data?imdbId=${encodeURIComponent(
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
        `https://localhost:3000/posters/?imdbId=${encodeURIComponent(
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

    const formData = new FormData();
    formData.append("imdbId", imdbIdInput);
    formData.append("poster", posterFileInput);

    try {
      // Uploading the poster image
      const response = await fetch(
        `https://localhost:3000/posters/add?imdbId=${encodeURIComponent(
          imdbIdInput
        )}`,
        {
          method: "POST", // Use POST method for uploading since default is GET
          body: formData,
        }
      );
      const data = await response.json();
      const resultsContainer = document.getElementById("postersResults");
      resultsContainer.innerHTML = ""; // Clear previous results
      if (data.Error) {
        resultsContainer.innerHTML = `Error: ${data.Message}`;
      } else {
        resultsContainer.innerHTML = `Poster uploaded successfully for IMDb ID: ${data.Data.imdbId}`;
      }
    } catch (error) {
      const resultsContainer = document.getElementById("postersResults");
      resultsContainer.innerHTML = "An error occurred while uploading image.";
    }
  });
}


document.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayMoviesByTitle();
  fetchAndDisplayMoviessById();
  fetchAndDisplayPostersById();
  uploadPosterImage();
});
