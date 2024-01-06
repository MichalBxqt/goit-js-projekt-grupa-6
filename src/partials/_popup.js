const startTime = new Date().getTime();
let interval = 1000;
let currentBookData = {};

function sprawdzElement() {
  const elements = document.querySelectorAll('.books-item-link');
  if (elements.length > 0) {
    elements.forEach(function (element) {
      element.removeEventListener('click', clickHandler);
      element.addEventListener('click', clickHandler);
    });
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
  currentBookData = {
    title: clickedElement.querySelector('.books-card-title').innerText,
    author: clickedElement.querySelector('.books-card-author').innerText,
    description: 'Tutaj dodaj opis książki...',
    book_image: clickedElement
      .querySelector('.books-card-title-img')
      .getAttribute('src'),
    amazon_product_url: 'https://www.amazon.com/',
  };
  wyswietlModal();
}

function wyswietlModal() {
  const modal = document.getElementById('myModal');
  if (modal) {
    modal.style.display = 'block';

    // zawartość popupa danymi z aktualnie klikniętej książki
    document.querySelector('.popup__img').src = currentBookData.book_image;
    document.querySelector('.popup__info-title').innerText =
      currentBookData.title;
    document.querySelector('.popup__info-name').innerText =
      currentBookData.author;
    document.querySelector('.popup__info-desc').innerText =
      currentBookData.description;
    document.querySelector('.popup__info-link').innerText =
      'Zobacz na Amazonie';
    document.querySelector('.popup__info-link').href =
      currentBookData.amazon_product_url;

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
  }
}

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
  const shoppingList = [];
  shoppingList.push(currentBookData);

  // miejsce na logikę związaną z dodawaniem do listy zakupów

  // localStorage.setItem(SHOPPING_LIST_STORAGE_KEY, JSON.stringify(shoppingList));

  // renderMarkUp(); // Zakładam, że masz gdzieś zdefiniowaną funkcję `renderMarkUp`
}

sprawdzElement();
