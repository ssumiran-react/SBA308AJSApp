import * as book from "./books.js";
import * as character from "./characters.js";

mainPage();
let navPage;

async function mainPage() {
    generateSubMenu("books");
    
}

async function generateSubMenu(navPage) { 
    
    const bookLs= character.getCharactersInfo();
    
    //console.log("in b", booksLs);
}
