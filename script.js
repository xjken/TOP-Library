const myLibrary = [];

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

// Some books to fill the array
addBookToLibrary(myLibrary,'The Hobbit', 'J.R.R Tolkier', 295, 2003, false);
addBookToLibrary(myLibrary, "1984", "George Orwell", 328, 1949, true);
addBookToLibrary(myLibrary, "To Kill a Mockingbird", "Harper Lee", 281, 1960, true);
addBookToLibrary(myLibrary, "Pride and Prejudice", "Jane Austen", 432, 1813, false);
addBookToLibrary(myLibrary, "The Great Gatsby", "F. Scott Fitzgerald", 180, 1925, true);
addBookToLibrary(myLibrary, "Dune", "Frank Herbert", 412, 1965, false);
addBookToLibrary(myLibrary, "The Catcher in the Rye", "J.D. Salinger", 214, 1951, false);
addBookToLibrary(myLibrary, "Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, 1997, true);
addBookToLibrary(myLibrary, "The Alchemist", "Paulo Coelho", 208, 1988, false);
addBookToLibrary(myLibrary, "The Little Prince", "Antoine de Saint-Exupéry", 96, 1943, true);


const bookContainer = document.querySelector(".book-container");
// bookContainer.textContent=showAllBookFromLibrary(myLibrary);