// Initialize quotes from local storage or use default values
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Success is not final; failure is not fatal: It is the courage to continue that counts.", category: "Motivation" },
  { text: "Be yourself; everyone else is already taken.", category: "Humor" }
];


const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const categoryFilter = document.getElementById('categoryFilter');
const importFileInput = document.getElementById('importFile');


function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}


function populateCategories() {
  const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];

  
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';


  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  
  const lastSelectedCategory = localStorage.getItem('selectedCategory');
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
    filterQuotes(); // Apply filter on page load
  }
}

// Display a random quote based on the selected category
function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem('selectedCategory', selectedCategory); // Save filter preference

  const filteredQuotes = selectedCategory === 'all'
    ? quotes
    : quotes.filter(quote => quote.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = '<p>No quotes available for this category.</p>';
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];

  quoteDisplay.textContent = ''; // Clear previous content

  const quoteText = document.createElement('p');
  quoteText.textContent = `"${randomQuote.text}"`;

  const quoteCategory = document.createElement('p');
  quoteCategory.innerHTML = `<em>— ${randomQuote.category}</em>`;

  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);

  // Store the last viewed quote in session storage
  sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
}

// Add a new quote and update the category dropdown
function addQuote(event) {
  event.preventDefault();

  const newQuoteText = document.getElementById('newQuoteText').value.trim();
  const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (newQuoteText === "" || newQuoteCategory === "") {
    alert("Both quote and category are required!");
    return;
  }

  quotes.push({ text: newQuoteText, category: newQuoteCategory });
  saveQuotes();
  populateCategories(); // Update categories with new entry

  document.getElementById('quoteForm').reset();
  alert("Quote added successfully!");
  filterQuotes(); // Refresh the displayed quote
}

// Export quotes to a JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'quotes.json';
  downloadLink.click();
  URL.revokeObjectURL(url); // Cleanup URL object
}

// Import quotes from a JSON file and update local storage
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories(); // Refresh categories after import
      alert('Quotes imported successfully!');
      filterQuotes(); // Show updated quotes
    } catch (error) {
      alert('Invalid JSON file.');
    }
  };

  fileReader.readAsText(event.target.files[0]);
}

// Initialize the app and restore session data if available
function initializeApp() {
  populateCategories(); // Populate categories on load
  newQuoteButton.addEventListener('click', filterQuotes);
  importFileInput.addEventListener('change', importFromJsonFile);

  
  const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
  if (lastViewedQuote) {
    quoteDisplay.textContent = '';

    const quoteText = document.createElement('p');
    quoteText.textContent = `"${lastViewedQuote.text}"`;

    const quoteCategory = document.createElement('p');
    quoteCategory.innerHTML = `<em>— ${lastViewedQuote.category}</em>`;

    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
  }
}


initializeApp();
