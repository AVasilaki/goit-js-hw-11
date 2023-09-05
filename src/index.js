import { fetchImage } from './image_api';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
const perPage = 40;

form.addEventListener('submit', () => (page = 1));
form.addEventListener('submit', () => (gallery.innerHTML = ''));
form.addEventListener('submit', handlerSearch);

function handlerSearch(evt) {
  evt.preventDefault();
  const search = form.elements.searchQuery.value;
  console.log(search);
  loadMoreBtn.classList.add('js-hidden');
  fetchImage(search, page, perPage)
    .then(resp => {
      if (resp.data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
          { timeout: 5000 }
        );
      }
      console.log(resp.data.totalHits);
      renderImages(resp);
      loadMoreBtn.classList.remove('js-hidden');

      if (page * perPage > resp.data.totalHits) {
        loadMoreBtn.classList.add('js-hidden');
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results.",
          { timeout: 5000 }
        );
      }
      page += 1;
    })
    .catch(error =>
      Notiflix.Notify.failure(
        'Sorry, something went wrong!Try reloading the page',
        { timeout: 5000 }
      )
    );
}
function renderImages(arr) {
  const markup = arr.data.hits
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
      <b>Likes</b><br>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views </b><br>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments </b><br>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads </b><br>
      ${downloads}
    </p>
  </div>
</div>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
loadMoreBtn.addEventListener('click', handlerSearch);
let lightbox = new SimpleLightbox('.gallery a', {});
