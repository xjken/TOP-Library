const myLibrary = [];
// Some books to fill the array
{
    addBookToLibrary(myLibrary,'The Hobbit', 'J.R.R Tolkien', 295, 2003, false);
    addBookToLibrary(myLibrary, "1984", "George Orwell", 328, 1949, true);
    addBookToLibrary(myLibrary, "To Kill a Mockingbird", "Harper Lee", 281, 1960, true);
    addBookToLibrary(myLibrary, "Pride and Prejudice", "Jane Austen", 432, 1813, false);
    addBookToLibrary(myLibrary, "The Great Gatsby", "F. Scott Fitzgerald", 180, 1925, true);
    addBookToLibrary(myLibrary, "Dune", "Frank Herbert", 412, 1965, false);
    addBookToLibrary(myLibrary, "The Catcher in the Rye", "J.D. Salinger", 214, 1951, false);
    addBookToLibrary(myLibrary, "Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, 1997, true);
    addBookToLibrary(myLibrary, "The Alchemist", "Paulo Coelho", 208, 1988, false);
    addBookToLibrary(myLibrary, "The Little Prince", "Antoine de Saint-Exupéry", 96, 1943, true);
}

function Book(title, author, pages, yearPublished,isRead){
    if(!new.target){
        throw Error("Must use new operator")
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.yearPublished = yearPublished;
    this.isRead = isRead;
}

Book.prototype.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead? "read" : "not read yet"}. `
}

Book.prototype.toggleRead = function(){
    if(this.isRead === true){
        this.isRead = false;
    } else{
        this.isRead = true;
    }
}

function addBookToLibrary(library, title, author, pages, yearPublished,isRead){
    const newBook = new Book(title, author, pages, yearPublished, isRead);

    library.push(newBook);
}

function showAllBookFromLibrary(library){
    let string = "";
    for(const book of library){
        string+= book.info();
    }
    return string;
} 

const booksContainer = document.querySelector(".books-container");

const createBookCard = function(book){
    const bookCard = document.createElement("div");
    bookCard.dataset.id = book.id;
    // console.log(bookCard.dataset.id)
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `
        <p class="book-title">${book.title}</p>
        <p class="book-author-year">${book.author}, ${book.yearPublished}</p>
        <p class="book-pages">${book.pages} pages</p>
        <div class="book-card-btn-row">
            <button class="book-read">${book.isRead ? "Finished" : "not read yet"}</button>
            <button class="book-delete"><img src="icons/delete-outline.svg" alt=""></button>
        </div>
    `
    return bookCard;
}

const addLibraryToContainer = function(){
    for (const book of myLibrary){
        booksContainer.appendChild(createBookCard(book))
    }
}
addLibraryToContainer();

const reloadContainer =  function(){
    booksContainer.innerHTML ="";
    addLibraryToContainer();
}

const readButtons = document.querySelectorAll(".book-read");

// THIS EVENT LISTENER DOES NOT WORK AFTER FIRST CLICK
// readButtons.forEach(readButton => {
//     readButton.addEventListener("click", function(){
//         const card = readButton.closest(".book-card");
//         const book = myLibrary.find(book => book.id === card.dataset.id);
//         book.toggleRead();
//         clearContainer();
//         addLibraryToContainer();
//     })
// });

//USE EVENT DELEGATION INSTEAD
document.addEventListener('click', e=>{
    //handle read button
    if(e.target.matches(".book-read")){
        const card = e.target.closest(".book-card");
        const book = myLibrary.find(book => book.id === card.dataset.id);
        book.toggleRead();
        reloadContainer()
    }
    //handle remove button
    if(e.target.matches(".book-delete")){
        const bookCard = e.target.closest(".book-card");
        const bookIndex = myLibrary.findIndex(book=>book.id === bookCard.dataset.id);
        console.log(bookIndex);
        myLibrary.splice(bookIndex, 1)
        reloadContainer();
    }
})

const addBookButton = document.querySelector(".add-book")
const addBookModal = document.querySelector(".add-book-modal")
const closeBookModal = document.querySelector('.close-book-modal')
const submitBookButton = document.querySelector(".submit-book-btn")
const form = document.querySelector('.modal-content')
addBookButton.addEventListener('click', (e)=>{
    addBookModal.showModal();
})
closeBookModal.addEventListener('click', (e)=>{
    addBookModal.close();
})
submitBookButton.addEventListener('click',(e)=>{
    e.preventDefault(); 

    const data = new FormData(form);

    addBookToLibrary(myLibrary,
        data.get("book-title"),
        data.get("book-author"),
        Number(data.get("book-pages")),
        Number(data.get("book-year")),
        data.get("book-read")=== "on"
    );

    modal.close();
    reloadContainer();
})
