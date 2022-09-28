class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Storage {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Storage.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(book) {
    const bookTitle = book.querySelector('#title').innerText;
    const books = Storage.getBooks();
    const filterBooks = books.filter((book) => bookTitle === book.title);
    const filterIndex = books.indexOf(filterBooks[0]);
    books.splice(filterIndex, 1);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

class displayDynamic {
  static displayBooks() {
    const books = Storage.getBooks();
    books.forEach((book) => displayDynamic.addBooksCollection(book));
  }

  static addBooksCollection(book) {
    const books = document.querySelector('.list');
    const newBook = document.createElement('div');
    newBook.innerHTML = `
        <div class = 'book-cont'>
        <div class = "book-details">
        <p id='title'> "${book.title}"</p> 
        <p class="by">by</p>
        <p id='author'> ${book.author}</p>
        </div>
        <button class="remove" type="button">Remove</button>
        </div>
        <hr class='hr>
        </div>
        `;
    newBook.classList.add('newBook');
    books.appendChild(newBook);
  }

  static deleteBook(eve) {
    if (eve.classList.contains('remove')) {
      eve.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('.title').value = '';
    document.querySelector('.author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', displayDynamic.displayBooks);
document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  const inputTitle = document.querySelector('.title').value;
  const inputAuthor = document.querySelector('.author').value;
  const book = new Book(inputTitle, inputAuthor);
  displayDynamic.addBooksCollection(book);
  Storage.addBook(book);
  displayDynamic.clearFields();
});

document.querySelector('#list').addEventListener('click', (e) => {
  if (e.target.className === 'remove') {
    const book = e.target.parentElement;
    Storage.removeBook(book);
    displayDynamic.deleteBook(e.target);
  }
});
