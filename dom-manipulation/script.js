// Array to hold quote objects
let quotes = [];

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    quotes = storedQuotes;
}

// Function to show a random quote
function showRandomQuote() {
    // Select a random quote from the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Get the quote display element
    const quoteDisplay = document.getElementById('quoteDisplay');

    // Update the display using innerHTML
    quoteDisplay.innerHTML = `<p>${quote.text}</p><span> - ${quote.category}</span>`;
    
    // Store last viewed quote in session storage
    sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}

// Function to create the form for adding new quotes
function createAddQuoteForm() {
    // Create a div for the form
    const formDiv = document.createElement('div');

    // Create input for new quote text
    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter a new quote';

    // Create input for new quote category
    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';

    // Create button to add new quote
    const addQuoteButton = document.createElement('button');
    addQuoteButton.textContent = 'Add Quote';
    addQuoteButton.onclick = addQuote; // Assign the addQuote function

    // Append elements to the form div
    formDiv.appendChild(quoteInput);
    formDiv.appendChild(categoryInput);
    formDiv.appendChild(addQuoteButton);

    // Append the form div to the body or a specific container
    document.body.appendChild(formDiv);
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    // Check if both fields are filled
    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please fill in both fields.");
        return; // Exit if either field is empty
    }

    // Create a new quote object and add it to the quotes array
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes(); // Save quotes to local storage

    // Clear the input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    // Show a new random quote after adding
    showRandomQuote();
}

// Function to export quotes to JSON file
function exportQuotes() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes(); // Save updated quotes to local storage
        alert('Quotes imported successfully!');
        showRandomQuote(); // Optionally show a random quote after import
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listener for the button to show a new quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Event listener for DOMContentLoaded to set up the initial state
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes(); // Load quotes from local storage
    createAddQuoteForm(); // Create the form for adding quotes
    showRandomQuote();     // Show an initial random quote

    // Create export button
    const exportButton = document.createElement('button');
    exportButton.textContent = 'Export Quotes';
    exportButton.onclick = exportQuotes;
    document.body.appendChild(exportButton);

    // Create import file input
    const importFileInput = document.createElement('input');
    importFileInput.type = 'file';
    importFileInput.id = 'importFile';
    importFileInput.accept = '.json';
    importFileInput.onchange = importFromJsonFile;
    document.body.appendChild(importFileInput);
});
