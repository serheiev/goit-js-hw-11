import Notiflix from 'notiflix';
import axios from 'axios';
const baseURL = 'https://pixabay.com/api/';
const key = '?key=21771663-2e6d452ebbeefce836ab6f875';
const params = '&image_type=photo&orientation=horizontal&safesearch =true';
const btnSubmit = document.querySelector('#search-form button');
// const q = document.querySelector('#search-form input');

let q = document
  .querySelector('#search-form input')
  .addEventListener('input', e => {
    return `&q=${e.target.value}`;
  });

btnSubmit.addEventListener('click', e => {
  e.preventDefault();
  axios
    .get(`${baseURL}${key}${q}${params}`)
    .then(function (response) {
      // обробка успішного запиту
      console.log(response);
    })
    .catch(function (error) {
      // обробка помилки
      console.log(error);
    });
});
