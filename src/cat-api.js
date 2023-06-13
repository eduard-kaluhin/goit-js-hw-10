const apiKey = 'live_BY3WKxtAZAG7ttrgsHDxVMRZlONOFAxOxPvqVLyeFxouvDZsKdcjOS9u7Wk0hv9i';

async function makeRequest(url) {
  const response = await fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  });

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json();
}

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';
  return makeRequest(url);
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return makeRequest(url)
    .then(data => {
      if (data.length > 0) {
        const breedData = data[0].breeds[0];
        return {
          url: data[0].url,
          name: breedData.name,
          description: breedData.description,
          temperament: breedData.temperament,
        };
      } else {
        throw new Error('No cat found');
      }
    });
}