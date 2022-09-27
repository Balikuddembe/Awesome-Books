const addBook = document.querySelector('#btn');
const bookList = document.querySelector('#list');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const form = document.querySelector('#form');

class Book {
  constructor (title,author) {
    this.title = title;
    this.author = author;
  }
};

class Storage {
  static getBooks(){
    let books;
    if(localStorage.getItem('books')===null) {
      books=[];
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books;
  }

  static addBook () {
    
  }
}

const storedBooks = [];

class dispayBooks {

static addBooks(newBook) {
  const bookStore = `<div class = "book">
  <h2> ${newBook.title}</h2> 
  <p class="by">by</p>
  <h2> ${newBook.author}</h2>
  <button class="remove" type="button">Remove</button>
  <hr>
  </div>`;
  bookList.innerHTML += bookStore;
  return bookList.innerHTML;
}

static addBook() {

}

static removeBook() {

}
// local storage section

static getStorage() {
  if (localStorage.localForm) {
    localForm = JSON.parse(localStorage.localForm);
    title.value = localForm.title;
    author.value = localForm.author;
  }
}

form.addEventListener('input', () => {
  localStorage.localForm = JSON.stringify(localForm);
  localForm.title = title.value;
  localForm.author = author.value;
});

addBook.addEventListener('click', (e) => {
  if (title.value === '' || author.value === '') {
    e.preventDefault();
  } else {
    const newBook = new Book(title.value, author.value);
    addBooks(newBook);
    title.value = '';
    author.value = '';
  }
});
// remove books section

bookList.addEventListener('click', (eve) => {
  if (eve.target.classList.contains('remove')) {
    document.querySelector('.list').removeChild(eve.target.parentElement);
    const parent = eve.target.parentElement;
    const removeBook = storedBooks.find((item) => item.title === parent.firstChild.innerText);
    storedBooks.splice(storedBooks.indexOf(removeBook), 1);
  }
});
}