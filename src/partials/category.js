const titleBooksList = document.querySelector('.books-list-title');
const navList = document.querySelector('.categories__list');

const title = document.querySelector('title');
if (title.text == 'Bookshelf') {
  onRenderFiltred();
  navList.addEventListener('click', onFiltred);
}

function fetchCategories() {
  return fetch(`https://books-backend.p.goit.global/books/category-list`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

function onRenderFiltred() {
  fetchCategories().then(filtersMarkup).catch();
}

function filtersMarkup(filtersData) {
  const filtersMarkup = filtersData
    .map(filterData => {
      return `
      <li data-filter="${filterData.list_name}" class="categories__list-name">${filterData.list_name}</li>`;
    })
    .join(' ');
  navList.innerHTML = `
      <li data-filter="Best Sellers Books" class="categories__list-name active">All categories</li>
      ${filtersMarkup}`;
}

export function onFiltred(event) {
  event.preventDefault();

  if (event.target.tagName !== 'LI' && event.target.tagName !== 'BUTTON')
    return;

  let cateroryName = event.target.dataset['filter'];
  let cateroryNamePart = cateroryName.split(' ').slice(0, -1).join(' ');
  let lastWord = cateroryName.split(' ').pop();

  removeActiveClass();
  event.target.classList.add('active');

  function removeActiveClass() {
    const listNames = document.querySelectorAll('.categories__list-name');
    listNames.forEach(elem => {
      if (elem.textContent === cateroryName) {
        elem.classList.add('active');
      } else {
        elem.classList.remove('active');
      }
    });
  }
}

new SimpleBar(document.getElementById('myElement'), {
  autoHide: false,
  scrollbarMinSize: 167,
});
