
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', () => {
  if (document.activeElement === searchInput) {
    searchInput.blur();
    searchInput.value = searchInput.value;
  } else {
    searchInput.focus();
  }
});
