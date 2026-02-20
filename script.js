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

function addBookToLibrary(library, title, author, pages, yearPublished,isRead){
    const newBook = new Book(title, author, pages, yearPublished, isRead);

    library.push(newBook);
}
