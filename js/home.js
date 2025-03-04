// Endpoint API
const baseURL = 'https://striveschool-api.herokuapp.com/api/product/'
const auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMDY0MjFlMTQwNjAwMTUzMTRkNDkiLCJpYXQiOjE3NDA1MDY2OTAsImV4cCI6MTc0MTcxNjI5MH0.8kHvAOjesigwMIMkQDuq5_EmUAXwbozI0biMvQwemHU"

// Elementi del DOM
const productsSection = document.getElementById('productsSection')
const mySpinner = document.getElementById('mySpinner')
const liveSearchInput = document.getElementById('liveSearch')

let allProducts = [] // Array per contenere tutti i prodotti

// Funzione per recuperare e mostrare i prodotti
const getProducts = async () => {
    mySpinner.classList.remove('d-none')
    try {
        const res = await fetch(baseURL, {
            headers: { authorization: auth },
        })
        const products = await res.json()
        allProducts = products
        renderProducts(products)
    } catch (error) {
        console.error(error)
        alert("Errore nel caricamento dei prodotti.")
    } finally {
        mySpinner.classList.add('d-none')
    }
}

// Funzione per renderizzare i prodotti nella homepage
const renderProducts = (products) => {
    productsSection.innerHTML = '' // Svuota la sezione prima di aggiungere nuovi elementi
    products.forEach(({ imageUrl, name, _id }) => {
        productsSection.innerHTML += `
            <div class='col col-3 col-lg-3 col-md-4 col-sm-6 col-12 mb-4'>  
                <div class="card justify-content-between">
                    <img src="${imageUrl}" class="card-img-top" alt="${_id}_${name}">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <a href="./product.html?id=${_id}" class="btn btn-primary">Vai al prodotto</a>
                    </div>
                </div> 
            </div>`
    })
}

// Funzione di ricerca live
const liveSearch = () => {
    const searchValue = liveSearchInput.value.toLowerCase();
    const filteredProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchValue)
    )
    if (searchValue.length > 2) {
        const filteredProducts = allProducts.filter((product) => product.title.toLowerCase().includes(searchValue));
        renderProducts(filteredProducts)} 
        else {
            renderProducts(allProducts)   
    }
}

// Event listener per la ricerca in tempo reale
liveSearchInput.addEventListener('keyup', liveSearch)

// Carica i prodotti al caricamento della pagina
window.onload = getProducts


