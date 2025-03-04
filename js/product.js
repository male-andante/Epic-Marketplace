//? 1. Definisco le costanti globali
//? 2. dichiaro la fetch
//? 3. Funzione di render della pagina prodotto
//? 4. Funzione di creazione template pagina
//? 5. Chiamo la fetch



const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMDY0MjFlMTQwNjAwMTUzMTRkNDkiLCJpYXQiOjE3NDA1MDY2OTAsImV4cCI6MTc0MTcxNjI5MH0.8kHvAOjesigwMIMkQDuq5_EmUAXwbozI0biMvQwemHU"


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

function renderProductPage({imageUrl, name, description, brand, price}) {
    document.getElementById("productImage").src = imageUrl;
    document.getElementById("productName").innerText = name;
    document.getElementById("productDescription").innerText = description;
    document.getElementById("productBrand").innerText = brand;
    document.getElementById("productPrice").innerText = `${price}€`;
}