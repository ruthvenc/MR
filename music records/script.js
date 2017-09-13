var app = (function() {

    // Surandame formos mygtuką "Pridėti"
    // suras pirmą DOM elementą su klase .btn-save-album
    let addAlbumButton = document.querySelector(".btn-save-album");

    // Kai paspaudžiamas mygtukas, vykdyk addAlbum funkciją
    addAlbumButton.addEventListener("click", addAlbum);

    // Čia saugosim visus albumus
    let allAlbums = [];
    let httpRequest;

    function init() {
        // Gausime albumus iš json-server
        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            alert("Naršyklė nepalaiko AJAX");
        } else {
            httpRequest.onreadystatechange = processAlbumJson;
            httpRequest.open('GET', 'http://localhost:3000/albums');
            httpRequest.send();
        }
    }

    // Kai gauname albumus iš json-server
    function processAlbumJson() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let albumsJSON = httpRequest.responseText;
                let albumList = JSON.parse(albumsJSON);

                // Patikrinam ar sėkmingai pavyko sukurti naują objektą
                if (albumList === null) {
                    albumList = [];
                }

                // Spausdinam albumus
                allAlbums = albumList;
                renderAlbums(albumList);

            } else {
                alert("Klaida. Negavau duomenų iš serverio");
            }
        }
    }


    // Formos elementai
    let artistElement = document.querySelector("#artist");
    let albumElement = document.querySelector("#album");
    let releaseDateElement = document.querySelector("#releaseDate");
    let imageElement = document.querySelector("#image");
    let genreElement = document.querySelector("#genre");


    function addAlbum() {
        // nuskaitome laukelių reikšmes
        let artist = artistElement.value;
        let album = albumElement.value;
        let date = releaseDateElement.value;
        let image = imageElement.files[0];
        let genre = genreElement.value;

        if (!artist || !album || !date) {
            alert("Neįvesti visi laukeliai");
            return;
        }

        if (!isAlbumYear(date)) {
            alert("Albumo metai įvesti neteisingai");
            return;
        };

        let record = {
            "artist": artist,
            "album": album,
            "date": date,
            "image": image ? image.name || "" : "",
            "genre": genre
        }

        // Patikrinime ar albumas jau buvo įvestas
        if (checkForDuplicates(record)){
            alert("Toks albumas jau išsaugotas");
            return;
        }


        // Siunčiame albumo duomenis į serverį
        let httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            alert("Naršyklė nepalaiko AJAX");
        } else {
            httpRequest.onreadystatechange = saveAlbumToServer;
            httpRequest.open('POST', 'http://localhost:3000/albums');
            httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            httpRequest.send("artist=" + record.artist + "&album=" + record.album + "&date=" + record.date + "&image=" + record.image + "&genre=" + record.genre);
        }

        function saveAlbumToServer() {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 201) {
                    console.log("Išsaugojau sėkmingai");

                    // Spausdinam albumus
                    allAlbums.push(record);
                    renderAlbums(allAlbums);
                } else {
                    alert("Negaliu išsaugoti serverio");
                }
            }
        }

        // Išvalykim formą
        clearForm();
    }

    function checkForDuplicates(record) {
        let isDuplicate = false;
        allAlbums.forEach(function(item) {
            if (item.artist === record.artist && item.album === record.album && item.date === record.date) {
                isDuplicate = true;
            }
        })
        return isDuplicate;
    };

    function isAlbumYear(year) {
        let date = new Date();
        let currentYear = date.getFullYear();

        if (isFinite(year) && year <= currentYear && year > 1900) {
            return true
        } else {
            return false;
        }
    }

    let formElement = document.querySelector(".album-form");
    let clearButton = document.querySelector(".btn-clear-form");

    clearButton.addEventListener("click", clearForm);

    function clearForm() {
        formElement.reset();
    }

    function renderAlbums(albumList) {
        // Patikrinti ar yra išsaugotų albumų
        // Jei nėra - nutraukti funkcijos vykdymą
        if (!albumList) return;

        // Jei yra, kuriame ciklą ir į rezultatą susidedam visų albumų HTML
        let albumHtml = "";
        for (let album of albumList) {

            let genreHtml = "";

            if (album.genre) {
                let genreList = (album.genre).split(",");

                for (genre of genreList) {
                    genreHtml += `<span class="badge badge-pill badge-info">${genre.trim()}</span>\n`;
                }
            }

            albumHtml += `
            <div class="album clearfix">
                <img src="img/${album.image}" alt="${album.artist} - ${album.album}">
                <h2>${album.album} - ${album.artist} <span class="text-secondary">(${album.date})</span></h2>
                ${genreHtml}
                <div class="text-right mt-5">
                    <button type="button" class="btn btn-light btn-delete-album">Ištrinti</button>
                </div>
                
            </div>
            <hr>
        `;
        }

        // Spausdinam rezultatą į ".album-list"
        let albumListElement = document.querySelector(".album-list");
        albumListElement.innerHTML = albumHtml;

        // Surandam visus mygtukus
        let deleteButtons = document.querySelectorAll(".btn-delete-album");

        // Registruojam mygtukams event'us
        for (btn of deleteButtons) {
            btn.addEventListener("click", deleteAlbum);
        }
    }

    function deleteAlbum() {
        console.log("trinsim albuma cia");

    }

    return {
        "init": init
    }

})();

app.init();
