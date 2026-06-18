const config = {
  baseUrl: "https://api.poiskkino.dev",
  headers: {
    "X-API-KEY": "D2RMDSH-1WN4GXS-NP2H3XK-9FWJSDZ",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${(res.status, res.message)}`);
}

async function request(endpoint, options = {}) {
  const res = await fetch(`${config.baseUrl}${endpoint}`, options);
  return checkResponse(res);
}

function getRandomUpcomingMovie() {
  const params = new URLSearchParams();
  params.append("status", "post-production");
  params.append("notNullFields", ["poster.url", "name", "description"]);
  return request(`/v1.4/movie/random?${params.toString()}`, {
    headers: config.headers,
  });
}

function getPopularMovies(category) {
  const params = new URLSearchParams();
  params.append("notNullFields", ["poster.url", "name", "year", "rating.imdb", "description"]);
  params.append("type", [category]);
  params.append("limit", 12);
  params.append("page", 1);
  return request(`/v1.5/movie?${params.toString()}`, {
    headers: config.headers,
  });
}

function getSearchFilms(query) {
  const params = new URLSearchParams();
  params.append("limit", 12);
  params.append("page", 1);
  params.append("query", query);
  return request(`/v1.4/movie/search?${params.toString()}`, {
    headers: config.headers,
  });
}

export { getRandomUpcomingMovie, getPopularMovies, getSearchFilms };
