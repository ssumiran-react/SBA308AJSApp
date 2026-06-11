/*
fullName	string	The full name of the character
nickname	string	The nickname of the character
hogwartsHouse	string	The Hogwarts House this character belong to
interpretedBy	string	The name of the actor/actress the character was interpreted by in the movies
children	object	An array with all the children of the character
image	string	An URL to an image of the character
birthdate	string	The birthdate of the character. Format "Month Day, Year"
*/

/*
https://potterapi-fedeperin.vercel.app/en/characters
https://potterapi-fedeperin.vercel.app/en/characters/random
*/
const basedEnURL = "https://potterapi-fedeperin.vercel.app/en";

// const characterSection = document.createElement("section");
// characterSection.classList = "section";
// characterSection.setAttribute("id", "characters");
const characterFrag = document.createDocumentFragment();

let charactersLs;

export async function getCharactersInfo() {
    characterList();
}

async function characterList() {
    try {
        //Using AXIOS method
        charactersLs = await axios.get(basedEnURL + "/characters", {});

        const navLi = document.getElementById("navCharacters");
        const ul = document.createElement("ul");

        charactersLs.data.forEach(d => {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.textContent = d.nickname;            
            p.style.fontSize = "medium";
            p.addEventListener("click", () => {
                getCharacterInfo(d);
            });
            li.appendChild(p);
            ul.appendChild(li);
        })
        ul.classList = "submenu";
        navLi.appendChild(ul);

        createCarouselItem();

    } catch (err) {
        console.log(" Error: ", err);
    }
}

async function getCharacterInfo(characterInfo) { 
    removeElement("#dataInfo");

    const characterDetail = Object.entries(characterInfo).map(([key, value]) => {
        return { key, value };
    });

    const dataDiv = document.querySelector("#dataDiv");
    const divInfo = document.createElement("div");
    divInfo.setAttribute("id","dataInfo");
    
    for (const b of characterDetail) { //console.log("in clik", b);
        const rowDiv = document.createElement("div");
        rowDiv.classList = "data-row";
        const labDiv = document.createElement("div");
        labDiv.classList = "column-label";
        const valDiv = document.createElement("div");
        valDiv.classList = "column-value";
        const label = document.createElement("label");

        if (b.key == "fullName") { //"number": 1,
            labDiv.textContent = "Full Name:";
            label.textContent = b.value;
        } else if (b.key == "nickname") { //"title": "Harry Potter and the Sorcerer's Stone",
            labDiv.textContent = "Nickname:";
            label.textContent = b.value;
        } else if (b.key == "hogwartsHouse") { //"releaseDate": "Jun 26, 1997",
            labDiv.textContent = "Hogwarts House:";
            label.textContent = b.value;
        } else if (b.key == "interpretedBy") { //"description": 
            labDiv.textContent = "Actor:";
            label.textContent = b.value;
        } else if (b.key == "birthdate") { //"pages": 223,
            labDiv.textContent = "Birth Date:";
            label.textContent = b.value;
        } else if (b.key == "children") { //"originalTitle": "Harry Potter and the Sorcerer's Stone",
            labDiv.textContent = "Children:";
            
            b.value.forEach( c => {
                if(label.textContent == "" ){
                    label.textContent = c;
                } else {
                    label.textContent = label.textContent + ", "+c;
                }
            })
            
        } else if (b.key == "image") { //"cover": "https://raw.githubusercontent.com/fedeperin/potterapi/main/public/images/covers/1.png", 
            continue;
            labDiv.textContent = "Serial Book:";
            label.textContent = b.value;
        } else { //"index": 0
            continue;
        }

        valDiv.appendChild(label);
        rowDiv.appendChild(labDiv);
        rowDiv.appendChild(valDiv);
        divInfo.appendChild(rowDiv);
    }
    dataDiv.appendChild(divInfo);
    // characterFrag.appendChild(dataDiv);
    // characterSection.appendChild(characterFrag);
    // document.body.appendChild(characterSection);
}

async function createCarouselItem() {   //console.log("caro ", booksLs.data);
    removeElement(".carousel-slide");
    removeElement(".carousel-btn");

    const div = document.querySelector("#carouselDiv");
    
    const imgDiv = document.createElement("div");
    imgDiv.classList = "carousel-slide";

    const preBtn = document.createElement("button");
    preBtn.classList = "carousel-btn";
    preBtn.setAttribute("id", "prevBtn");
    preBtn.textContent = "<";
    const nexBtn = document.createElement("button");
    nexBtn.classList = "carousel-btn";
    nexBtn.setAttribute("id", "nextBtn");
    nexBtn.textContent = ">";

    let bImg = 0;
    for (bImg in charactersLs.data) {
        const img = document.createElement("img");
        img.src = charactersLs.data[bImg].image;
        img.alt = charactersLs.data[bImg].fullName;
        imgDiv.appendChild(img);
    }
    //console.log("mg ", bImg);
    let cnt = 0;
    preBtn.addEventListener('click', () => { //console.log(cnt, "  cnt preBtn mg ", (-cnt * 25));
        if (cnt <= 0) {
            cnt = bImg - 3;
        } else {
            cnt--;
        }
        imgDiv.style.transform = 'translateX(' + (-cnt * 25) + '%)';
    })

    nexBtn.addEventListener('click', () => { 
        // Loop back to the first image if at the end
        if (cnt >= bImg - 3) {
            cnt = 0;
        } else {
            cnt++;
        }
        imgDiv.style.transform = 'translateX(' + ( -cnt * 25) + '%)';
        //console.log(cnt, "  cnt nexBtn mg ", (-cnt * 25));
    });

    div.appendChild(preBtn);
    div.appendChild(nexBtn);
    div.appendChild(imgDiv);
    // characterFrag.appendChild(div);
    // characterSection.appendChild(characterFrag);
    // document.body.appendChild(characterSection);
}

async function removeElement(elClass) {
    const container = document.querySelectorAll(elClass);
    
    if (container) { // console.log (" in conter", elClass);
        container.forEach(el => {
            el.remove();
        });
    }
}
