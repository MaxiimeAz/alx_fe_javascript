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


function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available. Please add one!";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.textContent = `"${randomQuote.text}" — ${randomQuote.category}`;
}

// Event listener to show a random quote when the button is clicked
newQuoteButton.addEventListener('click', showRandomQuote);

// Function to add a new quote from the form input
function addQuote(event) {
  event.preventDefault(); // Prevent form from refreshing the page

  // Get input values
  const newQuoteText = document.getElementById('newQuoteText').value.trim();
  const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

  // Validate input
  if (newQuoteText === "" || newQuoteCategory === "") {
    alert("Both quote and category are required!");
    return;
  }

  // Add new quote to the array
  quotes.push({ text: newQuoteText, category: newQuoteCategory });

  // Reset form inputs
  quoteForm.reset();

  // Provide feedback to the user
  alert("Quote added successfully!");

  // Optionally show the newly added quote
  quoteDisplay.textContent = `"${newQuoteText}" — ${newQuoteCategory}`;
}

// Event listener for form submission
quoteForm.addEventListener('submit', addQuote);
