function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        let readString = "not read yet"
        if(read == "Y"){
            readString = 'read already'
        }

        return `${this.title} by ${this.author}, ${this.pages}, ${readString}`
    }
}

const myLibrary = [];
const library = document.querySelector(".library")
const modal = document.querySelector("#book-dialog")
const addBookButton = document.querySelector("#show-modal")
const confirmAddButton = document.querySelector("#confirmBtn")
const closeButton = document.querySelector("#closeBtn")
const formData = document.querySelector("#formData")
const bookRows = document.querySelector(".book-rows")

addBookButton.addEventListener("click", ()=>{
    modal.showModal()
})

closeButton.addEventListener("click", (e)=>{
e.preventDefault()
modal.close()
})

formData.addEventListener("submit", (e)=>{
    e.preventDefault()
    let testData = new FormData(formData)
    let title = formData[0].value // another way of getting the form data
    let author = testData.get('book-author')
    let pages = testData.get('book-pages')
    let read = testData.get('book-read')
     addBookToLibrary(title, author, pages, read)
     modal.close()
})

function addBookToLibrary(title, author,pages,read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook)
  displayBooks()
}

function removeBook(bookId){
    myLibrary.splice(bookId,1)
    displayBooks()
}

function displayBooks(){
   bookRows.innerText=""
    myLibrary.forEach((book, index)=>{
        let rowToAdd = document.createElement("tr");
        let titleDetails = document.createElement("td")
        let authorDetails = document.createElement("td")
        let pagesDetail = document.createElement("td")
        let readDetail = document.createElement("td")
        let buttonHolder = document.createElement("td")
        let deleteButton = document.createElement("button")

        rowToAdd.setAttribute("data-id", index)
        deleteButton.setAttribute("class", "remove-book")
        

        titleDetails.innerText = book.title
        authorDetails.innerText = book.author
        pagesDetail.innerText = book.pages
        readDetail.innerText = book.read
        deleteButton.innerText = "Remove"

        buttonHolder.appendChild(deleteButton)
       
        deleteButton.addEventListener('click',()=> {removeBook(index)})


        rowToAdd.appendChild(titleDetails)
        rowToAdd.appendChild(authorDetails)
        rowToAdd.appendChild(pagesDetail)
        rowToAdd.appendChild(readDetail)
        rowToAdd.appendChild(buttonHolder)

        bookRows.appendChild(rowToAdd)
    })
}


console.log(myLibrary)