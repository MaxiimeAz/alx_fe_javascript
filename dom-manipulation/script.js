// Array to hold quote objects
let quotes = [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspiration" },
    { text: "The purpose of our lives is to be happy.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" }
];

// Function to display a random quote
function displayRandomQuote() {
    // Select a random quote from the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Get the quote display element
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.textContent = ""; // Clear previous quote

    // Create elements for the new quote
    const quoteText = document.createElement('p');
    const quoteCategory = document.createElement('span');

    // Set the text content
    quoteText.textContent = quote.text;
    quoteCategory.textContent = ` - ${quote.category}`;

    // Append the quote text and category to the quote display
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
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
    displayRandomQuote();
}

// Event listener for the button to show a new quote
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);

// Event listener for the button to add a new quote
document.getElementById('addQuoteBtn').addEventListener('click', addQuote);

// Show an initial random quote when the page loads
document.add
