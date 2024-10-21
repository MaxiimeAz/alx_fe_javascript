
let quotes = [];

// Initialize the application
function initialize() {
    loadQuotes();
    populateCategories();
    filterQuotes();
    fetchQuotesFromServer();
}

// Load existing quotes from local storage
function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes'));
    if (storedQuotes) {
        quotes = storedQuotes;
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Show a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById('quoteDisplay').innerHTML = "No quotes available.";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('quoteDisplay').innerHTML = `<p>${quotes[randomIndex].text}</p><small>${quotes[randomIndex].category}</small>`;
}

// Add a new quote
function addQuote(event) {
    event.preventDefault(); // Prevent the form from submitting
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
    document.getElementById('quoteForm').reset();
    showRandomQuote();
}

// Populate category dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];

    // Clear existing options
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
    
    // Display filtered quotes
    document.getElementById('quoteDisplay').innerHTML = filteredQuotes.map(quote => `<p>${quote.text}</p><small>${quote.category}</small>`).join('');
}

// Import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        showRandomQuote();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Export quotes to JSON file
function exportToJsonFile() {
    const json = JSON.stringify(quotes, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Fetch quotes from the server
function fetchQuotesFromServer() {
    setInterval(() => {
        fetch('https://jsonplaceholder.typicode.com/posts') // Simulated API endpoint
            .then(response => response.json())
            .then(data => {
                // Simulate adding new quotes from the server
                const newQuotes = data.map(post => ({
                    text: post.title,  // Using post title as quote text
                    category: 'fetched' // Assign a static category for demonstration
                }));
                quotes.push(...newQuotes);
                saveQuotes();
                populateCategories();
                showRandomQuote();
            })
            .catch(error => console.error('Error fetching quotes:', error));
    }, 30000); // Fetch every 30 seconds
}

// Run the initialization function on load
window.onload = initialize;
