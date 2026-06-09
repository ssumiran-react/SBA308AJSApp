/*
https://potterapi-fedeperin.vercel.app/en/books
https://potterapi-fedeperin.vercel.app/en/books/random
*/
const basedEnURL="https://potterapi-fedeperin.vercel.app/en";

const bookSection = document.createElement("section");
bookSection.classList = "section";
bookSection.setAttribute("id","books");
const bookFrag = document.createDocumentFragment();
const cDiv = document.createElement("div");

const infoDiv = document.createElement("div");


export let booksLs;

export async function getBooksInfo() { 
    bookList();
    return booksLs;
    // bookSection.appendChild(bookFrag);
    // document.body.appendChild(bookSection);
}

export async function bookList() {
  try {
    //Using AXIOS method
    booksLs = await axios.get(basedEnURL + "/books", { });

    const navLi = document.getElementById("navBooks");
    const ul = document.createElement("ul");
    
    booksLs.data.forEach(d => {
        const li = document.createElement("li");
        const a = document.createElement("p");
        //a.href = d.number;
        a.textContent = d.title;
        a.addEventListener("click", () => { console.log("in clik");
            getBookInfo(d);
        });
        li.appendChild(a);
        ul.appendChild(li);
    })
    ul.classList = "submenu";
    navLi.appendChild(ul);
    
    createCarouselItem();
    
  } catch (err) {
    console.log(" Error: ", err);
  }

}

function getBookInfo(bookDetail){
    const dataDiv = document.createElement("div");
    dataDiv.classList.add = "data-container";
    
    for (const b in bookDetail){
        
        const rowDiv = document.createElement("div");
        rowDiv.classList.add = "data-row";
        const labDiv = document.createElement("div");
        labDiv.classList.add = "column-label";
        const valDiv = document.createElement("div");
        valDiv.classList.add = "column-value";
        const span = document.createElement("span");
        span.classList.add = "placeholder";

        if(b==0){ //"number": 1,
            rowDiv.textContent="Serial Book:";
            span.textContent=bookDetail[b].number;
        }
        if(b==1){ //"title": "Harry Potter and the Sorcerer's Stone",
            rowDiv.textContent="Title:";
            span.textContent=bookDetail[b].title;
        }
        if(b==2){ //"originalTitle": "Harry Potter and the Sorcerer's Stone",
            break;
            rowDiv.textContent="Original Title:";
            span.textContent=bookDetail[b].originalTitle;
        }
        if(b==3){ //"releaseDate": "Jun 26, 1997",
            rowDiv.textContent="Release Date:";
            span.textContent=bookDetail[b].releaseDate;
        }
        if(b==4){ //"description": 
            rowDiv.textContent="Description:";
            span.textContent=bookDetail[b].description;
        }
        if(b==5){ //"pages": 223,
            rowDiv.textContent="Pages:";
            span.textContent=bookDetail[b].pages;
        }
        if(b==6){ //"cover": "https://raw.githubusercontent.com/fedeperin/potterapi/main/public/images/covers/1.png", 
            break;
            rowDiv.textContent="Serial Book:";
            span.textContent=bookDetail[b].cover;
        }
        if(b==7){ //"index": 0
            break;
        }else{
            break;
        }
           
        valDiv.appendChild(span);
        rowDiv.appendChild(labDiv);
        rowDiv.appendChild(valDiv);
        dataDiv.appendChild(rowDiv);
    }
    document.body.appendChild(dataDiv);
}

export async function createCarouselItem(){   //console.log("caro ", booksLs.data);
    const div = document.createElement("div");
    div.classList.add = "carousel-container";
    const imgDiv = document.createElement("div");
    imgDiv.classList.add = "carousel-slide";
    const preBtn = document.createElement("button");
    preBtn.classList.add = "carousel-btn";
    preBtn.setAttribute("id","prevBtn");
    preBtn.textContent = "#10094";
    const nexBtn = document.createElement("button");
    nexBtn.classList.add = "carousel-btn";
    nexBtn.setAttribute("id","prevBtn");
    nexBtn.textContent = "#10095";

    let bImg=0;
    for ( bImg in booksLs.data){
        const img = document.createElement("img");
        img.src = booksLs.data[bImg].cover;
        img.alt = booksLs.data[bImg].title;
        imgDiv.appendChild(img);
    }
    console.log("mg ",bImg);
    let cnt = 0;

    preBtn.addEventListener('click', () => {
      if (cnt <= 0) {
        cnt = bImg - 1;
      } else {
        cnt--;
      }
      updateCarousel();
    })

    nexBtn.addEventListener('click', () => {
      // Loop back to the first image if at the end
      if (cnt >= bImg - 1) {
        cnt = 0;
      } else {
        cnt++;
      }
      updateCarousel();
    });

    function updateCarousel() {  //move image to left or right based on the cnt
      imgDiv.style.transform = 'translateX(' + (-cnt * 100) + '%)';
    }

    div.appendChild(preBtn);
    div.appendChild(nexBtn);
    div.appendChild(imgDiv);
    bookFrag.appendChild(div);
    bookSection.appendChild(bookFrag);
    document.body.appendChild(bookSection);
}
  

