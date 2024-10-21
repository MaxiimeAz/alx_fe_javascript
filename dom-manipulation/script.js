// Initial array of quotes with text and category
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Success is not final; failure is not fatal: It is the courage to continue that counts.", category: "Motivation" },
  { text: "Be yourself; everyone else is already taken.", category: "Humor" }
];

// Select DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');

// Function to display a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available. Please add one!</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Clear previous content and add new elements using appendChild
  quoteDisplay.textContent = ''; // Clear existing content

  const quoteText = document.createElement('p');
  quoteText.textContent = `"${randomQuote.text}"`;

  const quoteCategory = document.createElement('p');
  quoteCategory.innerHTML = `<em>— ${randomQuote.category}</em>`;

  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

// Create the form to add new quotes dynamically using appendChild
function createAddQuoteForm() {
  const formContainer = document.createElement('div');

  const quoteForm = document.createElement('form');
  quoteForm.id = 'quoteForm';

  const inputQuoteText = document.createElement('input');
  inputQuoteText.id = 'newQuoteText';
  inputQuoteText.type = 'text';
  inputQuoteText.placeholder = 'Enter a new quote';
  inputQuoteText.required = true;

  const inputQuoteCategory = document.createElement('input');
  inputQuoteCategory.id = 'newQuoteCategory';
  inputQuoteCategory.type = 'text';
  inputQuoteCategory.placeholder = 'Enter quote category';
  inputQuoteCategory.required = true;

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Add Quote';

  // Append inputs and button to the form
  quoteForm.appendChild(inputQuoteText);
  quoteForm.appendChild(inputQuoteCategory);
  quoteForm.appendChild(submitButton);

  // Append the form to the container and then to the body
  formContainer.appendChild(quoteForm);
  document.body.appendChild(formContainer);

  // Add event listener for form submission
  quoteForm.addEventListener('submit', addQuote);
}

// Function to add a new quote from the form input
function addQuote(event) {
  event.preventDefault(); // Prevent form from refreshing the page

  const newQuoteText = document.getElementById('newQuoteText').value.trim();
  const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (newQuoteText === "" || newQuoteCategory === "") {
    alert("Both quote and category are required!");
    return;
  }

  // Add new quote to the array
  quotes.push({ text: newQuoteText, category: newQuoteCategory });

  // Reset form inputs
  document.getElementById('quoteForm').reset();
  alert("Quote added successfully!");

  // Display the newly added quote using appendChild
  quoteDisplay.textContent = ''; // Clear previous content

  const quoteText = document.createElement('p');
  quoteText.textContent = `"${newQuoteText}"`;

  const quoteCategory = document.createElement('p');
  quoteCategory.innerHTML = `<em>— ${newQuoteCategory}</em>`;

  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

// Initialize the page with the form and set up event listeners
createAddQuoteForm();
newQuoteButton.addEventListener('click', showRandomQuote);
