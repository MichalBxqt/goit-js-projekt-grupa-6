export function addToShoppingList(bookData) {
  const SHOPPING_LIST_STORAGE_KEY = 'storage-of-books';
  const shoppingList =
    JSON.parse(localStorage.getItem(SHOPPING_LIST_STORAGE_KEY)) || [];

  // Dodaj aktualną książkę do listy zakupów
  shoppingList.push(bookData);

  // Zapisz zaktualizowaną listę zakupów w localStorage
  localStorage.setItem(SHOPPING_LIST_STORAGE_KEY, JSON.stringify(shoppingList));

  // Zamknij modal po dodaniu do listy zakupów
  const modal = document.getElementById('myModal');
  if (modal) {
    modal.style.display = 'none';
  }

  // W tym miejscu możesz dodać kod do ponownego renderowania listy zakupów na stronie
  // np. wywołanie funkcji renderMarkUp(), o ile jest dostępna w Twoim kodzie
}
