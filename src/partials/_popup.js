export function showModal(book) {
  const modalContent = `
    <div class="modal">
      <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>${book.title}</h2>
        <img src="${book.book_image}" alt="${book.title}" />
        <p><strong>Autor:</strong> ${book.author}</p>
        <p><strong>Opis:</strong> ${book.description}</p>
        <!-- Dodaj inne informacje o książce, jeśli są dostępne -->
      </div>
    </div>
  `;

  // Dodaj modal do body
  document.body.insertAdjacentHTML('beforeend', modalContent);

  // Zamknij modal po kliknięciu w przycisk zamknięcia
  const closeButton = document.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    document.querySelector('.modal').remove();
  });
}





/*

___________________________________________________________________
const startTime = new Date().getTime();
let interval = 1000;

function sprawdzElement() {
  const elements = document.querySelectorAll('.books-item-link');
  if (elements.length > 0) {
    elements.forEach(function (element) {
      element.removeEventListener('click', clickHandler);
      element.addEventListener('click', clickHandler);
    });
    callback(elements);
    return;
  }

  if (new Date().getTime() - startTime > 5000) {
    console.error(
      'Przekroczono limit czasu. Żaden element nie został znaleziony.'
    );
  } else {
    setTimeout(sprawdzElement, interval);
  }
}

function clickHandler(event) {
  const clickedElement = event.currentTarget;
  const dataId = clickedElement.getAttribute('data-id');
  console.log(`Id książki='${dataId}'`);

  wyswietlModal();
}

function wyswietlModal() {
  const modal = document.getElementById('myModal');
  if (modal) {
    modal.style.display = 'block';

    const span = document.querySelector('.popup__close-button-span');
    const closeButton = document.getElementById('myBtn');

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
  }
}

sprawdzElement();

// event listener dla przycisku w popupie
document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelector('.popup__button')
    .addEventListener('click', addToShoppingList);
});

document
  .querySelector('.popup__button')
  .addEventListener('click', addToShoppingList);

function addToShoppingList() {
  const book = {
    title: 'TYTUŁ KSIĄŻKI',
    author: 'Imie nazwisko pisarza',
    description: 'Lorem ipsum...',

    book_image: 'URL_do_okładki',
    amazon_product_url: 'link_do_amazona',
    buy_links: [
      {
        url: 'link_do_amazona',
      },
      {
        url: 'link_do_apple_books',
      },
    ],
  };

  shoppingList.push(book);

  localStorage.setItem(SHOPPING_LIST_STORAGE_KEY, JSON.stringify(shoppingList));

  renderMarkUp();
}

*/