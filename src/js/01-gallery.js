// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');

const galleryMarkup = createGalleryCards(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

const lightbox = new SimpleLightbox('.gallery a', {
  animationSlide: false,
  captionsData: 'alt',
  captionDelay: 250,
});

function createGalleryCards(items) {
  return items
    .map(
      ({
        description,
        original,
        preview,
      }) => `<a class="gallery__item" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
    </a> `
    )
    .join('');
}
