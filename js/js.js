let myLibrary = [];
let bookCount = 0;

function Book() {}

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
  let titleOfBook = document.createElement("div");
  titleOfBook.textContent = lastBookAdded.title;
  let authorOfBook = document.createElement("div");
  authorOfBook.textContent = lastBookAdded.author;
  let pagesOfBook = document.createElement("div");
  pagesOfBook.textContent = lastBookAdded.pages;
  bookContainer.appendChild(titleOfBook);
  bookContainer.appendChild(authorOfBook);
  bookContainer.appendChild(pagesOfBook);
  main.appendChild(bookContainer);
}

const btnAddBook = document.querySelector("#btnBook");
btnAddBook.addEventListener("click", () => showInputForm());

const btnSubmit = document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click", (e) => {
  addBookToLibrary(e);
});
