// Sample quotes array to hold quote objects
let quotes = [];

// Initialize the application
async function initialize() {
    await loadQuotes();
    populateCategories();
    filterQuotes();
    fetchQuotesFromServer();
    syncQuotes(); // Start syncing quotes with the server
    createAddQuoteForm(); // Create the add quote form
}

// Load existing quotes from local storage
async function loadQuotes() {
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

// Create the form for adding new quotes
function createAddQuoteForm() {
    const formContainer = document.getElementById('quoteFormContainer'); // Ensure you have this element in your HTML

    const form = document.createElement('form');
    form.id = 'quoteForm';
    form.onsubmit = (event) => addQuote(event);

    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter a new quote';
    quoteInput.required = true;

    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';
    categoryInput.required = true;

    const addButton = document.createElement('button');
    addButton.type = 'submit';
    addButton.textContent = 'Add Quote';

    form.appendChild(quoteInput);
    form.appendChild(categoryInput);
    form.appendChild(addButton);
    formContainer.appendChild(form);
}

// Add a new quote
async function addQuote(event) {
    event.preventDefault(); // Prevent the form from submitting
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes();
    await postQuoteToServer(newQuote); // Optional: Send new quote to the server
    populateCategories();
    document.getElementById('quoteForm').reset();
    showRandomQuote();
}

// Post the new quote to the server (for demonstration purposes)
async function postQuoteToServer(quote) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json' // Specify the content type
            },
            body: JSON.stringify(quote) // Convert the quote object to JSON
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Assuming the server returns the posted quote
        console.log('Quote posted to server:', data);
    } catch (error) {
        console.error('Error posting quote to server:', error);
    }
}

// Sync quotes with the server
async function syncQuotes() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Simulated API endpoint
        const serverQuotes = await response.json();
        
        // For demonstration, assume each server quote has a title
        const newQuotes = serverQuotes.map(post => ({
            text: post.title, // Using post title as quote text
            category: 'fetched' // Assign a static category for demonstration
        }));

        // Merge new quotes with existing quotes, avoiding duplicates
        newQuotes.forEach(newQuote => {
            if (!quotes.some(quote => quote.text === newQuote.text)) {
                quotes.push(newQuote);
            }
        });

        saveQuotes();
        populateCategories();
        showRandomQuote();
        
        // Notify the user that quotes have been synced
        alert("Quotes synced with server!");
    } catch (error) {
        console.error('Error syncing quotes:', error);
    }
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

// Fetch quotes from the server at intervals
async function fetchQuotesFromServer() {
    setInterval(async () => {
        await syncQuotes(); // Sync quotes periodically
    }, 30000); // Fetch every 30 seconds
}

// Run the initialization function on load
window.onload = initialize;
