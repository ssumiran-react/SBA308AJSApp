/*
https://potterapi-fedeperin.vercel.app/en/spells
https://potterapi-fedeperin.vercel.app/en/spells/random
*/
const basedEnURL = "https://potterapi-fedeperin.vercel.app/en";

// const spellSection = document.createElement("section");
// spellSection.classList = "section";
// spellSection.setAttribute("id", "spells");
const spellFrag = document.createDocumentFragment();

let spellsLs;

export async function getSpellsInfo() {
    spellList();
}

async function spellList() {
    try {
        //Using AXIOS method
        spellsLs = await axios.get(basedEnURL + "/spells", {});

        const navLi = document.getElementById("navSpells");
        const ul = document.createElement("ul");

        spellsLs.data.forEach(d => {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.textContent = d.spell;
            p.style.fontSize = "medium";
            p.addEventListener("click", () => {
                getSpellInfo(d);
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

async function getSpellInfo(spellInfo) { 
    removeElement("#dataInfo");
    
    const spellDetail = Object.entries(spellInfo).map(([key, value]) => {
        return { key, value };
    });
    
    const dataDiv = document.querySelector("#dataDiv");
    const divInfo = document.createElement("div");
    divInfo.setAttribute("id", "dataInfo");    

    for (const b of spellDetail) { //console.log("in clik", b);
        const rowDiv = document.createElement("div");
        rowDiv.classList = "data-row";
        const labDiv = document.createElement("div");
        labDiv.classList = "column-label";
        const valDiv = document.createElement("div");
        valDiv.classList = "column-value";
        const label = document.createElement("label");

        if (b.key == "spell") { //"number": 1,
            labDiv.textContent = "Spell:";
            label.textContent = b.value;
        } else if (b.key == "use") { //"title": "Harry Potter and the Sorcerer's Stone",
            labDiv.textContent = "It uses:";
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
    // spellFrag.appendChild(dataDiv);
    // spellSection.appendChild(spellFrag);
    // document.body.appendChild(spellSection);
}

async function createCarouselItem() { 
    removeElement(".carousel-slide");
    removeElement(".carousel-btn");

    /*
    const div = document.querySelector("#carouselDiv");

    const div = document.createElement("div");
    div.classList = "carousel-container";
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
    for (bImg in spellsLs.data) {
        const p = document.createElement("p");
        p.textContent = spellsLs.data[bImg].spell + " \n"+ spellsLs.data[bImg].use;
        imgDiv.appendChild(p);
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
    spellFrag.appendChild(div);
    spellSection.appendChild(spellFrag);
    document.body.appendChild(spellSection);
    */
}

async function removeElement(elClass) {
    const container = document.querySelectorAll(elClass);
    
    if (container) { // console.log (" in conter", elClass);
        container.forEach(el => {
            el.remove();
        });
    }
}