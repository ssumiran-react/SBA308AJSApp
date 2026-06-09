import * as book from "./books.js";
import * as character from "./characters.js";
import * as house from "./houses.js";

mainPage();
let navPage;

async function mainPage() {
    generateSubMenu("books");
    
}

async function generateSubMenu(navPage) { 
    
    const bookLs= house.getHousesInfo();
    
    //console.log("in b", booksLs);
}
