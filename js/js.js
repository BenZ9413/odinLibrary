let myLibrary = [];
let bookCount = 0;

function Book() {}

// Have to check if every field has been filled out with a function

function addBookToLibrary(e) {
  e.preventDefault();
  myLibrary.push(new Book());
  myLibrary[myLibrary.length - 1].bookReference = bookCount;
  myLibrary[myLibrary.length - 1].title =
    document.querySelector("#title").value;
  myLibrary[myLibrary.length - 1].author =
    document.querySelector("#author").value;
  myLibrary[myLibrary.length - 1].pages =
    document.querySelector("#pages").value;
  myLibrary[myLibrary.length - 1].readStatus = document.querySelector(
    "input[name='readStatus']:checked"
  ).value;
  console.log(myLibrary);
  bookCount++;
  hideInputForm();
  clearInputForm();
  displayBooks();
}

function showInputForm() {
  document.getElementById("popUp").style.display = "flex";
}

function hideInputForm() {
  document.getElementById("popUp").style.display = "none";
}

function clearInputForm() {
  document.getElementById("popUp").reset();
}

function displayBooks() {
  const main = document.querySelector("main");
  let lastBookAdded = myLibrary[myLibrary.length - 1];
  let bookContainer = document.createElement("div");
  bookContainer.setAttribute("data", lastBookAdded.bookReference);
  let titleOfBook = document.createElement("div");
  titleOfBook.textContent = lastBookAdded.title;
  let authorOfBook = document.createElement("div");
  authorOfBook.textContent = lastBookAdded.author;
  let pagesOfBook = document.createElement("div");
  pagesOfBook.textContent = lastBookAdded.pages;
  let readStatusOfBook = document.createElement("div");
  readStatusOfBook.textContent = lastBookAdded.readStatus;
  let btnDelete = document.createElement("button");
  btnDelete.textContent = "delete";
  btnDelete.addEventListener("click", (e) => deleteBook(e));
  bookContainer.appendChild(titleOfBook);
  bookContainer.appendChild(authorOfBook);
  bookContainer.appendChild(pagesOfBook);
  bookContainer.appendChild(readStatusOfBook);
  bookContainer.appendChild(btnDelete);
  main.appendChild(bookContainer);
}

function deleteBook(e) {
  const bookToDelete = e.target.parentNode;
  const bookToDeleteReference = bookToDelete.getAttribute("data");
  let bookPositionInLibrary = 0;
  bookToDelete.parentNode.removeChild(bookToDelete);
  for (let book in myLibrary) {
    console.log(myLibrary[book].bookReference);
    if (myLibrary[book].bookReference == bookToDeleteReference) {
      myLibrary.splice(bookPositionInLibrary, 1);
      console.log(myLibrary);
      return;
    } else {
      bookPositionInLibrary++;
    }
  }
}

const btnAddBook = document.querySelector("#btnBook");
btnAddBook.addEventListener("click", () => showInputForm());

const btnSubmit = document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click", (e) => {
  addBookToLibrary(e);
});
