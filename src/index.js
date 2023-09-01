import { fetchImage } from './image_api';

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', handlerSearch);
function handlerSearch(evt) {
  evt.preventDefault();
  const search = form.elements.searchQuery.value;
  console.log(search);
  fetchImage(search)
    .then(hits => renderImages(hits))
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
