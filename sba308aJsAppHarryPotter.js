import * as book from "./books.js";
import * as character from "./characters.js";
import * as house from "./houses.js";
import * as spell from "./spells.js";
import * as about from "./about.js";

mainPage();

function mainPage() {
    const navBook = document.getElementById("navBooks");
    const navCharacter = document.getElementById("navCharacters");
    const navSpell = document.getElementById("navSpells");
    const navHouse = document.getElementById("navHouses");
    const navAbout = document.getElementById("navAbout");
    book.getBooksInfo();
    
    navBook.addEventListener("click", ()=>{
        book.getBooksInfo();
    });
    navCharacter.addEventListener("click", ()=>{
        character.getCharactersInfo();
    });
    navSpell.addEventListener("click", ()=>{
        spell.getSpellsInfo();
    });
    navHouse.addEventListener("click", ()=>{
        house.getHousesInfo();
    });
    navAbout.addEventListener("click", ()=>{
        about.getHousesInfo();
    });
}


