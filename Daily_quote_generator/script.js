// Define some Daily_quote_generator quotes for the generator
const quotes = [
    "The best way to predict the future is to create it. - Peter Drucker",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "It always seems impossible until it's done. - Nelson Mandela",
    "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Strive not to be a success, but rather to be of value. - Albert Einstein",
    "The mind is everything. What you think you become. - Buddha",
    "Do not wait to strike till the iron is hot; but make the iron hot by striking. - William Butler Yeats",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
];

// Variables
let savedQuotesArray = JSON.parse(localStorage.getItem('savedQuotes')) || [];
let savedQuote = null; // To store the currently saved quote for sharing

// DOM references
const quoteTextElement = document.getElementById("quote-text");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote-btn");
const saveQuoteButton = document.getElementById("save-quote-btn");
const customQuoteTextarea = document.getElementById("custom-quote");
const saveCustomQuoteButton = document.getElementById("save-custom-quote-btn");
const shareEmailButton = document.getElementById("share-email-btn");
const shareTwitterButton = document.getElementById("share-twitter-btn");
const shareWhatsappButton = document.getElementById("share-whatsapp-btn");

// Navigation elements
const navHome = document.getElementById("nav-home");
const navAllQuotes = document.getElementById("nav-all-quotes");
const navAbout = document.getElementById("nav-about");

// Section IDs to toggle
const sections = ['home-section', 'all-quotes-section', 'about-section'];

// Quote list display
const savedQuotesList = document.getElementById("saved-quotes-list");
const predefinedQuotesList = document.getElementById("predefined-quotes-list");

// Sections and elements
const homeSection = document.getElementById("home-section");
const allQuotesSection = document.getElementById("all-quotes-section");
const aboutSection = document.getElementById("about-section");
const homeImageSection = document.querySelector('.home-image');
const allQuotesImage = document.querySelector(".all-quotes-image");
const allQuotesContainer = document.getElementById("all-quotes-container"); // Get the container

// Quote generation
function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const parts = randomQuote.split(" - ");
    quoteTextElement.textContent = parts[0].trim();
    authorElement.textContent = parts.length > 1 ? `- ${parts[1].trim()}` : "";
    savedQuote = null; // Reset saved quote when a new one is generated
}

// Save quote
function saveQuote() {
    const currentQuote = quoteTextElement.textContent;
    const currentAuthor = authorElement.textContent;
    const quoteToSave = `${currentQuote} ${currentAuthor}`;
    if (!savedQuotesArray.includes(quoteToSave)) {
        savedQuotesArray.push(quoteToSave);
        saveToLocalStorage();
        savedQuote = quoteToSave; // Update the saved quote
        if (allQuotesSection.style.display === 'block') {
            displaySavedQuotes();
        }
        alert("Quote saved!");
    } else {
        alert("This quote is already saved!");
    }
}

// Save custom quote
function saveCustomQuote() {
    const customText = customQuoteTextarea.value.trim();
    if (customText) {
        const quoteToSave = `"${customText}" - You`;
        if (!savedQuotesArray.includes(quoteToSave)) {
            savedQuotesArray.push(quoteToSave);
            saveToLocalStorage();
            savedQuote = quoteToSave; // Update the saved quote
            if (allQuotesSection.style.display === 'block') {
                displaySavedQuotes();
            }
            alert("Custom quote saved!");
            customQuoteTextarea.value = "";
        } else {
            alert("This quote is already saved!");
        }
    } else {
        alert("Please enter a quote to save.");
    }
}

// Share functions
function shareViaEmail() {
    if (savedQuote) {
        const subject = "Inspiring Quote Shared!";
        const body = `Check out this quote: ${savedQuote}\n\nShared using Daily Quote Generator`;
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoLink, '_blank');
    } else {
        alert("No quote saved to share via email.");
    }
}

function shareOnTwitter() {
    if (savedQuote) {
        const tweetText = `${savedQuote} #quote #inspiration`;
        const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(twitterLink, '_blank');
    } else {
        alert("No quote saved to share on Twitter.");
    }
}

function shareOnWhatsApp() {
    if (savedQuote) {
        const whatsappMessage = `${savedQuote} - Shared from Daily Quote Generator`;
        const whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappLink, '_blank');
    } else {
        alert("No quote saved to share on WhatsApp.");
    }
}

// Save to local storage
function saveToLocalStorage() {
    localStorage.setItem('savedQuotes', JSON.stringify(savedQuotesArray));
}

// Delete saved quote
function deleteSavedQuote(index) {
    savedQuotesArray.splice(index, 1);
    saveToLocalStorage();
    displaySavedQuotes();
    savedQuote = null; // Reset saved quote after deletion
}

// Display saved quotes
function displaySavedQuotes() {
    savedQuotesList.innerHTML = "";
    if (savedQuotesArray.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No saved quotes yet.";
        savedQuotesList.appendChild(li);
    } else {
        savedQuotesArray.forEach((quote, index) => {
            const li = document.createElement("li");
            const span = document.createElement("span");
            span.textContent = quote;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => deleteSavedQuote(index));
            li.appendChild(span);
            li.appendChild(deleteButton);
            savedQuotesList.appendChild(li);
        });
    }
}

// Display predefined quotes
function displayPredefinedQuotes() {
    predefinedQuotesList.innerHTML = "";
    quotes.forEach(quote => {
        const li = document.createElement("li");
        li.textContent = quote;
        predefinedQuotesList.appendChild(li);
    });
}

// Show selected section
function showSection(sectionId) {
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.style.display = (id === sectionId) ? 'block' : 'none';
        }
    });

    // Toggle visibility of the home image based on the active section
    if (homeImageSection) {
        homeImageSection.style.display = (sectionId === 'home-section') ? 'flex' : 'none';
    }

    // Toggle visibility of the all-quotes section and its container/image
    if (allQuotesSection && allQuotesImage && allQuotesContainer) {
        const shouldShowAllQuotes = (sectionId === 'all-quotes-section');
        allQuotesContainer.style.display = shouldShowAllQuotes ? 'flex' : 'none';
        allQuotesSection.style.display = shouldShowAllQuotes ? 'block' : 'none';
        allQuotesImage.style.display = shouldShowAllQuotes ? 'block' : 'none';
        if (shouldShowAllQuotes) {
            displaySavedQuotes();
            displayPredefinedQuotes();
        }
    } else if (sectionId === 'all-quotes-section') {
        displaySavedQuotes();
        displayPredefinedQuotes();
    }
}

// Event listeners
if (newQuoteButton) newQuoteButton.addEventListener("click", generateQuote);
if (saveQuoteButton) saveQuoteButton.addEventListener("click", saveQuote);
if (saveCustomQuoteButton) saveCustomQuoteButton.addEventListener("click", saveCustomQuote);
if (shareEmailButton) shareEmailButton.addEventListener("click", shareViaEmail);
if (shareTwitterButton) shareTwitterButton.addEventListener("click", shareOnTwitter);
if (shareWhatsappButton) shareWhatsappButton.addEventListener("click", shareOnWhatsApp);

if (navHome) navHome.addEventListener("click", () => showSection('home-section'));
if (navAllQuotes) navAllQuotes.addEventListener("click", () => showSection('all-quotes-section'));
if (navAbout) navAbout.addEventListener("click", () => showSection('about-section'));

// Initial state
generateQuote();
showSection('home-section');

// Ensure initial state hides all-quotes container (and its content/image)
if (allQuotesContainer) allQuotesContainer.style.display = 'none';
if (allQuotesSection) allQuotesSection.style.display = 'none';
if (allQuotesImage) allQuotesImage.style.display = 'none';
