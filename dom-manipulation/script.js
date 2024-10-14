// Array to hold quote objects
let quotes = [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspiration" },
    { text: "The purpose of our lives is to be happy.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" }
];

// Function to display a random quote
function showRandomQuote() {
    // Select a random quote from the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    // Update the quote display
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.textContent = `${quote.text} - ${quote.category}`;
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

    // Clear the input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    // Display the newly added quote
    showRandomQuote();
}

// Event listener for the button to show a new quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Event listener for the button to add a new quote
document.getElementById('addQuoteBtn').addEventListener('click', addQuote);

// Show an initial random quote when the page loads
document.addEventListener('DOMContentLoaded', showRandomQuote);
