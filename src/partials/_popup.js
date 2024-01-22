import { getBook } from './get-books';
import { addToShoppingList } from './shopping-utils';

export async function wyswietlModal(id) {
  const data = await getBook(id);

  const modal = document.getElementById('myModal');
  if (modal) {
    modal.style.display = 'block';

    // zawartość popupa danymi z aktualnie klikniętej książki
    document.querySelector('.popup__img').src = data.book_image;
    document.querySelector('.popup__info-title').innerText = data.title;
    document.querySelector('.popup__info-name').innerText = data.author;
    document.querySelector('.popup__info-desc').innerText = data.description;
    document.querySelector('.popup__info-link-amazon').href =
      data.amazon_product_url;

    document.querySelector('.popup__info-link-book').href = data.buy_links.find(
      item => item.name !== 'Amazon'
    ).url;

    const span = document.querySelector('.popup__close-button-span');
    span.onclick = function () {
      modal.style.display = 'none';
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };

    document.addEventListener('keydown', function (event) {
      event.preventDefault();
      if (event.key === 'Escape') {
        modal.style.display = 'none';
      }
    });

    // Dodaj event listener dla przycisku w popupie po załadowaniu strony
    document.addEventListener('DOMContentLoaded', function () {
      document
        .querySelector('.popup__button')
        .addEventListener('click', () => addToShoppingList(data));
    });
  }
}
