const apiKey = import.meta.env.VUE_APP_API_KEY;
const apiBaseUrl = "https://api.themoviedb.org/3/";

const headers = new Headers();
headers.append("Authorization", `Bearer ${apiKey}`);

const requestOptions = {
  method: "GET",
  headers: headers,
};

export async function fetchAllTrendsWeekMovies() {
  const response = await fetch(
    `${apiBaseUrl}trending/movie/week?language=fr-FR`,
    requestOptions
  );
  const movies = await response.json();
  // console.log("fetchAllTrendsWeekMovies", movies.results);
  return movies.results;
}

export async function fetchMovie(id) {
  const response = await fetch(
    `${apiBaseUrl}movie/${id}?language=fr-FR`,
    requestOptions
  );
  const movie = await response.json();
  // console.log("fetchMovie", movie);
  return movie;
}

export async function fetchMovieCasting(id) {
  const response = await fetch(
    `${apiBaseUrl}movie/${id}/credits?language=fr-FR`,
    requestOptions
  );
  const movie = await response.json();
  // console.log("fetchMovieCasting", movie.cast);
  return movie.cast;
}

export async function searchMovies(query, page) {
  const response = await fetch(
    `${apiBaseUrl}search/movie?language=fr-FR&query=${query}&page=${page}`,
    requestOptions
  );
  const movies = await response.json();
  // console.log("searchMovies", movies.results);
  return { results: movies.results, total_pages: movies.total_pages };
}
