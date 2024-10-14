// Array to hold quote objects
let quotes = [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspiration" },
    { text: "The purpose of our lives is to be happy.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" }
];

// Function to show a random quote
function showRandomQuote() {
    // Select a random quote from the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Get the quote display element
    const quoteDisplay = document.getElementById('quoteDisplay');

    // Update the display using innerHTML
    quoteDisplay.innerHTML = `<p>${quote.text}</p><span> - ${quote.category}</span>`;
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

    // Clear the input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    // Show a new random quote after adding
    showRandomQuote();
}

// Event listener for the button to show a new quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Event listener for DOMContentLoaded to set up the initial state
document.addEventListener('DOMContentLoaded', () => {
    createAddQuoteForm(); // Create the form for adding quotes
    showRandomQuote();     // Show an initial random quote
});
