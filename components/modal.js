const modal = document.getElementById('modal');
const modalBody = modal.querySelector('#modal-body');
const closeModal = modal.querySelector('.modal-close');

function openModal(movie) {
  modalBody.innerHTML = `
  <img src='${movie.poster?.url}' class="search_card_image">
  <div class="search_card_data">
    <div class="search_card_info">
      <h3 class="search_card_title">${movie.name}</h3>
      <p class="search_card_rate">${movie.rating?.imdb || movie.rating?.kp || '-'}/10</p>
    </div>
    <p class="search_card_description">${movie.description}</p>
    <div class="search_card_info_table">
      <p>Жанр:</p>
      <p>${movie.genres?.map(genre => genre.name).join(', ')}</p>
      <p>Страна:</p>
      <p>${movie.countries?.map(country => country.name).join(', ')}</p>
      <p>Год:</p>
      <p>${movie.year}</p>
    </div>
  </div>
  `;
  modal.style.display = 'block';
}


closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});


window.addEventListener('click', event => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});


export {openModal}
