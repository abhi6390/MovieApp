//most popular movies leke aata
const APIURL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";


const IMGPATH = "https://image.tmdb.org/t/p/w1280";

//search kiya hai wo aayega
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const movieBox= document.querySelector("#movie-box")

const getMovies = async (api) => {
  // Fetch data from the API
  const response = await fetch(api);

  // Check for successful response
  if (!response.ok) {
    throw new Error(`Failed to fetch data. Status: ${response.status}`);
  }

  // Parse JSON data
  const data = await response.json();

  // Handle potential errors during data parsing (optional)
  try {
    const movies = data.results; // Assuming results property contains movie data

    // Create the movie container element (modify selector as needed)
    const movieContainer = document.querySelector('#your-movie-container-id');

    // Clear existing content for a fresh display (optional)
    movieContainer.innerHTML = ''; 

    // Create an informative heading
    const heading = document.createElement('h1');
    heading.textContent = 'Movies'; 

    
    movieContainer.appendChild(heading);
    showMovies(movies);
  } catch (error) {
    console.error('Error parsing movie data:', error);
    
  }
};

getMovies(APIURL)

const showMovies = (data) => {
    movieBox.innerHTML="";
    data.forEach(
        (item)=>{
        //    console.log(item); 
        const box= document.createElement("div")
        box.classList.add("box")
        box.innerHTML=`
            <img src="${IMGPATH+item.poster_path}" alt=""/>
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
        movieBox.appendChild(box)
        }
    )
}

document.querySelector("#search").addEventListener(
    "keyup",
    function (event) {
        if (event.target.value != "") {
            getMovies(SEARCHAPI + event.target.value)
        } else {
            getMovies(APIURL);
        }
    }
)

// getMovies(APIURL)
