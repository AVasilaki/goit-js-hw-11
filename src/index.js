import { fetchImage } from './image_api';
import Notiflix from 'notiflix';

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', handlerSearch);
function handlerSearch(evt) {
  evt.preventDefault();
  const search = form.elements.searchQuery.value;
  console.log(search);
  fetchImage(search)
    .then(resp => {
      if (resp.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        // console.log(resp);
      }

      renderImages(resp);
      loadMoreBtn.classList.remove('js-hidden');
    })
    .catch(error => console.log(error));
}
function renderImages(arr) {
  console.log(arr.hits);
  const markup = arr.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
         <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`;
      }
    )
    .join('');
  // gallery.insertAdjacentHTML('beforeend', markup);
  gallery.innerHTML = markup;
}
