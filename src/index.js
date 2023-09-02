import { fetchImage } from './image_api';
import Notiflix from 'notiflix';

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let page = 1;
form.addEventListener('submit', () => (page = 1));
form.addEventListener('submit', () => (gallery.innerHTML = ''));
form.addEventListener('submit', handlerSearch);

function handlerSearch(evt) {
  evt.preventDefault();
  const search = form.elements.searchQuery.value;
  console.log(search);
  loadMoreBtn.classList.add('js-hidden');
  fetchImage(search, page)
    .then(resp => {
      if (resp.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      console.log(resp.totalHits);
      renderImages(resp);
      loadMoreBtn.classList.remove('js-hidden');

      if (page * 40 > resp.totalHits) {
        loadMoreBtn.classList.add('js-hidden');
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
      page += 1;
    })
    .catch(error => console.log(error));
}
function renderImages(arr) {
  // console.log(arr.hits);
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
  gallery.insertAdjacentHTML('beforeend', markup);
  // gallery.innerHTML = markup;
}
loadMoreBtn.addEventListener('click', handlerSearch);