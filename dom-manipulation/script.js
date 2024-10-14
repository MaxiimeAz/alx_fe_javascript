let quotes = [];

// Simulated server URL (for demonstration, using JSONPlaceholder)
const serverUrl = 'https://jsonplaceholder.typicode.com/posts';

// Function to load quotes from local storage on page load
function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    quotes = storedQuotes;
    populateCategories();
    displayQuotes();
}

// Function to display quotes
function displayQuotes(category = 'all') {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = ''; // Clear previous quotes

    const filteredQuotes = category === 'all' ? quotes : quotes.filter(quote => quote.category === category);

    if (filteredQuotes.length > 0) {
        const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
        quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>${randomQuote.category}</em></p>`;
    } else {
        quoteDisplay.innerHTML = '<p>No quotes available for this category.</p>';
    }
}

// Function to populate categories
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))]; // Extract unique categories
    categoryFilter.innerHTML = ''; // Clear existing options
    categoryFilter.appendChild(new Option('All Categories', 'all'));

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore last selected category from local storage
    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
    categoryFilter.value = lastSelectedCategory;
    displayQuotes(lastSelectedCategory); // Display quotes based on last selected category
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('lastSelectedCategory', selectedCategory); // Save last selected category
    displayQuotes(selectedCategory);
}

// Function to add a new quote
async function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;

    if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };
        
        // Save quote locally first
        quotes.push(newQuote);
        saveQuotes();
        populateCategories(); // Update categories dropdown
        displayQuotes(); // Display updated quotes

        // Send the new quote to the simulated server
        await postQuoteToServer(newQuote);
    }
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(serverUrl);
        const data = await response.json();
        const serverQuotes = data.slice(0, 5).map(item => ({
            text: item.title,
            category: item.userId.toString() // Simulating category as userId for demonstration
        }));

        mergeQuotes(serverQuotes);
    } catch (error) {
        console.error('Error fetching quotes from server:', error);
    }
}

// Function to merge quotes and handle conflicts
function mergeQuotes(serverQuotes) {
    const newQuotes = [...quotes]; // Create a copy of local quotes

    serverQuotes.forEach(serverQuote => {
        const existingQuoteIndex = newQuotes.findIndex(localQuote => localQuote.text === serverQuote.text);

        if (existingQuoteIndex === -1) {
            newQuotes.push(serverQuote); // If not found, add from server
        } else {
            // If found, conflict resolution: prefer server quote
            newQuotes[existingQuoteIndex] = serverQuote;
            notifyUser('Quote updated from server: ' + serverQuote.text); // Notify user
        }
    });

    quotes = newQuotes;
    saveQuotes();
    displayQuotes(); // Refresh display
}

// Function to post a new quote to the server
async function postQuoteToServer(quote) {
    try {
        const response = await fetch(serverUrl, {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json' // Specify content type
            },
            body: JSON.stringify(quote) // Convert quote object to JSON
        });

        if (!response.ok) {
            throw new Error('Failed to post quote to server');
        }
        const result = await response.json();
        console.log('Posted quote to server:', result);
    } catch (error) {
        console.error('Error posting quote to server:', error);
    }
}

// Function to notify the user about updates
function notifyUser(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.backgroundColor = 'lightblue';
    notification.style.padding = '10px';
    notification.style.margin = '10px 0';
    notification.style.border = '1px solid blue';
    document.body.prepend(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000); // Remove notification after 5 seconds
}

// Function to sync quotes with the server
async function syncQuotes() {
    await fetchQuotesFromServer(); // Fetch updates from the server
    alert("Quotes synced with server!"); // Notify user about sync
}

// Function to periodically fetch quotes
function startFetching() {
    syncQuotes(); // Fetch immediately
    setInterval(syncQuotes, 30000); // Fetch every 30 seconds
}

// Load quotes when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    startFetching(); // Start periodic fetching
});
