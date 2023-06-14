import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Swal from 'sweetalert2';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function showLoader() {
  loader.style.display = 'block';
  catInfo.classList.add('is-hidden');
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
  catInfo.classList.remove('is-hidden');
  breedSelect.classList.remove('is-hidden');
  

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
 
  breedSelect.classList.add('is-hidden');
  
  
  
 
  fetchCatByBreed(breedId)
  
    .then(data => {
      hideLoader();
      showCatInfo(data.url, data.name, data.description, data.temperament);
    })
    .catch(() => {
      hideLoader();
      showError();
    })
    .finally(() => {
      breedSelect.disabled = false; // Добавьте эту строку
    });
}

function initApp() {
  showLoader();
  hideError();
  catInfo.classList.add('is-hidden');
  breedSelect.classList.add('is-hidden');
  fetchBreeds()
    .then(breeds => {
      hideLoader();

      breeds.forEach(breed => {
        const option = new Option(breed.name, breed.id);
        breedSelect.appendChild(option);
      });

      new SlimSelect(breedSelect);
      breedSelect.classList.remove('is-hidden'); // Добавьте эту строку
      
      breedSelect.addEventListener('change', handleBreedSelection);
    })
    .catch(() => {
      hideLoader();
      showError();
    });
}

initApp();
