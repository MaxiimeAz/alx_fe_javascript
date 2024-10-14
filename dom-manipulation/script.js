// Array to hold the quotes
let quotes = [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspiration" },
    { text: "The way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${randomQuote.text}" - <strong>${randomQuote.category}</strong>`;
}

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value;
    const quoteCategory = document.getElementById("newQuoteCategory").value;

    if (quoteText && quoteCategory) {
        quotes.push({ text: quoteText, category: quoteCategory });
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

    // Append inputs and button to the form container
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);

    // Append the form container to the body or a specific section
    document.body.appendChild(formContainer);
}

// Initialize the quote display and form on page load
document.addEventListener("DOMContentLoaded", () => {
    createAddQuoteForm(); // Create the form
    document.getElementById("newQuote").addEventListener("click", showRandomQuote);
});
