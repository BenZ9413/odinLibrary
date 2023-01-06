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

const btnAddBook = document.querySelector("#btnBook");
btnAddBook.addEventListener("click", () => showInputForm());

const btnSubmit = document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click", (e) => {
  addBookToLibrary(e);
});
