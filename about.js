
export async function getHousesInfo() {
    houseList();
}

async function houseList() {
    try {
        removeElement(".carousel-slide");
        removeElement(".carousel-btn");
        removeElement("#dataInfo");

        const dataDiv = document.querySelector("#dataDiv");
        const divInfo = document.createElement("div");
        divInfo.setAttribute("id", "dataInfo");

        const text = document.createElement("text");
        text.textContent =
            `Harry Potter is a series of seven children's fantasy novels written by British author 
        J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his 
        friends, Ron Weasley and Hermione Granger, among others, all of whom are students at 
        Hogwarts School of Witchcraft and Wizardry. The main story arc concerns Harry's conflict
        with Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard 
        governing body known as the Ministry of Magic, and subjugate all wizards and non - magical
        people, known in -universe as Muggles.`;

        divInfo.appendChild(text);
        dataDiv.appendChild(divInfo);
    } catch (err) {
        console.log(" Error: ", err);
    }
}
async function removeElement(elClass) {
    const container = document.querySelectorAll(elClass);

    if (container) {  //console.log (" in conter", elClass);
        container.forEach(el => {
            el.remove();
        });
    }
}