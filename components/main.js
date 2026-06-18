import { getAllPopularData } from "./popularFilms.js";
import { renderRandomMovie } from "./randomFilms.js";
import { listenForm } from "./searchFilms.js";

function initPage() {
  renderRandomMovie();
  getAllPopularData();
  listenForm();
}

initPage()
