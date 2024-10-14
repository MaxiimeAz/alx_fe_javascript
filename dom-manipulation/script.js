// Array to hold the quotes
let quotes = [];

// Function to load quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    if (quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteDisplay.innerHTML = `"${randomQuote.text}" - <strong>${randomQuote.category}</strong>`;
    } else {
        quoteDisplay.innerHTML = "No quotes available.";
    }
}

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value;
    const quoteCategory = document.getElementById("newQuoteCategory").value;

    if (quoteText && quoteCategory) {
        quotes.push({ text: quoteText, category: quoteCategory });
        saveQuotes(); // Save quotes to local storage
        document.getElementById("newQuoteText").value = ''; // Clear input
        document.getElementById("newQuoteCategory").value = ''; // Clear input
    } else {
        alert("Please enter both a quote and a category.");
    }
}

// Function to create the add quote form
function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    const quoteInput = document.createElement('input');
    quoteInput.id = "newQuoteText";
    quoteInput.type = "text";
    quoteInput.placeholder = "Enter a new quote";

    const categoryInput = document.createElement('input');
    categoryInput.id = "newQuoteCategory";
    categoryInput.type = "text";
    categoryInput.placeholder = "Enter quote category";

    const addButton = document.createElement('button');
    addButton.textContent = "Add Quote";
    addButton.onclick = addQuote; // Bind addQuote function to button

    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);

    // Append the form container to the body or a specific section
    document.body.appendChild(formContainer);
}

// Function to export quotes to a JSON file
function exportQuotes() {
    const json = JSON.stringify(quotes, null, 2); // Convert quotes array to JSON
    const blob = new Blob([json], { type: "application/json" }); // Create a Blob for the JSON data
    const url = URL.createObjectURL(blob); // Create a URL for the Blob
    const a = document.createElement("a"); // Create an anchor element
    a.href = url; // Set the href to the Blob URL
    a.download = "quotes.json"; // Set the download attribute with a filename
    a.click(); // Programmatically click the anchor to trigger download
    URL.revokeObjectURL(url); // Clean up the Blob URL
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes); // Add imported quotes to the array
        saveQuotes(); // Save updated quotes to local storage
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]); // Read the selected file as text
}

// Initialize the quote display and form on page load
document.addEventListener("DOMContentLoaded", () => {
    loadQuotes(); // Load quotes from local storage
    createAddQuoteForm(); // Create the form
    document.getElementById("newQuote").addEventListener("click", showRandomQuote);
    document.getElementById("exportQuotes").onclick = exportQuotes; // Bind export button
});
