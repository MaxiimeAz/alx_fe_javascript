// Initialize quotes array from local storage or default quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Success is not final; failure is not fatal: It is the courage to continue that counts.", category: "Motivation" },
  { text: "Be yourself; everyone else is already taken.", category: "Humor" }
];

// Select DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const importFileInput = document.getElementById('importFile'); // File input for import

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote and save it to session storage
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available. Please add one!</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Save the last viewed quote to session storage
  sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));

  // Clear previous content and display new quote
  quoteDisplay.textContent = '';

  const quoteText = document.createElement('p');
  quoteText.textContent = `"${randomQuote.text}"`;

  const quoteCategory = document.createElement('p');
  quoteCategory.innerHTML = `<em>— ${randomQuote.category}</em>`;

  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

// Create the form for adding new quotes
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

  // Append elements to the form and container
  quoteForm.appendChild(inputQuoteText);
  quoteForm.appendChild(inputQuoteCategory);
  quoteForm.appendChild(submitButton);
  formContainer.appendChild(quoteForm);
  document.body.appendChild(formContainer);

  // Add event listener to the form
  quoteForm.addEventListener('submit', addQuote);
}

// Add a new quote and save it to local storage
function addQuote(event) {
  event.preventDefault();

  const newQuoteText = document.getElementById('newQuoteText').value.trim();
  const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (newQuoteText === "" || newQuoteCategory === "") {
    alert("Both quote and category are required!");
    return;
  }

  // Add new quote to the array and save it
  quotes.push({ text: newQuoteText, category: newQuoteCategory });
  saveQuotes();

  // Reset form and display the newly added quote
  document.getElementById('quoteForm').reset();
  alert("Quote added successfully!");
  showRandomQuote();
}

// Export quotes to a JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'quotes.json';
  downloadLink.click();

  URL.revokeObjectURL(url); // Cleanup
}

// Import quotes from a JSON file and update local storage
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
      showRandomQuote();
    } catch (error) {
      alert('Invalid JSON file.');
    }
  };

  fileReader.readAsText(event.target.files[0]);
}

// Initialize the app with event listeners and restore session data if available
function initializeApp() {
  createAddQuoteForm();
  newQuoteButton.addEventListener('click', showRandomQuote);
  importFileInput.addEventListener('change', importFromJsonFile);

  // Restore the last viewed quote from session storage if available
  const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
  if (lastViewedQuote) {
    quoteDisplay.textContent = '';

    const quoteText = document.createElement('p');
    quoteText.textContent = `"${lastViewedQuote.text}"`;

    const quoteCategory = document.createElement('p');
    quoteCategory.innerHTML = `<em>— ${lastViewedQuote.category}</em>`;

    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
  }
}

// Run the application
initializeApp();
