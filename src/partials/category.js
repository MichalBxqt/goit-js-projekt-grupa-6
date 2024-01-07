import { all } from "axios";

// Czekaj na załadowanie całej strony przed wykonaniem kodu
document.addEventListener('DOMContentLoaded', () => {
  // Pobieranie kategorii książek z API po załadowaniu strony
  fetchCategories()
    .then(categories => {
      // Renderowanie listy kategorii po pobraniu danych
      renderCategories(categories);
    })
    .catch(error => {
      // Obsługa błędu w przypadku nieudanego pobrania kategorii
      console.error('Błąd podczas pobierania kategorii:', error);
    });
});

// Pobranie referencji do elementów DOM
const titleBooksList = document.querySelector('.books-in-cat');
const navList = document.querySelector('.categories__list');
const bestSellers = document.querySelector('.best-sellers');

// Nasłuchiwanie na kliknięcie elementu listy kategorii
navList.addEventListener('click', onFiltred);

// Funkcja obsługująca kliknięcie w kategorię
function onFiltred(event) {
  if (event.target.tagName !== 'LI') return; // Sprawdzenie czy kliknięty element to LI

  const categoryName = event.target.dataset['filter']; // Pobranie nazwy kategorii z atrybutu data

  // Usunięcie klasy 'active' z wszystkich elementów i dodanie jej tylko do klikniętego
  const listNames = document.querySelectorAll('.categories__list-name');
  listNames.forEach(elem => elem.classList.remove('active'));
  event.target.classList.add('active');
  if (categoryName=== 'All'){
    bestSellers.style.display = 'block';
  }
  else{
    fetchBooksByCategory(categoryName)
    .then(books => {
      renderBooks(books,categoryName);
    })
    .catch(error => {
      console.error('Błąd podczas pobierania książek:', error);
    });
  }
  // Pobieranie książek dla wybranej kategorii i ich renderowanie
  
}

// Renderowanie książek na podstawie dostarczonych danych
function renderBooks(books,categoryName) {
  let booksMarkup = '';
  booksMarkup = `
  <h1 class="title-book">
      ${categoryName} <span class="title-book-span">Books</span>
    </h1>
  <div class="booksCat">`;

  books.forEach(book => {
    booksMarkup += `
  <a href="#" class="books-item-link" aria-label="books-item-link" rel="noopener noreferrer" data-id='${book._id}'>

  <div class="books-card">
    <img
      src="${book.book_image}"
      alt="${book.title}"
      class="books-card-title-img"
      width="180"
      height="256"
      loading="lazy"
    />
    <div class="books-overlay">
      <p class="books-overlay-text">quick view</p>
    </div>
   </div> 
    <div class="books-descr">
      <h3 class="books-card-title">${book.title}</h3>
      <p class="books-card-author">${book.author}</p>
    </div>
 </a>
`;});
booksMarkup += `</div>`;

  titleBooksList.innerHTML = booksMarkup; // Wstawienie wyrenderowanych książek do odpowiedniego miejsca w DOM
  
  bestSellers.style.display = 'none';
}

// Renderowanie listy kategorii na podstawie dostarczonych danych
function renderCategories(categoriesData) {
  const categoriesMarkup = categoriesData
    .map(
      category => `
      <li data-filter="${category.list_name}" class="categories__list-name">${category.list_name}</li>
    `
    )
    .join('');

  // Wstawienie wyrenderowanej listy kategorii do odpowiedniego miejsca w DOM
  navList.innerHTML = `
    <li data-filter="All" class="categories__list-name active">All categories</li>
    ${categoriesMarkup}`;
}

// Pobieranie kategorii książek z API
function fetchCategories() {
  return fetch('https://books-backend.p.goit.global/books/category-list').then(
    response => {
      if (!response.ok) {
        throw new Error(response.status); // Rzucenie błędu w przypadku nieudanego żądania
      }
      return response.json();
    }
  );
}

// Pobieranie książek dla określonej kategorii z API
function fetchBooksByCategory(category) {
  
  return fetch(
    `https://books-backend.p.goit.global/books/category?category=${category}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status); // Rzucenie błędu w przypadku nieudanego żądania
    }
    return response.json();
  });
}
