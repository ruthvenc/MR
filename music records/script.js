//Suraskime DOM elementa pagal klase ir priskirkite ji kintamajam
let titleElement = document.getElementsByClassName("main-title")[0];

//pakeiskime h1 title pavadinima
titleElement.innerHTML = "Muzikos albumai";

//pridekime papildoma klase
titleElement.classList.add("header-title");

//pakeiskime h1 stiliu
titleElement.style.fontStyle = "italic";

//Surandame fromos mygtuka "Prideti"
//Suras pirma DOM elementa su klase btn-save-album
let addAlbumButton = document.querySelector(".btn-save-album");

//Kai paspaudziamas mygtukas, vykdys addAlbum funkcija
addAlbumButton.addEventListener("click", addAlbum);

// cia bus saugomas elementas
let albumList = [];

//formos elementai
let artistElement = document.querySelector("#artist");
let albumElement = document.querySelector("#album");
let releaseDateElement = document.querySelector("#releaseDate");
let imageElement = document.querySelector("#image");

function addAlbum(){
//nuskaitome laukeliu reiksmes
let artist = artistElement.value;
let album = albumElement.value;
let date = releaseDateElement.value;
let image = imageElement.files[0];

if (!artist || !album || !date || !image) {
    console.log("Neivestas Miau atlikejas");
    return;
}


};

albumList.push({
    "artist":artist,
    "album": album,
    "date": date,
    "image": image.name
});

//    console.log("Pridedam albuma");

console.log("Duomenys:", artist, album, date, image);
}

