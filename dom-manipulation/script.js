// Initial array of quotes with text and category
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Success is not final; failure is not fatal: It is the courage to continue that counts.", category: "Motivation" },
  { text: "Be yourself; everyone else is already taken.", category: "Humor" }
];

// Select DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const quoteForm = document.getElementById('quoteForm');

// Function to display a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available. Please add one!</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Use innerHTML to display the quote
  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <p><em>— ${randomQuote.category}</em></p>
  `;
}

// Event listener to show a random quote when the button is clicked
newQuoteButton.addEventListener('click', showRandomQuote);

// Function to add a new quote from the form input
function addQuote(event) {
  event.preventDefault(); // Prevent form from refreshing the page

  // Get input values
  const newQuoteText = document.getElementById('newQuoteText').value.trim();
  const newQuoteCategory 
