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


document.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayMoviesByTitle();
//   fetchAndDisplayMoviessById();
//   fetchAndDisplayPostersById();
//   uploadPosterImage();
});
