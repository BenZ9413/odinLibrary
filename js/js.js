let myLibrary = [];
let bookCount = 0;

class Book {
  constructor(bookReference, title, author, pages, readStatus) {
    (this.bookReference = bookReference),
      (this.title = title),
      (this.author = author),
      (this.pages = pages),
      (this.readStatus = readStatus);
  }

  addBookToLibrary = () => {
    myLibrary.push(this);
  };
}

function createNewBook() {
  let bookCountNow = bookCount;
  bookCount++;
  return new Book(
    bookCountNow,
    document.querySelector("#title").value,
    document.querySelector("#author").value,
    document.querySelector("#pages").value,
    document.querySelector("input[name='readStatus']:checked").value
  );
}

function findBookInLibrary(referenceOfBookToFind) {
  for (let book in myLibrary) {
    if (myLibrary[book].bookReference == referenceOfBookToFind) {
      return book;
    }
  }
}

function changeReadStatusOfBook(e) {
  const readStatusElement = e.target.previousElementSibling;
  const bookToChangeReadStatus = findBookInLibrary(
    e.target.parentNode.parentNode.getAttribute("data")
  );
  if (myLibrary[bookToChangeReadStatus].readStatus == "yes") {
    myLibrary[bookToChangeReadStatus].readStatus = "no";
    readStatusElement.textContent = "Read: no";
  } else {
    myLibrary[bookToChangeReadStatus].readStatus = "yes";
    readStatusElement.textContent = "Read: yes";
  }
}

function deleteBook(e) {
  const bookToDeleteHtml = e.target.parentNode;
  const bookToDelete = findBookInLibrary(bookToDeleteHtml.getAttribute("data"));
  bookToDeleteHtml.parentNode.removeChild(bookToDeleteHtml);
  myLibrary.splice(bookToDelete, 1);
}

const inputForm = (function () {
  let form = document.getElementById("popUp");

  function show() {
    form.style.display = "flex";
  }

  function hide() {
    form.style.display = "none";
  }

  function clear() {
    form.reset();
  }

  function validate(e) {
    e.preventDefault();
    if (
      document.querySelector("#title").value == "" ||
      document.querySelector("#author").value == ""
    ) {
      alert("Please fill in all the book details.");
      return false;
    } else if (
      isNaN(document.querySelector("#pages").value) ||
      document.querySelector("#pages").value == ""
    ) {
      alert("Please use only numbers for the page-input.");
      return false;
    } else {
      return true;
    }
  }

  return {
    show,
    hide,
    clear,
    validate,
  };
})();

function displayBooks() {
  const main = document.querySelector("main");
  let lastBookAdded = myLibrary[myLibrary.length - 1];
  let bookContainer = document.createElement("div");
  bookContainer.setAttribute("data", lastBookAdded.bookReference);
  bookContainer.setAttribute("class", "book");
  let titleOfBook = document.createElement("div");
  titleOfBook.textContent = lastBookAdded.title;
  titleOfBook.setAttribute("id", "bookHeader");
  let authorOfBook = document.createElement("div");
  authorOfBook.textContent = lastBookAdded.author;
  let pagesOfBook = document.createElement("div");
  pagesOfBook.textContent = lastBookAdded.pages + " pages";
  let readStatusContainer = document.createElement("div");
  readStatusContainer.setAttribute("style", "display: flex");
  readStatusContainer.setAttribute("class", "readStatusContainer");
  let readStatusOfBook = document.createElement("div");
  readStatusOfBook.textContent = "Read: " + lastBookAdded.readStatus;
  let btnChangeReadStatus = document.createElement("button");
  btnChangeReadStatus.setAttribute("class", "btnChangeReadStatus");
  btnChangeReadStatus.textContent = "change";
  btnChangeReadStatus.addEventListener("click", (e) =>
    changeReadStatusOfBook(e)
  );
  let btnDelete = document.createElement("button");
  btnDelete.setAttribute("class", "btnDelete");
  btnDelete.textContent = "delete";
  btnDelete.addEventListener("click", (e) => deleteBook(e));
  bookContainer.appendChild(titleOfBook);
  bookContainer.appendChild(authorOfBook);
  bookContainer.appendChild(pagesOfBook);
  readStatusContainer.appendChild(readStatusOfBook);
  readStatusContainer.appendChild(btnChangeReadStatus);
  bookContainer.appendChild(readStatusContainer);
  bookContainer.appendChild(btnDelete);
  main.appendChild(bookContainer);
}

const btnAddBook = document.querySelector("#btnBook");
btnAddBook.addEventListener("click", () => inputForm.show());

const btnSubmit = document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click", (e) => {
  if (inputForm.validate(e)) {
    createNewBook().addBookToLibrary();
    inputForm.hide();
    inputForm.clear();
    displayBooks();
  }
});
