import axios from 'axios';

// function fetchImage(keyWords, page) {
//   console.log(page * 40);
//   const searchParams = new URLSearchParams({
//     key: '39170187-3cdd77eb9e5c506c0caadebc8',
//     q: keyWords,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: 'true',
//     per_page: 40,
//     page: page,
//   });
//   //   console.log(searchParams.toString());
//   return fetch(`https://pixabay.com/api/?${searchParams}`).then(resp => {
//     if (!resp.ok) {
//       throw new Error(resp.status);
//     }
//     return resp.json();
//   });
// }
async function fetchImage(keyWords, page, perPage) {
  try {
    const resp = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: '39170187-3cdd77eb9e5c506c0caadebc8',
        q: keyWords,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: perPage,
        page: page,
      },
    });
    console.log(resp);
    return resp;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export { fetchImage };
