const myLibrary = [];

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = hasRead;
  this.index = myLibrary.length;
  this.toggleReadStatus = function () {
    this.isRead = !this.isRead;
  };
  this.color = randRGB()
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
      changeReadStatusBtn: document.createElement("button"),
    };
    bookElemsObj.title.textContent = book.title;
    bookElemsObj.author.textContent = "by:" + book.author;
    bookElemsObj.pages.textContent = book.pages + " pages";
    bookElemsObj.isRead.id = "read-or-not";
    bookElemsObj.isRead.textContent = createReadString(book.isRead);

    bookElemsObj.removeBookBtn.textContent = "Remove";
    bookElemsObj.removeBookBtn.className = "book remove";
    //Adds event listener to Remove button every time a new bookElemsObj is created
    bookElemsObj.removeBookBtn.addEventListener("click", removeBook);

    bookElemsObj.changeReadStatusBtn.textContent = "Read";
    bookElemsObj.changeReadStatusBtn.className = "book read";
    //Adds event listener to Read button every time a new bookElemsObj is created
    bookElemsObj.changeReadStatusBtn.addEventListener(
      "click",
      execToggleReadStatus
    );
    //append created elements to book Element
    Object.values(bookElemsObj).forEach((elem) => bookElem.appendChild(elem));

    bookElem.setAttribute("style", `background-color:${book.color}`)
    shelf.appendChild(bookElem);
  });
}

function addBookDefinedInModal() {
  const titleToAdd = document.querySelector("input#title").value;
  const authorToAdd = document.querySelector("input#author").value;
  const pagesToAdd = document.querySelector("input#pages").value;
  const isReadToAdd = document.querySelector(
    "input#read"
  )
  const isReadToAddBoolean = isReadToAdd.checked

  // const isReadToAddString =
  //   isReadToAdd.charAt(0).toUpperCase() + isReadToAdd.slice(1);

  addBookToMyLibraryObj(titleToAdd, authorToAdd, pagesToAdd, isReadToAddBoolean);
  displayBooks(myLibrary);
  console.log(myLibrary);
}

function removeBook() {
  myLibrary.splice(this.parentElement.getAttribute("bookindex"), 1);
  console.log(myLibrary);
  displayBooks(myLibrary);
}

//convert boolean to user-friendlier string
function createReadString(isReadBoolean) {
  const isReadString = isReadBoolean ? "Read" : "Unread";
  return isReadString;
}

function execToggleReadStatus() {
  const thisBook = myLibrary[this.parentElement.getAttribute("bookindex")];
  thisBook.toggleReadStatus();
  this.parentElement.querySelector("#read-or-not").textContent =
    createReadString(thisBook.isRead);
}

//IIFE + Default books for testing
(function () {
  addBookToMyLibraryObj("Grapes of Wrath", "John Steinbeck", "464", true);
  addBookToMyLibraryObj(
    "Think like a Programmer",
    "Anton Spraul",
    "260",
    false
  );

  displayBooks(myLibrary);
})();

function randRGB(){
  const randR = Math.random()*150+1
  const randG = Math.random()*150+1
  const randB = Math.random()*150+1
  const randBgColor = `rgb(${randR}, ${randG}, ${randB})`
  return randBgColor
}
console.log(randRGB())

// #region Event Listeners
//Show Modal form for adding books
const modalNewBook = document.querySelector("dialog#dialog-newbook");
const btnNewBook = document.querySelector("button#btn-newbook");
btnNewBook.addEventListener("click", () => modalNewBook.showModal());

//Add book to library based on the modal form
const btnAddBook = document.querySelector("button#btn-addbook");
btnAddBook.addEventListener("click", () => addBookDefinedInModal());

// #endregion
