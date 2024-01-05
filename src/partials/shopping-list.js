import axios from 'axios';

const bookListContainer = document.querySelector('.book-card-position');
const emptyPageContainer = document.querySelector('.container-empty-page');
const sliderContainer = document.querySelector('.container-btns-slider');
const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
const itemsPerPage = 3;
let currentPage = 1;

function renderBookCard(book, index) {
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  if (index >= startIdx && index < endIdx) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    bookCard.innerHTML = `
      <div class="btn-delete-position" onclick="deleteBook(${index})">
        <div class="container-btn-delete-book">
          <svg id="btn-delete-book" width="18px" height="18px">
            <use href="/src/images/sprite.svg#icon-trash-03-1"></use>
          </svg>
        </div>
      </div>
      <img src="${book.cover}" alt="Okładka książki" />
      <div class="book-details">
        <h1>${book.title}</h1>
        <p>${book.category}</p>
        <p>${book.description}</p>
        <p>${book.author}</p>
        <div id="buy-links"></div>
      </div>
      <div class="container-logo-position">
        <img class="amazon-logo" src="/src/images/shopping-list/amazon.png" alt="amazon" width="48px" height="15px" />
        <img class="book-icon" src="/src/images/shopping-list/book.png" alt="book" width="28px" height="27px" />
      </div>
    `;

    bookListContainer.appendChild(bookCard);
  }
}

function deleteBook(index) {
  savedBooks.splice(index, 1);
  localStorage.setItem('books', JSON.stringify(savedBooks));

  bookListContainer.innerHTML = '';
  updateView();
}

function updateView() {
  if (savedBooks.length > 0) {
    savedBooks.forEach(renderBookCard);
    sliderContainer.classList.remove('hidden');
  } else {
    emptyPageContainer.classList.remove('hidden');
    sliderContainer.classList.add('hidden');
  }
}

function changePage(page) {
  currentPage = page;
  bookListContainer.innerHTML = '';
  updateView();
}

function goToFirstPage() {
  currentPage = 1;
  bookListContainer.innerHTML = '';
  updateView();
}

function goToPrevPage() {
  if (currentPage > 1) {
    currentPage--;
    bookListContainer.innerHTML = '';
    updateView();
  }
}

function goToNextPage() {
  const totalPages = Math.ceil(savedBooks.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    bookListContainer.innerHTML = '';
    updateView();
  }
}

function goToLastPage() {
  const totalPages = Math.ceil(savedBooks.length / itemsPerPage);
  currentPage = totalPages;
  bookListContainer.innerHTML = '';
  updateView();
}

async function fetchBooks() {
  try {
    const response = await axios.get(
      'https://books-backend.p.goit.global/books'
    );
    const books = response.data;

    savedBooks.push(...books);
    localStorage.setItem('books', JSON.stringify(savedBooks));

    updateView();
  } catch (error) {
    console.error('Error fetching books:', error.message);
  }
}

// Wywołanie funkcji pobierania książek z API
fetchBooks();

// --- open Amazon link --- //
function redirectToAmazon() {
  window.location.href = 'https://www.amazon.pl/';
}
