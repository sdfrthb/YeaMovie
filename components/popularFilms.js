import { getPopularMovies } from "./api.js";
import { openModal } from "./modal.js";

const filmsContainer = document.querySelector("#movies");
const buttons = document.querySelectorAll("[data-type]");
let popularData = {};

const createPopularMovieCard = (movie) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
  <img src='${movie.poster.url}' class="card_image">
  <div class="card_data">
    <div class="card_info">
      <h3 class="card_title">${movie.name}</h3>
      <p class="card_year">${movie.year}г.</p>
    </div>
    <p class="card_rate">${movie.rating.imdb}/10</p>
  </div>
  `;
  return card;
};

function renderPopularMovies(list) {
  const filmsContainer = document.querySelector("#movies");
  filmsContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  list.forEach((movie) => {
    const card = createPopularMovieCard(movie);
    fragment.append(card);
    card.addEventListener('click', () => openModal(movie));
  });
  filmsContainer.append(fragment);

}

async function getAllPopularData() {
  try {
    const [movies, series, cartoons] = await Promise.all([
      getPopularMovies("movie"),
      getPopularMovies("tv-series"),
      getPopularMovies("cartoon"),
    ]);

    popularData.movie = movies.docs;
    popularData.series = series.docs;
    popularData.cartoon = cartoons.docs;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((button) => {
          button.classList.toggle("active", button === btn);
        });

        renderPopularMovies(popularData[btn.dataset.type]);
      });
    });

    renderPopularMovies(popularData.movie);
  } catch (error) {
    console.error(error);
    filmsContainer.textContent = "Не удалось загрузить список фильмов";
  }
}

export {getAllPopularData, renderPopularMovies, popularData}
