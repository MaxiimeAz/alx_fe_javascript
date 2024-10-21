const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock server endpoint
let quotes = []; // Array to hold quotes
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const categoryFilter = document.getElementById('categoryFilter');
const importFileInput = document.getElementById('importFile');

// Load quotes from local storage on initialization
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Display a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available.</p>";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `<p>${selectedQuote.text}</p><p><em>${selectedQuote.category}</em></p>`;
  sessionStorage.setItem('lastViewedQuote', JSON.stringify(selectedQuote)); // Save last viewed quote
}

// Add a new quote
function addQuote(event) {
  event.preventDefault();
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  const newQuote = { text: newQuoteText, category: newQuoteCategory };
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  showRandomQuote(); // Display the newly added quote
  document.getElementById('quoteForm').reset(); // Clear form inputs
}

// Populate category dropdown
function populateCategories() {
  const categories = [...new Set(quotes.map(quote => quote.category))];
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
  
  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const selectedQuote = filteredQuotes[randomIndex];
    quoteDisplay.innerHTML = `<p>${selectedQuote.text}</p><p><em>${selectedQuote.category}</em></p>`;
  } else {
    quoteDisplay.innerHTML = "<p>No quotes available for this category.</p>";
  }
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    alert('Quotes imported successfully!');
    showRandomQuote(); // Show a random quote after import
  };
  fileReader.readAsText(event.target.files[0]);
}

// Export quotes to a JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Fetch quotes from mock server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(API_URL);
    const serverQuotes = await response.json();
    const formattedQuotes = serverQuotes.slice(0, 5).map(post => ({
      text: post.title,
      category: "Server"
    }));
    resolveConflicts(formattedQuotes); // Handle syncing and conflicts
  } catch (error) {
    console.error("Error fetching quotes from server:", error);
  }
}

// Sync data periodically (every 30 seconds)
function startSync() {
  setInterval(fetchQuotesFromServer, 30000); // Sync every 30 seconds
}

// Conflict Resolution: Server’s data takes precedence
function resolveConflicts(serverQuotes) {
  const mergedQuotes = [...serverQuotes, ...quotes.filter(q =>
    !serverQuotes.some(sq => sq.text === q.text)
  )];
  
  quotes = mergedQuotes;
  saveQuotes();
  populateCategories();
  notifyUser("New quotes synced from server!");
  filterQuotes(); // Refresh the displayed quotes
}

// Notification UI for conflicts or updates
function notifyUser(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.className = 'notification';
  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 3000); // Auto-remove after 3 seconds
}

// Initialize the app with server sync
async function initializeApp() {
  loadQuotes();
  populateCategories();
  newQuoteButton.addEventListener('click', showRandomQuote);
  importFileInput.addEventListener('change', importFromJsonFile);

  // Restore last viewed quote from session storage
  const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
  if (lastViewedQuote) {
    quoteDisplay.innerHTML = `<p>${lastViewedQuote.text}</p><p><em>${lastViewedQuote.category}</em></p>`;
  }

  startSync();
}


initializeApp();
