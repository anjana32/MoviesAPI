const apiKey = "9f125b48";

async function searchMovie() {
    const query = document.getElementById("search").value.trim();
    const moviesDiv = document.getElementById("movies");

    if (!query) {
        moviesDiv.innerHTML = "<h2>Please enter a movie name</h2>";
        return;
    }

    moviesDiv.innerHTML = "Loading...";
    console.log("Searching for:", query);

    try {
        const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
        const data = await res.json();

        if (data.Response === "False") {
            moviesDiv.innerHTML = "<h2>No movies found</h2>";
            return;
        }

        moviesDiv.innerHTML = "";
        data.Search.forEach(movie => {
            moviesDiv.innerHTML += `
                <div class="movie-card">
                    <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300'}">
                    <h3>${movie.Title}</h3>
                    <p>Year: ${movie.Year}</p>
                    <a href="https://www.youtube.com/results?search_query=${movie.Title}+trailer" target="_blank">
                        ▶ Watch Trailer
                    </a>
                </div>
            `;
        });
    } catch (err) {
        moviesDiv.innerHTML = "<h2>⚠️ Error fetching movies</h2>";
        console.error(err);
    }
}
