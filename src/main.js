import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import searchImagesByQuery from './js/pixabay-api';
import { createImages, clearImages } from './js/render-functions';

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const loader = document.querySelector('.loader');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  clearImages();
  event.preventDefault();
  loader.classList.remove('hidden');
  let wordForSearch = input.value.trim();
  searchImagesByQuery(`${wordForSearch}`).then(data => {
    if (data.total === 0) {
      iziToast.error({
        position: 'topRight',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      loader.classList.add('hidden');
      return;
    }
    if (wordForSearch === '') {
      iziToast.error({
        position: 'topRight',
        message: 'Please fill the input',
      });
      loader.classList.add('hidden');
      return;
    } else {
      createImages(data);
    }
    loader.classList.add('hidden');
  });
}
