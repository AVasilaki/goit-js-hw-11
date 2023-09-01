function fetchImage(keyWords) {
  const searchParams = new URLSearchParams({
    key: '39170187-3cdd77eb9e5c506c0caadebc8',
    q: keyWords,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });
  //   console.log(searchParams.toString());
  return fetch(`https://pixabay.com/api/?${searchParams}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
}

export { fetchImage };
