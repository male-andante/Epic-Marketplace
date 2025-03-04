//! 1. Definisco le costanti globali
const textInput = document.getElementById('textInput')
const tableSection = document.getElementById('tableSection')
const tbody = document.getElementById('tbody')

const createButton = document.getElementById("createButton")
const editButton = document.getElementById("editButton")
const deleteButton = document.getElementById("deleteButton")

let allProducts = []

const baseURL = 'https://striveschool-api.herokuapp.com/api/product/'
const auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMDY0MjFlMTQwNjAwMTUzMTRkNDkiLCJpYXQiOjE3NDA1MDY2OTAsImV4cCI6MTc0MTcxNjI5MH0.8kHvAOjesigwMIMkQDuq5_EmUAXwbozI0biMvQwemHU"

//! 2. Controllo se c'è un ID nei parametri URL
let param = new URLSearchParams(window.location.search)
let idProduct = param.get("id")

window.onload = async () => {
    try {
        if (idProduct) {
            const res = await fetch(baseURL + idProduct, {
                headers: { authorization: auth },
            })
            const product = await res.json()

            document.getElementById("name").value = product.name
            document.getElementById("description").value = product.description
            document.getElementById("imageUrl").value = product.imageUrl
            document.getElementById("brand").value = product.brand
            document.getElementById("price").value = product.price

            document.querySelector(".btn-success")?.remove()
        } else {
            document.querySelector(".btn-danger")?.remove()
            document.querySelector(".btn-secondary")?.remove()
        }
    } catch (error) {
        alert(`${error} "Errore nel caricamento del prodotto."}`)
    }
}

//! 3. Area Listener
createButton?.addEventListener("click", createProduct)
editButton?.addEventListener("click", editProduct)
deleteButton?.addEventListener("click", deleteProduct)

//! 4. Funzione POST
async function createProduct() {
    const product = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        brand: document.getElementById("brand").value,
        imageUrl: document.getElementById("imageUrl").value,
        price: document.getElementById("price").value,
    }

    try {
        const res = await fetch(baseURL, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: auth,
            },
            body: JSON.stringify(product),
        })
        if (res.ok) {
            alert("Prodotto creato con successo!")
        }
    } catch (error) {
        alert("Errore nella creazione del prodotto.")
    }
}

//! 5. Funzione PUT
async function editProduct() {
    if (!idProduct) return alert("Nessun prodotto selezionato.")

    const product = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        brand: document.getElementById("brand").value,
        imageUrl: document.getElementById("imageUrl").value,
        price: document.getElementById("price").value,
    }

    try {
        const res = await fetch(baseURL + idProduct, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                authorization: auth,
            },
            body: JSON.stringify(product),
        })
        if (res.ok) {
            alert("Prodotto aggiornato con successo!");
        }
    } catch (error) {
        alert("Errore nella modifica del prodotto.")
    }
}

//! 6. Funzione DELETE
async function deleteProduct() {
    if (!idProduct) return alert("Nessun prodotto selezionato.")

    try {
        const res = await fetch(baseURL + idProduct, {
            method: "DELETE",
            headers: { authorization: auth },
        });
        if (res.ok) {
            alert("Prodotto eliminato con successo!");
        }
    } catch (error) {
        alert("Errore nell'eliminazione del prodotto.");
    }
}

//! 7. Funzione GET
async function getProducts() {
    try {
        const res = await fetch(baseURL, { headers: { authorization: auth } })
        const products = await res.json()
        allProducts = products
        renderTable(products)
    } catch (error) {
        console.error("Errore nel recupero dei prodotti:", error)
    }
}

//! 8. Funzione per renderizzare la tabella
function renderTable(products) {
    tbody.innerHTML = ""
    products.forEach(({ name, brand, price }) => {
        const row = document.createElement("tr")
        row.innerHTML = `<td>${name}</td><td>${brand}</td><td>${price}€</td>`
        tbody.appendChild(row);
    });
}

//! 9. Filtro in tempo reale
textInput.addEventListener("keyup", filterBy)

function filterBy() {
    const searchValue = textInput.value.trim().toLowerCase()
    if (searchValue.length > 2) {
        const filteredProducts = allProducts.filter(({ name, brand }) =>
            name.toLowerCase().includes(searchValue) || brand.toLowerCase().includes(searchValue)
        )
        renderTable(filteredProducts)
    } else {
        renderTable(allProducts)
    }
}

//! 10. Gestione alert
function showAlert(type) {
    document.querySelectorAll('.alert').forEach(alert => alert.classList.add('d-none'))
    document.getElementById(type + '-alert').classList.remove('d-none')
    setTimeout(() => {
        document.getElementById(type + '-alert').classList.add('d-none')
    }, 3000)
}
