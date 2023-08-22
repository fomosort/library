const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks(myLibrary) {
  myLibrary.forEach((book) => {
    const bookElem = document.createElement("card");
    bookElem.className = "book";

    const bookElemsObj = {
      title: document.createElement("h2"),
      author: document.createElement("p"),
      pages: document.createElement("p"),
      isRead: document.createElement("p"),
      removeBookBtn: document.createElement("button"),
    };
    bookElemsObj.title.textContent = book.title;
    bookElemsObj.author.textContent = "by:" + book.author;
    bookElemsObj.pages.textContent = book.pages + " pages";
    bookElemsObj.isRead.textContent = isReadString;
    //convert boolean to user-friendlier string
    const isReadString = book.isRead ? "Read" : "Unread";
    bookElemsObj.removeBookBtn.textContent = "Remove";
    bookElemsObj.removeBookBtn.className = "button-remove";

    //append created elements to book Element
    Object.values(bookElemsObj).forEach((elem) => bookElem.appendChild(elem));

    const shelf = document.querySelector(".card-wrapper");
    shelf.appendChild(bookElem);
  });
}

const modalNewBook = document.querySelector("dialog#dialog-newbook");
const btnNewBook = document.querySelector("button#btn-newbook");
btnNewBook.addEventListener("click", () => modalNewBook.show());

const btnAddBook = document.querySelector("button#btn-addbook");
btnAddBook.addEventListener("click", () => {
  const titleToAdd = document.querySelector("input#title").value;
  const authorToAdd = document.querySelector("input#author").value;
  const pagesToAdd = document.querySelector("input#pages").value;
  const isReadToAdd = document.querySelector(
    "input[name='have-read']:checked"
  ).id;
  const isReadToAddString =
    isReadToAdd.charAt(0).toUpperCase() + isReadToAdd.slice(1);
  const newBook = new Book(
    titleToAdd,
    authorToAdd,
    pagesToAdd,
    isReadToAddString
  );
  addBookToLibrary(newBook);
  displayBooks(myLibrary);
});

displayBooks([
  { title: "LOTR", author: "JRR", pages: "22", isRead: true },
  { title: "Smirnoff", author: "John Bateman", pages: "232", isRead: false },
]);
