import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_0JtGVSBqjiasWh5nfxpRM1Q6z3bcX9aPfbx9j9i4imJDYV6mB8JMAUyzAvBAq9oV';

function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(function (response) {
      return response.data;
    })

    .catch(function (error) {
      return error;
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(function (response) {
      return response.data;
    })

    .catch(function (error) {
      return error;
    })
    .finally(function () {});
}

export { fetchBreeds, fetchCatByBreed };
