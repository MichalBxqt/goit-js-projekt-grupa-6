let SHOPPING_LIST_STORAGE_KEY = 'storage-of-books';
let shoppingList =
  JSON.parse(localStorage.getItem(SHOPPING_LIST_STORAGE_KEY)) || [];
let divElement = document.querySelector('.shopping ul');

let pageSize = 3;
let totalPages = Math.ceil(shoppingList.length / pageSize);
let currentPage = 1;
let startIndex = (currentPage - 1) * pageSize;
let endIndex = startIndex + pageSize;
let itemsOnPage = shoppingList.slice(startIndex, endIndex);

function renderMarkUp() {
  divElement.innerHTML = shoppingList
    .map(
      ({
        _id,
        title,
        author,
        description,
        list_name,
        book_image,
        amazon_product_url,
        buy_links: [apple],
      }) => {
        return `
        <article class="shopping__card">
          <div class="grid-img">
            <img class="shopping__card-img" src="${book_image}" alt="${title}" />
          </div>

          <div class="grid-title">
            <h3 class="shopping__card-title">${title}</h3>
            <p class="shopping__card-category">${list_name}</p>
          </div>

          <div class="grid-description">
            <p class="shopping__card-description">${description}</p>
          </div>

          <div class="grid-author">
            <p class="shopping__card-author">${author}</p>
          </div>

          <div class="grid-shoplist">
            <ul class="shopping__card-shoplist">
              <li class="store">
                <a "modal-shop-img" href="${amazon_product_url}" target="_blank" rel="noopener noreferrer nofollow" aria-label="Amazon link">
                  <img class="modal-shop-img shopping-shopimg amazon" src="${amazonIconPath}" alt="Amazon link" alt="Amazon live page"/>
                </a>
              </li>
              <li class="store">
                <a "modal-shop-img" href="${apple.url}" target="_blank" rel="noopener noreferrer nofollow" aria-label="Apple Books link">
                  <img class="modal-shop-img shopping-shopimg apple" src="${appleBooksIconPath}" alt="Apple Books link" />
                </a>
              </li>
            </ul>
          </div>
          <button class="shopping__card-btn" type="button" data-book-id="${_id} aria-label="Remove book from shopping list">
            <svg class="icon-trash" data-book-id="${_id}" width="17" height="17">
              <use href="${svgTrashIcon}#icon-trash"></use>
            </svg>
          </button>
        </article>
        `;
      }
    )
    .join('');
}

function isEmpty() {
  if (!shoppingList.length) {
    divElement.innerHTML = `<div class="is-empty__wrapper"><p class="is-empty__info">This page is empty, add some books and proceed to order.</p><img class="is-empty__picture" src="${emptyListStubImage}" alt="Shop is Empty"></div >`;
    return;
  }
  divElement.insertAdjacentHTML('beforeend', renderMarkUp(itemsOnPage));
}

isEmpty();

divElement.addEventListener('click', event => {
  if (event.target.closest('.shopping__card-btn')) {
    let BookID = event.target.getAttribute('data-book-id');

    let bookIndex = shoppingList.findIndex(
      bookInStorage => bookInStorage._id === BookID
    );

    shoppingList.splice(bookIndex, 1);

    localStorage.setItem(
      SHOPPING_LIST_STORAGE_KEY,
      JSON.stringify(shoppingList)
    );

    if (!shoppingList.length) {
      divElement.innerHTML = `<div class="is-empty__wrapper"><p class="is-empty__info">This page is empty, add some books and proceed to order.</p><img class="is-empty__picture" src="${emptyListStubImage}" alt="Shop is Empty"></div >`;
      return;
    } else if (!sliceArrayBooks().length) {
      previousButton.click();
      destroyChildElement(paginationContainerPages);
    } else {
      divElement.innerHTML = renderMarkUp(sliceArrayBooks());
      console.log(sliceArrayBooks());
      destroyChildElement(paginationContainerPages);
    }
    checkingArrayBooks();
  }
});

for (let i = 1; i <= totalPages; i++) {
  if (shoppingList.length <= 3) {
    return;
  }
  let pageNumber = i;
  let button = document.createElement('button');
  button.classList.add('paginations__btn');
  button.classList.add('paginations__btn--pages');
  button.textContent = i;

  activDisplayFlexOnElement(paginationContainerBackBtn);
  activDisplayFlexOnElement(paginationContainerEndBtn);

  button.addEventListener('click', () => {
    currentPage = pageNumber;
    deleteMurkup();
    createNewBooks();
    removeDisableforElement(startButton);
    removeDisableforElement(endButton);
  });
  paginationContainerPages.appendChild(button);
}

function initShoppingList() {
  renderMarkUp();
}
window.addEventListener('DOMContentLoaded', initShoppingList);

paginationContainerPages.firstChild.classList.add('active');

paginationsSection.addEventListener(
  'click',
  handlerPaginationsButtonsStartPreviousNextStart
);
function handlerPaginationsButtonsStartPreviousNextStart(event) {
  let activButton = document.querySelector('.active');
  console.log(event.target);
  if (event.target.tagName !== 'BUTTON') {
    return;
  }

  switch (event.target) {
    case previousButton:
      if (currentPage > 1) {
        currentPage--;
        deleteMurkup();
        createNewBooks();
        removeDisableforElement(endButton);

        activButton.classList.remove('active');
        activButton.previousElementSibling.classList.add('active');
      }
      break;
    case nextButton:
      if (currentPage < totalPages) {
        currentPage++;
        deleteMurkup();
        createNewBooks();
        removeDisableforElement(startButton);

        activButton.classList.remove('active');
        activButton.nextElementSibling.classList.add('active');
      }
      break;
    case startButton:
      currentPage = 1;
      deleteMurkup();
      createNewBooks();
      addDisableforElement(startButton);
      removeDisableforElement(endButton);
      highlighteTheСurrentРage(paginationContainerPages.firstChild);
      break;
    case endButton:
      currentPage = totalPages;
      deleteMurkup();
      createNewBooks();
      addDisableforElement(endButton);
      removeDisableforElement(startButton);
      highlighteTheСurrentРage(paginationContainerPages.lastElementChild);
      break;
    default:
      break;
  }
}

paginationContainerPages.addEventListener(
  'click',
  handleButtonPaginationContainerPages
);

function handleButtonPaginationContainerPages(event) {
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  highlighteTheСurrentРage(event.target);
}

function deleteMurkup() {
  divElement.innerHTML = '';
}
function sliceArrayBooks() {
  startIndex = (currentPage - 1) * pageSize;
  endIndex = startIndex + pageSize;
  return shoppingList.slice(startIndex, endIndex);
}
function createNewBooks() {
  divElement.insertAdjacentHTML('beforeend', renderMarkUp(sliceArrayBooks()));
}
function removeDisableforElement(element) {
  element.disabled = false;
}
function addDisableforElement(element) {
  element.disabled = true;
}
function activDisplayFlexOnElement(element) {
  element.style.display = 'flex';
}
function activDisplayNoneOnElement(element) {
  element.style.display = 'none';
}
function destroyChildElement(element) {
  let a = shoppingList.length / pageSize;
  if (Math.round(a) === a) {
    return element.lastElementChild.remove();
  } else {
    return;
  }
}
function checkingArrayBooks() {
  if (shoppingList.length <= 3) {
    activDisplayNoneOnElement(paginationContainerBackBtn);
    activDisplayNoneOnElement(paginationContainerEndBtn);
    paginationContainerPages.innerHTML = '';
  }
}
function highlighteTheСurrentРage(element) {
  let activButton = document.querySelector('.active');

  if (activButton) {
    activButton.classList.remove('active');
  }

  element.classList.add('active');
}
