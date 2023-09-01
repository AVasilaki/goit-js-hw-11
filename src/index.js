import { fetchImage } from './image_api';

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', handlerSearch);
function handlerSearch(evt) {
  evt.preventDefault();
  const search = form.elements.searchQuery.value;
  console.log(search);
  fetchImage(search).then();
}
