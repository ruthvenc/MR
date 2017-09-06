// Suraskite H1 DOM elementą pagal klasę ir priskirkime jį kintamąjam
let titleElement = document.getElementsByClassName("main-title")[0];


// Pakeiskime H1 title pavadinima
titleElement.innerHTML = "Muzikos albumai";


// Pridėkime padildomą klasę H1
titleElement.classList.add("header-title");


// Pakeiskime stiliųs
titleElement.style.fontStyle = "italic";



// Surandame formos mygtuką "Pridėti"
// suras pirmą DOM elementą su klase .btn-save-album
let addAlbumButton = document.querySelector(".btn-save-album");

// metodas .querySelectorAll() suranda visus elementus su klase .btn-save-album
// let addAlbumButton = document.querySelectorAll(".btn-save-album");

// Kai paspaudžiamas mygtukas, vykdyk addAlbum funkciją
addAlbumButton.addEventListener("click", addAlbum);


// Čia saugosim visus albumus
let albumsJSON = localStorage.getItem("albums");
let albums = JSON.parse(albumsJSON);

// Formos elementai
let artistElement = document.querySelector("#artist");
let albumElement = document.querySelector("#album");
let releaseDateElement = document.querySelector("#releaseDate");
let imageElement = document.querySelector("#image");


function addAlbum() {
    // nuskaitome laukelių reikšmes
    let artist = artistElement.value;
    let album = albumElement.value;
    let date = releaseDateElement.value;
    let image = imageElement.files[0];

    if (!artist || !album || !date || !image) {
        console.log("Neįvesti laukeliai");
        return;
    }

    let record = {
        "artist": artist,
        "album": album,
        "date": date,
        "image": image.name
    }

    // Patikrinime ar albumas jau buvo įvestas
    if (checkForDuplicates(record)) {
        alert("Toks albumas jau išsaugotas");
        return;
    }

    // Saugome albumą
    albumList.push(record);

    // ivestus duomenis issaugosime i LocalStorage
    let albumsJSON = JSON.stringify(albumList);
    localStorage.setItem("albums", albumsJSON);



    console.log("Duomenys:", artist, album, date, image);
}

function checkForDuplicates(record) {
    let isDuplicate = false;
    albumList.forEach(function (item) {
        if (item.artist === record.artist && item.album === record.album && item.date === record.date) {
            isDuplicate = true;
        }
    })
    return isDuplicate;
};

//duomenu atvaizdavimas
let albumListElement = document.querySelector(".album-list");

let result = `
    <div class="album">
        <img src="img/R-365109-1390519203-2623.jpeg.jpg" alt="Chemical Brothers - Push the button">
        <h2>Chemical Brothers <span> Push the button</span></h2>
        <date>2004</date>
    </div>
`;
function renderAlbums() {

    // gauname albumus is Local Storage ir sukuriame objekta
    let albumsJSON = localStorage.getItem("albums");
    let albums = JSON.parse(albumsJSON);

    //patikrinti ar yra issaugotu albumu
    //jei nera, nutraukti funkcijos vykdyma
    if (!albums) return;

    //jei yra, kuriame cikla ir i rezultata susidedam visu albumu HTML
    let result = ""
    for (let album of albums) {
        result = `
            <div class="album">
            <img src="img/${album.image}" alt="${album.artist} - ${album.album}">
            <h2>${album.album}<span>${album.artist}</span></h2>
            <date>${album.date}</date>
            </div>
            <hr>
        `;

    }
    //duomenu atvaizdavimas
    //spausdiname rezultata i ".album-list"
    let albumListElement = document.querySelector(".album-list");
    albumListElement.innerHTML = result;
}


renderAlbums();

albumListElement.innerHTML = result;


