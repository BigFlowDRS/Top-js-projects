const myLibrary = [];
const container = document.querySelector(".container");

function add_card_buttons(){
    const buttons = document.createElement('div');
    const a = document.createElement('button');
    const b = document.createElement('button');

    a.innerHTML = "Change Read";
    b.innerHTML = "Remove";

    a.classList.add("change_read");
    b.classList.add("remove");

    a.addEventListener("click", change_read)
    b.addEventListener("click", remove_card);

    buttons.appendChild(a);
    buttons.appendChild(b);

    buttons.classList.add("buttons");

    return buttons;
}

function change_read(e){
    const _card = e.target.parentElement.parentElement;

    const index = parseInt(_card.id);

    let rd = (myLibrary[parseInt(index)].read);
    myLibrary[parseInt(index)].read = !rd;

    _card.children[1].innerHTML = myLibrary[index].info();
}

function remove_card(e){
    const del_card = e.target.parentElement.parentElement;

    const index = parseInt(del_card.id);

    myLibrary.splice(index,1);
    display_book();
}

function read_or_not(read){
    let st = "not read";

    if(read) st = "read";

    return st;
}

function Book(title, author, total_pages, read){
    this.title = title;
    this.author = author;
    this.total_pages = total_pages;
    this.read = read;

    this.info = function(){
        return  this.title + " by " + 
                this.author + ", " + 
                this.total_pages + " pages, " + 
                read_or_not(this.read);
    }
}

function create_card(i){
    const new_book = document.createElement('div');
    const book_name = document.createElement('h2');
    const book_info = document.createElement('p');

    book_name.innerHTML = myLibrary[i].title;
    
    book_info.innerHTML = myLibrary[i].info();

    new_book.appendChild(book_name);
    new_book.appendChild(book_info);
    new_book.appendChild(add_card_buttons());

    new_book.classList.add('book_card');
    new_book.style.backgroundImage = `url(https://picsum.photos/1500/2100?random=${Math.random()}`;
    new_book.id = i;

    return new_book;
}

function addBookToLibrary(title, author, total_pages, read){
    const book = new Book(title,author, total_pages,read);

    myLibrary.push(book);
    display_book();
}

function display_book(){
    container.innerHTML = "";
    const len = myLibrary.length;

    for(let i = 0; i < len; i++){
        container.appendChild(create_card(i));
    }
}

addBookToLibrary("The Great Gatsby","F. Scott Fitzgerald", 180, false);
addBookToLibrary("To Kill a Mockingbird","Harper Lee",281,true)

addBookToLibrary("The Great Gatsby","F. Scott Fitzgerald", 180, false);
addBookToLibrary("To Kill a Mockingbird","Harper Lee",281,true)
addBookToLibrary("The Great Gatsby","F. Scott Fitzgerald", 180, false);
addBookToLibrary("To Kill a Mockingbird","Harper Lee",281,true)

addBookToLibrary("1984","George Orwell",328,"Yes");


//form functions
// Function to open the dialog
function openDialog() {
    document.getElementById('bookDialog').showModal();
}

// Function to close the dialog
function closeDialog() {
    document.getElementById('bookDialog').close();
}

// Add event listener to handle form submission
document.getElementById('bookForm').addEventListener('submit', function(event) {
    // Prevent the form from actually submitting (i.e., reloading the page)
    event.preventDefault();

    // Get the values of the form fields
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const totalPages = document.getElementById('total_pages').value;
    const read = document.getElementById('read').checked;

    closeDialog();
    document.getElementById('bookForm').reset();
    

    addBookToLibrary(title,author,totalPages,read);
});


// const rb = document.querySelector(".remove");
// rb.addEventListener("click", function(e){
//     console.log(e);
//     console.log(e.target.parentElement.id);
// })