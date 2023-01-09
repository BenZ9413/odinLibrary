let myLibrary = [];
let bookCount = 0;

function Book() {}

function addBookToLibrary() {
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

function changeReadStatusOfBook(e) {
  const readStatusElement = e.target.previousElementSibling;
  const bookToChangeReadStatusReference =
    e.target.parentNode.parentNode.getAttribute("data");
  for (let book in myLibrary) {
    if (myLibrary[book].bookReference == bookToChangeReadStatusReference) {
      if (myLibrary[book].readStatus == "yes") {
        myLibrary[book].readStatus = "no";
        readStatusElement.textContent = "Read: no";
      } else {
        myLibrary[book].readStatus = "yes";
        readStatusElement.textContent = "Read: yes";
      }
    }
  }
}

function deleteBook(e) {
  const bookToDelete = e.target.parentNode;
  const bookToDeleteReference = bookToDelete.getAttribute("data");
  let bookPositionInLibrary = 0;
  bookToDelete.parentNode.removeChild(bookToDelete);
  for (let book in myLibrary) {
    if (myLibrary[book].bookReference == bookToDeleteReference) {
      myLibrary.splice(bookPositionInLibrary, 1);
      return;
    } else {
      bookPositionInLibrary++;
    }
  }
}

function formValidation(e) {
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

const btnAddBook = document.querySelector("#btnBook");
btnAddBook.addEventListener("click", () => showInputForm());

const btnSubmit = document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click", (e) => {
  if (formValidation(e)) {
    addBookToLibrary();
  }
});
