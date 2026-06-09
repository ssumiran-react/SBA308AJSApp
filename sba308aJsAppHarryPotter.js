import * as book from "./books.js";

mainPage();
let navPage;

async function mainPage() {
    generateSubMenu("books");
    
}

async function generateSubMenu(navPage) { 
    
    const bookLs= book.getBooksInfo();
    
    //console.log("in b", booksLs);
}
