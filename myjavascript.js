const url = "https://striveschool-api.herokuapp.com/books"

window.onload = () => {
  fetchBooks()
}


//Fetch per far comparire i libri contenuti nell'API e le ralative card
const fetchBooks = () => {
  fetch(url)
    .then((raw) => raw.json())
    .then((res) => {
      let cont = document.querySelector(".album .row")

      cont.innerHTML = res
        .map((book) => {
          return `
          <div class="col col-3">
          <div class="card mb-4 shadow-sm" id="book_${book.asin}">
          <img src="${book.img}" alt="${book.title}">
          <div class="card-body">
          <p class="font-weight-bold text-truncate book-title"> ${book.title} </p>
          <div class="d-flex justify-content-between align-items-center">                    
          <button class="btn btn-outline-success btn-sm" onclick="addToCart('${book.title}', '${book.price}', '${book.asin}')"> EUR ${book.price} </button>
          <button class="btn btn-outline-secondary btn-sm" onclick="hideBtn('${book.asin}')"> Hide </button>
          <button class="btn btn-outline-info btn-sm" onclick="showBookDetails('${book.asin}')">Info</button>
          </div>
          </div>
          </div>
          </div>`      
        })
        .join("");
    })
    .catch((err) => console.error(err))
}


//Funzioni per i bottoni (card e carrello)

//Funzione per aggiungere gli elementi al carrello
const addToCart = (title, price, asin) => {
  const book = document.querySelector("#book_" + asin)
  book.style.border = "2px red solid"
  const cart = document.querySelector(".list-group")
  cart.innerHTML += `
  <li class="list-group-item text-dark">${title}, ${price} <button class='btn btn-danger' onclick='removeFromCart(event, "${asin}", "${price}")'> X </button></li>`
  const totale = document.querySelector("h1 span")
  totale.innerText = (Number(totale.innerText) + Number(price)).toFixed(2)
}

//Funnzione per eliminare gli elementi da carrello
const removeFromCart = (event, asin, price) => {
  event.target.closest("li").remove()
  const totale = document.querySelector("h1 span")
  totale.innerText = (Number(totale.innerText) - Number(price)).toFixed(2)
  const book = document.querySelector("#book_" + asin)
  book.style.border = "none"
}

//Funzione per eliminare tutti gli elementi del carrello
const emptyCart = () => {
  document.querySelector(".list-group").innerHTML = ""
  document.querySelectorAll(".card").forEach(card => card.style.border = "none")
  const totale = document.querySelector("h1 span")
  totale.innerText = "0"
}

//Funzione per nascondere le card tramite secondo pulsante
function hideBtn(asin) {
  var x = document.querySelector("#book_" + asin)
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


// Funzione per filtrare gli input di ricerca
const searchBook = (ev) => {
  let query = ev.target.value
  let allTitles = document.querySelectorAll(".book-title")
  console.log(
    query,
    allTitles[0].innerText.toLowerCase().includes(query.toLowerCase())
  )
  allTitles.forEach((title) => {
    const currCard = title.parentElement.parentElement.parentElement
    if (!title.innerText.toLowerCase().includes(query.toLowerCase())) {
      currCard.style.display = "none"
    } else {
      currCard.style.display = "block"
    }
  })
}


//Funzione per la sezione info

function showBookDetails(asin) {

  const params = new URLSearchParams();
  params.set('asin', asin);

  window.location.href = 'info.html?' + params.toString(); 

}

// Far comparire le info nell'apposito HTML
document.addEventListener('DOMContentLoaded', function () {
const urlParams = new URLSearchParams(window.location.search);
const asin = urlParams.get('asin');

fetch(`https://striveschool-api.herokuapp.com/books/${asin}`)
  .then(response => response.json())
  .then(book => {

    document.getElementById('image').src = book.img;
    document.getElementById('title').textContent = book.title;
    document.getElementById('price').textContent = book.price;
    document.getElementById('category').textContent = book.category;
    document.getElementById('asin').textContent = book.asin;


  });
});