document.addEventListener('DOMContentLoaded', () => {
    let title, author, pages, checkValue;
    const form = document.querySelector("#myForm");
    const main = document.querySelector("main");
    const mylibrary = [
        {
            
        }
    ];

   

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        title = document.querySelector("#title").value;
        author = document.querySelector("#author").value;
        pages = document.querySelector("#pages").value;
        const checkbox = document.querySelector("#read");

        checkValue = checkbox.checked ? "Yes" : "Not yet";

        addBookToLibrary();
        form.reset();
    });

    function Book(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    Book.prototype.toggleReadStatus = function() {
        this.read = this.read === "Yes" ? "Not yet" : "Yes";
    };

    function addBookToLibrary() {
        const book = new Book(title, author, pages, checkValue);
        mylibrary.push(book);
        displayBooks(book);
    }

    function displayBooks(book) {
        console.log('Displaying book:', book); // Debugging line

        const newBook = document.createElement("div");
        newBook.className = "card";
        newBook.dataset.title = book.title;

        const newTitle = document.createElement("h3");
        newTitle.textContent = `Title: ${book.title}`;
        newBook.appendChild(newTitle);

        const newAuthor = document.createElement("p");
        newAuthor.textContent = `Author: ${book.author}`;
        newBook.appendChild(newAuthor);

        const newPages = document.createElement("p");
        newPages.textContent = `Pages: ${book.pages}`;
        newBook.appendChild(newPages);

        const newRead = document.createElement("p");
        newRead.className = "read-status";
        newRead.textContent = `Did you read it? : ${book.read}`;
        newBook.appendChild(newRead);

        const newToggleBtn = document.createElement("button");
        newToggleBtn.className = "toggleRead";
        newToggleBtn.textContent = book.read === "Yes" ? "Mark as Unread" : "Mark as Read";
        newBook.appendChild(newToggleBtn);

        const newRemoveBtn = document.createElement("button");
        newRemoveBtn.textContent = "Delete";
        newRemoveBtn.className = "deleteBook";
        newBook.appendChild(newRemoveBtn);

        newToggleBtn.addEventListener("click", (event) => {
            const parentDiv = event.target.parentElement;
            const titleToToggle = parentDiv.dataset.title;

            const bookToToggle = mylibrary.find(b => b.title === titleToToggle);
            if (bookToToggle) {
                bookToToggle.toggleReadStatus();
                parentDiv.querySelector(".read-status").textContent = `Did you read it? : ${bookToToggle.read}`;
                event.target.textContent = bookToToggle.read === "Yes" ? "Mark as Unread" : "Mark as Read";
            }
        });

        newRemoveBtn.addEventListener("click", (event) => {
            const parentDiv = event.target.parentElement;
            const titleToRemove = parentDiv.dataset.title;

            parentDiv.remove();

            const index = mylibrary.findIndex(b => b.title === titleToRemove);
            if (index > -1) {
                mylibrary.splice(index, 1);
            }
        });

        main.appendChild(newBook);
    }
});
