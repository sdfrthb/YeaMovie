import { getRandomUpcomingMovie } from "./api.js";

const container = document.querySelector("#soon");
const template = document.querySelector("#random-movie");
let movie = {}

function createRandomMovieCard(movie) {
  const card = template.content.cloneNode(true);
  card.querySelector(".random-movie_poster").src = movie.poster.url;
  card.querySelector(".random-movie_poster").alt = movie.name;
  card.querySelector(".random-movie_title").textContent = movie.name;
  card.querySelector(".random-movie_description").textContent =
    movie.description;
  card.querySelector(".random-movie_date").textContent = movie.premiere?.world
    ? new Date(movie.premiere.world).toLocaleDateString("ru-RU")
    : "CКОРО В КИНО";

  return card;
};

async function renderRandomMovie() {
  try {
    movie = await getRandomUpcomingMovie();
    const card = createRandomMovieCard(movie);
    container.append(card);
  } catch (err) {
    console.error(err);
    container.textContent = "Не удалось загрузить фильм";
  }
}

export {renderRandomMovie, movie, createRandomMovieCard}
