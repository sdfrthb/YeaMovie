import { getSearchFilms } from "./api.js";
import { popularData, renderPopularMovies } from "./popularFilms.js";
import { createRandomMovieCard, movie } from "./randomFilms.js";


const form = document.querySelector(".search");
const input = form.querySelector(".search_input");
const container = document.querySelector(".content");

function listenForm() {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    try {
      const movies = await getSearchFilms(query);
      renderSearchFilms(movies.docs);
    } catch (error) {
      console.error(error.message);
      container.textContent = "Не удалось выполнить поиск";
    }
  });
}

function renderSearchFilms(list) {
  container.innerHTML = `
  <button class="back-button">
  <svg width="6" height="20" viewBox="0 0 6 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.02542 9.62634L5.87543 1.23028C5.91536 1.16261 5.94693 1.08228 5.96831 0.993934C5.98969 0.905585 6.00046 0.81097 5.99999 0.715565C5.99952 0.62016 5.98782 0.52586 5.96557 0.438121C5.94332 0.350382 5.91096 0.270947 5.87037 0.204412C5.82978 0.137877 5.78176 0.0855636 5.72908 0.050499C5.67641 0.0154343 5.62013 -0.00168538 5.5635 0.000130748C5.50687 0.00194688 5.45102 0.0226627 5.39918 0.0610795C5.34734 0.0994962 5.30053 0.154851 5.26147 0.22394L0.12133 9.12317C0.04353 9.25788 0 9.4384 0 9.62634C0 9.81428 0.04353 9.9948 0.12133 10.1295L5.26147 19.0287C5.30053 19.0978 5.34734 19.1532 5.39918 19.1916C5.45102 19.23 5.50687 19.2507 5.5635 19.2526C5.62013 19.2544 5.67641 19.2372 5.72908 19.2022C5.78176 19.1671 5.82978 19.1148 5.87037 19.0483C5.91096 18.9817 5.94332 18.9023 5.96557 18.8146C5.98782 18.7268 5.99952 18.6325 5.99999 18.5371C6.00046 18.4417 5.98969 18.3471 5.96831 18.2587C5.94693 18.1704 5.91536 18.0901 5.87543 18.0224L1.02542 9.62634Z"
      fill="#7A7A7A" />
  </svg>
  <span>Назад</span>
</button>
<h1 class="search_title">Результаты поиска</h1>
<div class="search_cards"></div>
  `;
  const fragment = document.createDocumentFragment();
  list.forEach((list) => {
    const cards = createPopularMovieCard(list);
    fragment.append(cards);
  });
  container.querySelector('.search_cards').append(fragment);
  container.querySelector('.back-button').addEventListener("click", backToMain)
}

const createPopularMovieCard = (movie) => {
  const card = document.createElement("div");
  card.classList.add("search_card");
  card.innerHTML = `
  <img src='${movie.poster?.url}' class="search_card_image">
  <div class="search_card_data">
    <div class="search_card_info">
      <h3 class="search_card_title">${movie.name}</h3>
      <p class="search_card_rate">${movie.rating?.imdb || movie.rating?.kp || '-'}/10</p>
    </div>
    <p class="search_card_description">${movie.description}</p>
    <div class="search_card_info_table">
      <p>Жанр:</p>
      <p>${movie.genres.map(genre => genre.name).join(', ')}</p>
      <p>Страна:</p>
      <p>${movie.countries.map(country => country.name).join(', ')}</p>
      <p>Год:</p>
      <p>${movie.year}</p>
    </div>
  </div>
  `;
  return card;
};

function backToMain() {
  container.innerHTML = `
  <section class="random-movie_container" id="soon"></section>
  <section class="popular-movies_container" id="popular">
    <div class="popular-movies_buttons">
      <button data-type="movie" class="popular-movies_button active">Популярные фильмы</button>
      <button data-type="series" class="popular-movies_button">Популярные сериалы</button>
      <button data-type="cartoon" class="popular-movies_button">Популярные мультфильмы</button>
    </div>
    <div id="movies"></div>
  `
  container.querySelector('.random-movie_container').append(createRandomMovieCard(movie))
  console.log(popularData)
  renderPopularMovies(popularData.movie)
}

export { listenForm };
