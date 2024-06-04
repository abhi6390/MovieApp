// Most popular movies link (The Movie Database API)
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

// Image base path (The Movie Database)
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

// Search API with search parameter (The Movie Database)
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const movieBox = document.querySelector("#movie-box");

const getMovies = async (api) => {
  try {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    const data = await response.json();
    showMovies(data.results);
  } catch (error) {
    // Handle API fetch error
    console.error("Error fetching data:", error);
    showError("API is currently unavailable. Please try again later.");
  }
};

const showMovies = (data) => {
  movieBox.innerHTML = "";
  data.forEach((item) => {
    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `
      <img src="${IMGPATH + item.poster_path}" alt="" />
      <div class="overlay">
        <div class="title">
          <h2>${item.original_title}</h2>
          <span>${item.vote_average}</span>
        </div>
        <h3>Overview:</h3>
        <p>
          ${item.overview}
        </p>
      </div>
    `;
    movieBox.appendChild(box);
  });
};

const showError = (message) => {
  // Create an element to display the error message
  const errorElement = document.createElement("div");
  errorElement.classList.add("error-message"); // Add a CSS class for styling
  errorElement.textContent = message;

  // Append the error message to the movie box or another suitable location
  movieBox.appendChild(errorElement);
};

document.querySelector("#search").addEventListener("keyup", function (event) {
  if (event.target.value !== "") {
    getMovies(SEARCHAPI + event.target.value);
  } else {
    getMovies(APIURL);
  }
});

// Check screen width on initial load
const screenWidth = window.screen.width;
if (screenWidth > 768) { // Adjust breakpoint as needed
  showError(
    "API data display might be limited on desktops. We recommend viewing on mobile devices or tablets for optimal experience. Thank you for your understanding."
  );
}

// Alternatively, check on window resize (more dynamic)
window.addEventListener("resize", () => {
  const screenWidth = window.screen.width;
  if (screenWidth > 768) {
    showError(
      "API data display might be limited on desktops. We recommend viewing on mobile devices or tablets for optimal experience. Thank you for your understanding."
    );
  } else {
    // Remove error message if screen size becomes suitable
    const errorElement = document.querySelector(".error-message");
    if (errorElement) {
      errorElement.remove();
    }
  }
});

// Call getMovies to fetch data on initial load
getMovies(APIURL);
