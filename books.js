/*
https://potterapi-fedeperin.vercel.app/en/books
https://potterapi-fedeperin.vercel.app/en/books/random
*/
const basedEnURL = "https://potterapi-fedeperin.vercel.app/en";

// const bookSection = document.createElement("section");
// bookSection.classList = "section";
//bookSection.setAttribute("id", "books");
const bookFrag = document.createDocumentFragment();

let booksLs;

export async function getBooksInfo() {
    bookList();
}

async function bookList() {
    try {
        //Using AXIOS method
        booksLs = await axios.get(basedEnURL + "/books", {});

        const navLi = document.getElementById("navBooks");
        const ul = document.createElement("ul");

        booksLs.data.forEach(d => {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.textContent = d.title;
            p.style.fontSize = "medium";
            p.addEventListener("click", () => {
                getBookInfo(d);
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

async function getBookInfo(bookInfo) {
    //Array.from.bookDetail.forEach(b => console.log("in clik"));
    const bookDetail = Object.entries(bookInfo).map(([key, value]) => {
        return { key, value };
    });

    const hasDivInfo = document.querySelector("#dataInfo");
    if (hasDivInfo) {
        hasDivInfo.remove();
    }

    const dataDiv = document.querySelector("#dataDiv");
    const divInfo = document.createElement("div");
    divInfo.setAttribute("id", "dataInfo");

    for (const b of bookDetail) {
        const rowDiv = document.createElement("div");
        rowDiv.classList = "data-row";
        const labDiv = document.createElement("div");
        labDiv.classList = "column-label";
        const valDiv = document.createElement("div");
        valDiv.classList = "column-value";
        const label = document.createElement("label");

        if (b.key == "number") { //"number": 1,
            labDiv.textContent = "Book Serial:";
            label.textContent = b.value;
        } else if (b.key == "title") { //"title": "Harry Potter and the Sorcerer's Stone",
            labDiv.textContent = "Title:";
            label.textContent = b.value;
        } else if (b.key == "releaseDate") { //"releaseDate": "Jun 26, 1997",
            labDiv.textContent = "Release Date:";
            label.textContent = b.value;
        } else if (b.key == "description") { //"description": 
            labDiv.textContent = "Description:";
            label.textContent = b.value;
        } else if (b.key == "pages") { //"pages": 223,
            labDiv.textContent = "Pages:";
            label.textContent = b.value;
        } else if (b.key == "originalTitle") { //"originalTitle": "Harry Potter and the Sorcerer's Stone",
            continue;
            labDiv.textContent = "Original Title:";
            label.textContent = b.value;
        } else if (b.key == "cover") { //"cover": "https://raw.githubusercontent.com/fedeperin/potterapi/main/public/images/covers/1.png", 
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
    // dataFrag.appendChild(dataDiv);
    // bookSection.appendChild(bookFrag);
    // document.body.appendChild(bookSection);
}

async function createCarouselItem() {   //console.log("caro ", booksLs.data);
    const div = document.querySelector("#carouselDiv");

    const hasImgDiv = document.querySelectorAll(".carousel-slide");
    if (hasImgDiv) { //console.log("caro t");
        hasImgDiv.forEach(el => {
            el.remove();
            //console.log("in rev el");
        });
    }

    const btns = document.querySelectorAll(".carousel-btn");
    if (btns) {                                              //console.log("btns t");
        btns.forEach(el => {
            el.remove();
            //console.log("in rev el");
        });
    }

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
    for (bImg in booksLs.data) {
        const img = document.createElement("img");
        img.src = booksLs.data[bImg].cover;
        img.alt = booksLs.data[bImg].title;
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
        imgDiv.style.transform = 'translateX(' + (-cnt * 25) + '%)';
        //console.log(cnt, "  cnt nexBtn mg ", (-cnt * 25));
    });


    div.appendChild(preBtn);
    div.appendChild(nexBtn);
    div.appendChild(imgDiv);

    // bookFrag.appendChild(div);
    // bookSection.appendChild(bookFrag);
    // document.body.appendChild(bookSection);
}

async function removeElement(elClass) {
    const containr = document.body.querySelector(elClass);//   ".carousel-container");
    console.log(" removeElement ", containr);
    if (elClass == ".section") {

    }
    if (containr) {
        console.log(" in remove ", elClass);
        containr.remove();
    }
}