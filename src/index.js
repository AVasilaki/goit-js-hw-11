import { fetchBreeds, fetchCatByBreed } from './cat-api';

const select = document.querySelector('select');
const inform = document.querySelector('div');
const loader = document.querySelector('.loader');
const err = document.querySelector('.error');

fetchBreeds()
  .then(data => {
    select.insertAdjacentHTML('beforeend', createMarckup(data));
    loader.classList.add('js-loader-hidden');
    select.classList.remove('js-select-hidden');
  })

  .catch(function (error) {
    if (error.response) {
      err.classList.remove('js-error-hidden');
      loader.classList.add('js-loader-hidden');
    } else if (error.request) {
      err.classList.remove('js-error-hidden');
      loader.classList.add('js-loader-hidden');
    } else {
      err.classList.remove('js-error-hidden');
      loader.classList.add('js-loader-hidden');
    }
  })
  .finally(loader.classList.remove('js-loader-hidden'));

function createMarckup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option> `)
    .join('');
}
select.addEventListener('change', handlerCat);

function handlerCat(evt) {
  const cat = evt.currentTarget.value;
  inform.innerHTML = '';
  fetchCatByBreed(cat)
    .then(data => {
      inform.insertAdjacentHTML('beforeend', catMarkup(data));
      loader.classList.add('js-loader-hidden');
    })
    .catch(function (error) {
      if (error.response) {
        err.classList.remove('js-error-hidden');
        loader.classList.add('js-loader-hidden');
      } else if (error.request) {
        err.classList.remove('js-error-hidden');
        loader.classList.add('js-loader-hidden');
      } else {
        err.classList.remove('js-error-hidden');
        loader.classList.add('js-loader-hidden');
      }
      console.log(error.config);
    })
    .finally(loader.classList.remove('js-loader-hidden'));
}

function catMarkup(arr) {
  return arr
    .map(
      ({
        url,
        breeds: {
          0: { name, description, temperament },
        },
      }) => `<img class="img" src="${url}" alt="" width ='700px'/>
      <p class="name">${name}</p>
      <p class="description">${description}</p>
      <p class="temperament">${temperament}</p>`
    )
    .join('');
}
