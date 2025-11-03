import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import searchImagesByQuery from './js/pixabay-api';
import { createImages, clearImages } from './js/render-functions';

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const loader = document.querySelector('.loader');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  clearImages();

  const wordForSearch = input.value.trim();

  if (wordForSearch === '') {
    iziToast.error({
      position: 'topRight',
      message: 'Please fill the input',
    });
    return;
  }

  loader.classList.remove('hidden');

  searchImagesByQuery(wordForSearch)
    .then(data => {
      if (data.total === 0) {
        iziToast.error({
          position: 'topRight',
          message: 'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }

      createImages(data);
    })
    .catch(err => {
      iziToast.error({
        position: 'topRight',
        message: 'Error loading images',
      });
    })
    .finally(() => {
      loader.classList.add('hidden');
    });
}
