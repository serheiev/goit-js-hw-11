import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const baseURL = 'https://pixabay.com/api/';
const key = '?key=21771663-2e6d452ebbeefce836ab6f875';
const params = '&image_type=photo&orientation=horizontal&safesearch =true';
const form = document.querySelector('#search-form');
const content = document.querySelector('.content');
const q = document.querySelector('#search-form input');
const btnLoadMore = document.querySelector('.load-more');
const card = new SimpleLightbox('.content a', {});
const perPage = 200;
let page = 1;

form.addEventListener('submit', e => {
  e.preventDefault();

  content.innerHTML = '';
  page = 1;
  getImages(e);
});

btnLoadMore.addEventListener('click', e => {
  page += 1;
  getImages(e);
});

async function getImages(e) {
  try {
    const response = await axios.get(
      `${baseURL}${key}&q=${q.value}&per_page=${perPage}&page=${page}${params}`
    );
    console.log(response);
    const { hits, total, totalHits } = response.data;

    if (!total) {
      throw new Error();
    }

    if (e.type === 'submit') {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    content.insertAdjacentHTML('beforeend', createMarkup(hits));

    btnLoadMore.hidden = false;
    let pages = parseInt(totalHits / perPage);

    if (page > pages) {
      btnLoadMore.hidden = true;
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
    card.refresh();
  } catch (error) {
    return Notiflix.Notify.failure('Oops, there is no country with that name');
  }
}

function createMarkup(hits) {
  return hits
    .map(
      ({
        comments,
        likes,
        tags,
        views,
        downloads,
        webformatURL,
        largeImageURL,
      }) => {
        return `


    <div class="photo-card">
    <a class="photo-link" href="${largeImageURL}">
      <img class="photo-img" src="${webformatURL}" alt="${tags}" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${downloads}
      </p>
    </div>
  </div>
    `;
      }
    )
    .join('');
}
