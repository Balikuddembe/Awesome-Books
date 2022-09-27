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

  static addBook (book) {
    const books = Storage.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(book) {
    const bookTitle = book.querySelector('#tittle').innerText;
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
        const books = document.querySelector('#list');
        const newBook = document.createElement('div');
        newBook.innerHTML = `
        <div class = "book">
        <h2> ${book.title}</h2> 
        <p class="by">by</p>
        <h2> ${book.author}</h2>
        <button class="remove" type="button">Remove</button>
        <hr>
        </div>
        
        `;
        newBook.classList.add('newBook');
        books.appendChild(newBook);
    }
    static deleteBook(eve) {
        if (eve.classList.contains('remove')) {
            eve.parentElement.remove();
        }
    }
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
    }
}

document.addEventListener('DOMContentLoaded', displayDynamic.displayBooks)
document.querySelector('#form').addEventListener('click', (e) => {
    e.preventDefault();
    const inputTitle = document.querySelector('#title').value;
    const inputAuthor = document.querySelector('#author').value;
    const book = new Book(inputTitle, inputAuthor);
    displayDynamic.addBooksCollection(book);
    Storage.addBook(book);
    displayDynamic.clearFields();
})

 document.querySelector('#list').addEventListener('clcik', (e) => {
    if (e.target.className === 'remove') {
       const book = e.target.parentElement;
       Storage.removeBook(book);
       displayDynamic.deleteBook(e.target);
    }
 });