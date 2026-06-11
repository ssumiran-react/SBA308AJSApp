/*
https://potterapi-fedeperin.vercel.app/en/houses
https://potterapi-fedeperin.vercel.app/en/houses/random
*/
const basedEnURL = "https://potterapi-fedeperin.vercel.app/en";

// const houseSection = document.createElement("section");
// houseSection.classList = "section";
// houseSection.setAttribute("id", "houses");
const houseFrag = document.createDocumentFragment();

let housesLs;

export async function getHousesInfo() {
    houseList();
}

async function houseList() {
    try {
        //Using AXIOS method
        housesLs = await axios.get(basedEnURL + "/houses", {});

        const navLi = document.getElementById("navHouses");
        const ul = document.createElement("ul");

        housesLs.data.forEach(d => {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.textContent = d.house;
            p.style.fontSize = "medium";
            p.addEventListener("click", () => {
                getHouseInfo(d);
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

async function getHouseInfo(houseInfo) { 
    removeElement("#dataInfo");

    const houseDetail = Object.entries(houseInfo).map(([key, value]) => {
        return { key, value };
    });

    const dataDiv = document.querySelector("#dataDiv");
    const divInfo = document.createElement("div");
    divInfo.setAttribute("id", "dataInfo");

    for (const b of houseDetail) { //console.log("in clik", b);
        const rowDiv = document.createElement("div");
        rowDiv.classList = "data-row";
        const labDiv = document.createElement("div");
        labDiv.classList = "column-label";
        const valDiv = document.createElement("div");
        valDiv.classList = "column-value";
        const label = document.createElement("label");

        if (b.key == "house") { //"number": 1,
            labDiv.textContent = "Hagwarts house:";
            label.textContent = b.value;
        } else if (b.key == "founder") { //"title": "Harry Potter and the Sorcerer's Stone",
            labDiv.textContent = "Founder:";
            label.textContent = b.value;
        } else if (b.key == "animal") { //"releaseDate": "Jun 26, 1997",
            labDiv.textContent = "Animal:";
            label.textContent = b.value;
        } else if (b.key == "colors") { //"originalTitle": "Harry Potter and the Sorcerer's Stone",
            labDiv.textContent = "Colors:";
            
            b.value.forEach( c => {
                if(label.textContent == "" ){
                    label.textContent = c;
                }else{    
                    label.textContent = label.textContent + ", "+c;
                }
            })
        } else { //"index": 0
            continue;
        }

        valDiv.appendChild(label);
        rowDiv.appendChild(labDiv);
        rowDiv.appendChild(valDiv);
        divInfo.appendChild(rowDiv);
    }
    dataDiv.appendChild(divInfo);
    // houseFrag.appendChild(dataDiv);
    // houseSection.appendChild(houseFrag);
    // document.body.appendChild(houseSection);
}

async function createCarouselItem() {   
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
    for (bImg in housesLs.data) {
        const p = document.createElement("p");
        p.textContent = housesLs.data[bImg].emoji + " "+ housesLs.data[bImg].house;
        //img.src = housesLs.data[bImg].emoji;
        //img.alt = housesLs.data[bImg].house;
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

    //div.appendChild(preBtn);
    //div.appendChild(nexBtn);
    div.appendChild(imgDiv);
    // houseFrag.appendChild(div);
    // houseSection.appendChild(houseFrag);
    // document.body.appendChild(houseSection);
}

async function removeElement(elClass) {
    const container = document.querySelectorAll(elClass);
    
    if (container) {  //console.log (" in conter", elClass);
        container.forEach(el => {
            el.remove();
        });
    }
}