//! Marketplace WebApp


//? 1. Raw structure
// 1. Posto i prodotti con una chiamata autorizzata su postman.
// 2. Definisco le costanti di struttura e 'endpoint di base
//? 2. Faccio apparire la funzione di renderizzazione dei prodotti dal backoffice a qui
// - fetch fn (async)
// - cycle res fn
// - create template and inject fn
//? 3. 
// - Get fn of artist detail
// - Create template fn for artist page detail
//? 4. Backoffice page


// Endpoint section:
const baseURL = 'https://striveschool-api.herokuapp.com/api/product/';
const auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMDY0MjFlMTQwNjAwMTUzMTRkNDkiLCJpYXQiOjE3NDA1MDY2OTAsImV4cCI6MTc0MTcxNjI5MH0.8kHvAOjesigwMIMkQDuq5_EmUAXwbozI0biMvQwemHU"

// Area elementi DOM
const productsSection = document.getElementById('productsSection');
const mySpinner = document.getElementById('mySpinner');

window.onload = async () => {
    const res = await fetch(BASE_URL, {
      headers: {
        authorization: auth
    },
    })
    const products = await res.json()
    const row = document.querySelector("#products")
    products.forEach(({imageUrl, name, _id}) => {
      row.innerHTML += `
      <div class='col col-3 col-lg-3 col-md-4 col-sm-6 col-sm-12 mb-4'>  
        <div class="card justify-content-between">
          <img src="${imageUrl}" class="card-img-top" alt="${_id}_${name}">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <a href="./backoffice.html?id=${_id}" class="btn btn-primary">Vai al prodotto</a>
          </div>
        </div> 
      </div>`
    })
  }


// Spinner
async function getResults() {
    // mySpinner.classList.remove('d-none');

    mySpinner.classList.toggle('d-none');
    const searchValue = searchInput.value;

    // Salviamo il valore di ricerca inserito dall'utente
    localStorage.setItem('lastSearch', searchValue)

    try {
        const response = await fetch(`${songsEndpoint}?q=${searchValue}`);
        const {data} = await response.json();

        globalSongs = data;
        cycleResp(data);
    } catch (err) {
        console.log(err);
    } finally {
        mySpinner.classList.toggle('d-none');
    }
}

function cycleResp(songs) {
    // console.log(resultBox);
    resultBox.innerHTML = '';
    const songsNodes = songs.map((elemento) => createTemplate(elemento));
    // console.log(songsNodes);

    foundBox.classList.remove('d-none');
    resultBox.append(...songsNodes);

    // songsNodes.forEach((songNode) => {
    //     resultBox.appendChild(songNode);
    // })
}

function createTemplate({album, title, artist, preview}) {
    // <!-- Song template -->
    // <!-- <div class="text-light p-3 text-center">
    //     <img src="" alt="No image here..." />
    //     <h6 class="mt-2 mb-0">Titolo Canzone</h6>
    //     <a href="index.html?q=[song.artist.id]">Artista</a>
    // </div> -->
    // <i class="fa-solid fa-circle-play"></i>

    const songBox = document.createElement('div');
    songBox.classList.add('text-light', 'p-3', 'text-center');

    const songImg = document.createElement('img');
    songImg.src = album.cover_medium;

    const songTitle = document.createElement('h6');
    songTitle.innerText = title;

    const artistLink = document.createElement('a');
    artistLink.innerText = artist.name;
    artistLink.setAttribute('href', `detail.html?artistId=${artist.id}`);

    const albumLink = document.createElement('a');
    albumLink.innerText = album.title;
    albumLink.classList.add('d-block', 'mb-1');
    albumLink.setAttribute('href', `album.html?albumId=${album.id}`);

    //! EXTRA per la riproduzione della preview della canzone
    const playIcon = document.createElement('i');
    playIcon.classList.add('fa-solid', 'fa-circle-play', 'ml-2');
    playIcon.addEventListener('click', () => {
        playSong(preview);
    });

    songBox.append(songImg, songTitle, albumLink, artistLink, playIcon);

    return songBox;
}

//! EXTRA2 per la live search delle canzoni
function liveSearch() {
    const searchValue = liveSearchInput.value.toLowerCase();
    // console.log(searchValue);

    if (searchValue.length > 2) {
        const filteredSongs = globalSongs.filter((song) => song.title.toLowerCase().includes(searchValue));
        cycleResp(filteredSongs);
    } else {
        cycleResp(globalSongs);
    }
}



// Area listners
liveSearchInput.addEventListener('keyup', () => {
    liveSearch();
});



//? template card prodotto

/* <div class="col mb-5">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="...">
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">Fancy Product</h5>
                                    <!-- Product price-->
                                    $40.00 - $80.00
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                            </div>
                        </div>
                    </div> */
