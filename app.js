const addBook = document.querySelector('#btn');
const bookList = document.querySelector('#list');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const form = document.querySelector('#form');
const Book = function objBook(title, author) {
  this.title = title;
  this.author = author;
};
const storedBooks = [];
function addBooks(newBook) {
  const bookStore = `<div class = "book">
  <h2> ${newBook.title}</h2> 
  <h2> ${newBook.author}</h2>
  <button class="remove" type="button">Remove</button>
  <hr>
  </div>`;
  bookList.innerHTML += bookStore;
  return bookList.innerHTML;
}
addBook.addEventListener('click', (e) => {
  const newBook = new Book(title.value, author.value);
  if (title.value === '' || author.value === '') {
    e.preventDefault();
  } else {
    addBooks(newBook);
    title.value = '';
    author.value = '';
  }
});

// local storage section
let localForm = { title: '', author: '' };
if (localStorage.localForm) {
  localForm = JSON.parse(localStorage.localForm);
  title.value = localForm.title;
  author.value = localForm.author;
} form.addEventListener('input', () => {
  localStorage.localForm = JSON.stringify(localForm);
  localForm.title = title.value;
  localForm.author = author.value;
});

// remove books section

bookList.addEventListener('click', (eve) => {
  if (eve.target.classList.contains('remove')) {
  const parent = eve.target.parentElement;
  document.querySelector('.list').removeChild(parent);
  const removeBook = storedBooks.find((item) => item.title === parent.firstChild.innerText);
  storedBooks.splice(storedBooks.indexOf(removeBook), 1);
  }
});