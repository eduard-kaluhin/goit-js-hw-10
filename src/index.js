import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Swal from 'sweetalert2';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function showLoader() {
  loader.style.display = 'block';
}


function hideLoader() {
  loader.style.display = 'none';
}

function showError() {
  error.style.display = 'block';
  Swal.fire({
    icon: 'error',
    title: 'Oops!',
    text: 'Something went wrong! Try reloading the page!',
  });
}

function hideError() {
  error.style.display = 'none';
}

function showCatInfo(imageUrl, breedName, description, temperament) {
  const img = document.createElement('img');
  img.src = imageUrl;

  const breedNameEl = document.createElement('h2');
  breedNameEl.textContent = breedName;

  const descriptionEl = document.createElement('p');
  descriptionEl.textContent = `Description: ${description}`;

  const temperamentEl = document.createElement('p');
  temperamentEl.textContent = `Temperament: ${temperament}`;

  catInfo.innerHTML = '';
  catInfo.appendChild(img);
  catInfo.appendChild(breedNameEl);
  catInfo.appendChild(descriptionEl);
  catInfo.appendChild(temperamentEl);
  catInfo.style.display = 'block';

  Swal.fire({
    icon: 'info',
    title: breedName,
    text: `Description: ${description}`,
  });
}

function handleBreedSelection(event) {
  const breedId = event.target.value;
  showLoader();
  hideError();

  fetchCatByBreed(breedId)
    .then(data => {
      hideLoader();
      showCatInfo(data.url, data.name, data.description, data.temperament);
    })
    .catch(() => {
      hideLoader();
      showError();
    });
}

function initApp() {
  showLoader();
  hideError();

  fetchBreeds()
    .then(breeds => {
      hideLoader();

      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      new SlimSelect('.breed-select');

      breedSelect.addEventListener('change', handleBreedSelection);
    })
    .catch(() => {
      hideLoader();
      showError();
    });
    
}

initApp();