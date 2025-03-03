//? 1. Definisco le costanti globali
//? 2. dichiaro la fetch
//? 3. Funzione di render della pagina prodotto
//? 4. Funzione di creazione template pagina
//? 5. Chiamo la fetch



const API_URL = "https://striveschool-api.herokuapp.com/api/product/";

window.onload = fetchProductDetails;



async function fetchProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    if (!productId) return;

    try {
        const response = await fetch(`${API_URL}/${productId}`);
        const product = await response.json();
        renderProductPage(product);
    } catch (error) {
        console.error("Errore nel recupero del prodotto:", error);
    }
}

function renderProductPage(product) {
    document.getElementById("product-image").src = product.imageUrl;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-brand").textContent = product.brand;
    document.getElementById("product-price").textContent = `${product.price}€`;
}