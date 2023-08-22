const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.index = myLibrary.length;
}

function addBookToMyLibraryObj(
  titleToAdd,
  authorToAdd,
  pagesToAdd,
  isReadToAdd
) {
  const newBook = new Book(titleToAdd, authorToAdd, pagesToAdd, isReadToAdd);

  myLibrary.push(newBook);
}

function displayBooks(myLibrary) {
  const shelf = document.querySelector(".card-wrapper");
  shelf.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookElem = document.createElement("card");
    bookElem.className = "book";
    bookElem.setAttribute("bookIndex", book.index);

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
    const isReadString = book.isRead ? "Read" : "Unread";
    bookElemsObj.isRead.textContent = isReadString;
    //convert boolean to user-friendlier string
    bookElemsObj.removeBookBtn.textContent = "Remove";
    bookElemsObj.removeBookBtn.className = "book remove";

    //Adds event listener to Remove button every time a new bookElemsObj is created
    bookElemsObj.removeBookBtn.addEventListener("click", removeBook);

    //append created elements to book Element
    Object.values(bookElemsObj).forEach((elem) => bookElem.appendChild(elem));

    shelf.appendChild(bookElem);
  });
}

function addBookDefinedInModal() {
  const titleToAdd = document.querySelector("input#title").value;
  const authorToAdd = document.querySelector("input#author").value;
  const pagesToAdd = document.querySelector("input#pages").value;
  const isReadToAdd = document.querySelector(
    "input[name='have-read']:checked"
  ).id;
  const isReadToAddString =
    isReadToAdd.charAt(0).toUpperCase() + isReadToAdd.slice(1);

  addBookToMyLibraryObj(titleToAdd, authorToAdd, pagesToAdd, isReadToAdd);
  displayBooks(myLibrary);
}

function removeBook() {
  myLibrary.splice(this.parentElement.getAttribute("bookindex"), 1);
  console.log(myLibrary);
  displayBooks(myLibrary);
}

//Default books for testing
(function () {
  addBookToMyLibraryObj("LOTR", "JRR", "22", true);
  addBookToMyLibraryObj("Smirnoff", "John Bateman", "443", false);
  console.log(myLibrary);

  displayBooks(myLibrary);
})();

// #region Event Listeners
//Show Modal form for adding books
const modalNewBook = document.querySelector("dialog#dialog-newbook");
const btnNewBook = document.querySelector("button#btn-newbook");
btnNewBook.addEventListener("click", () => modalNewBook.show());

//Add book to library based on the modal form
const btnAddBook = document.querySelector("button#btn-addbook");
btnAddBook.addEventListener("click", () => addBookDefinedInModal());

// const btnRemoveBook = document.querySelectorAll("button.book.remove")
// btnRemoveBook.forEach(button => button.addEventListener("click", removeBook))

// #endregion
