
//? 1. Definisco le costanti globali
//? 2. Prendo l'url base
//? 3. Faccio la fetch
//? 4. Faccio la renderTable per la tabella e la chiamo nella fetch, parziale forse
//? 5. Faccio la createRow per creare le righe.
//? 6. Faccio la filterBy per l'input testuale con evento keyup
// 7. Faccio la localStorage per salvarmi il value della select
// 8. Collego la localStorage al filtro per impedire che si filtrino mele con pere
//? 9. Chiamo la fetch


//! 1. Definisco le costanti globali

const textInput = document.getElementById('textInput')
const tableSection = document.getElementById('tableSection')
//const selectSearch = document.getElementById('selectSearch')
const tbody = document.getElementById('tbody')

let allProducts = []
//let selectValue = ''


//! 2. Prendo l'url base

const baseURL = 'https://striveschool-api.herokuapp.com/api/product/'
const auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMDY0MjFlMTQwNjAwMTUzMTRkNDkiLCJpYXQiOjE3NDA1MDY2OTAsImV4cCI6MTc0MTcxNjI5MH0.8kHvAOjesigwMIMkQDuq5_EmUAXwbozI0biMvQwemHU"



//! 3. Siccome non so se l'array è vuoto o meno, creo un controllo per evitare errori 500.

let param = new URLSearchParams(window.location.search)
let idProduct = param.get("id")
window.onload = async () => { // mi serve che la funzione venga eseguita al caricamento della pagina, prima di fare qualsiasi altra cosa.
  try {
    if (idProduct) {
        const res = await fetch(BASE_URL + id, {
          headers: {
            authorization:
            auth          },
        })
        const product = await res.json()
        document.getElementById("name").value = product.name
        document.getElementById("description").value = product.description
        document.getElementById("imageUrl").value = product.imageUrl
        document.getElementById("brand").value = product.brand
        document.getElementById("price").value = product.price
        document.querySelector(".btn-success").remove()
      } else {
        document.querySelector(".btn-danger").remove()
        document.querySelector(".btn-secondary").remove()
      }
  } catch (error) {
    alert("Non ci sono prodotti da mostrare")
  }
    
}

createButton.addEventListener("click", createProduct())
editButton.addEventListener("click", editProduct())
deleteButton.addEventListener("click", deleteProduct())



const createProduct = async () => {
  const product = {
    name: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    brand: document.querySelector("#brand").value,
    imageUrl: document.querySelector("#imageUrl").value,
    price: document.querySelector("#price").value,
  }
  let res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: auth    },
    body: JSON.stringify(product),
  })
  if (res.ok) {
    alert("Product created")
  }
}

const editProduct = async () => {
  const product = {
    name: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    brand: document.querySelector("#brand").value,
    imageUrl: document.querySelector("#imageUrl").value,
    price: document.querySelector("#price").value,
  }
  let res = await fetch(baseURL + id, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: auth    },
    body: JSON.stringify(product),
  })
  if (res.ok) {
    alert("Product created")
  }
}

const deleteProduct = async () => {
  let res = await fetch(baseURL + id, {
    method: "DELETE",
    headers: {
      authorization: auth    },
  })
  if (res.ok) {
    alert("Product deleted")
  }
}



    async function getProducts() {
        try{
        const res = await fetch(baseURL)
        const users = await res.json()
        allUsers = users
        console.log(users)
        renderTable(users)
    } catch(error){
    console.log(error)
}
    }

//! 4. Faccio la renderTable per la tabella e la chiamo nella fetch

function renderTable(myProduct) {
    tbody.innerHTML = ''  // così resetto il body della tabella ad ogni nuova chiamata

    const rowProducts = myProduct.map((users) => createRow(users))
    
    tbody.append(...rowProducts)

}

//! 5. CreateRow per creare le righe delle tabelle di prodotti.

function createRow({ name, username, email }) {
    const tableRow = document.createElement('tr')
    tableRow.className = 'tableRow'
    tableRow.innerHTML = `<td>${name}</td><td>${username}</td><td>${email}</td>`

    return tableRow
}

//! 6. Faccio la filterBy per l'input testuale con evento keyup

textInput.addEventListener('keyup', filterBy)

function filterBy(){
    const searchValue = textInput.value.trim().toLowerCase()
    if (searchValue.length > 2)
        const filteredUsers = allUsers.filter(
            ({ name, username, email }) => {
                if{
                    searchValue
                }
                if (name.toLowerCase().includes(searchValue) || username.toLowerCase().includes(searchValue)|| email.toLowerCase().includes(searchValue)) {
                    return true
                }
                return false
            }
        )
        renderTable(filteredUsers)
    } else {
        renderTable(allUsers)
    }

}


//! 9. Chiamo la fetch
getProducts()



//! 10 Gestione Errori

function showAlert(type) {
    document.querySelectorAll('.alert').forEach(alert => alert.classList.add('d-none'));
    document.getElementById(type + '-alert').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById(type + '-alert').classList.add('d-none');
    }, 3000);
}