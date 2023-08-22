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

    const titleElem = document.createElement("h2");
    titleElem.textContent = book.title;
    const authorElem = document.createElement("p");
    authorElem.textContent = "by:" + book.author;
    const pagesElem = document.createElement("p");
    pagesElem.textContent = book.pages + " pages";
    const isReadElem = document.createElement("p");
    //convert boolean to user-friendlier string
    const isReadString = book.isRead ? "Read" : "Unread";
    isReadElem.textContent = isReadString;
    const removeBookBtn = document.createElement("button")
    removeBookBtn.textContent = 'Remove'
    removeBookBtn.className = "button-remove"

    //append created elements to book Element
    bookElem.append(titleElem, authorElem, pagesElem, isReadElem, removeBookBtn);

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
