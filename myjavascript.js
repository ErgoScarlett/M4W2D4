let books = [];

const fetchBooks = () => {
    fetch('https://striveschool-api.herokuapp.com/books')
        .then(response => response.json())
        .then(books => renderBooks(books))
        .catch(error => console.error('Error fetching books:', error));
};

//Creare le Cards che andranno del dom
function renderBooks(books) {
  const booksContainer = document.getElementById('booksContainer');
  booksContainer.innerHTML = '';

  books.forEach(book => {
    const card = `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${book.img}" class="card-img-top" alt="${book.title}">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">${book.price}</p>
            <button class="btn btn-primary" onclick="addToCart('${book._id}', this)">Aggiungi al Carrello</button>
          </div>
        </div>
      </div>
    `;
booksContainer.innerHTML += card;
  });
}

// Funzione per filtrare gli input
   function searchBooks() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    console.log('Search Input:', searchInput);
    
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchInput)
    );
    console.log('Filtered Books:', filteredBooks);

    renderBooks(filteredBooks);
}


// Function to add a book to the cart
function addToCart(bookId, button) {
    // Rimuovi la classe 'selected-card' da tutti i pulsanti
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.classList.remove('selected-card');
    });

    // Aggiungi la classe 'selected-card' al pulsante cliccato
    button.classList.add('selected-card'); 
}

function addToCart(bookId) {
   
    console.log(`Book added to cart: ${bookId}`);
}
  
  
  // Fetch dei libri 
  fetchBooks();