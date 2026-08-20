// ===== Select HTML Elements =====
const toggleButton = document.querySelector("#theme-toggle");
const body = document.querySelector("body");

// ===== Function: Toggle Dark Mode =====
function toggleDarkMode() {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    toggleButton.textContent = "Light Mode";
    localStorage.setItem("theme", "dark");
    // setItem(key, value) = store the value in localStorage with the specified key
  } else {
    toggleButton.textContent = "Dark Mode";
    localStorage.setItem("theme", "light");
  }
}

// ===== Event Listener =====
toggleButton.addEventListener("click", toggleDarkMode);

// ===== Load Saved Theme on Page Load =====
// getItem(key) = read the value that was previously stored, will return null if nothing was stored before
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  toggleButton.textContent = "Light Mode";
  // set the theme to match the previously selected option immediately after the page loads (before the user sees a flash of the default mode)
}

// ===== Scroll-triggered Reveal Animation =====
// select all elements with the class "reveal"
const revealElements = document.querySelectorAll(".reveal");

// create an IntersectionObserver to observe when elements enter the viewport
const observer = new IntersectionObserver(
  (entries) => {
    // entries = all the elements being observed (revealElements)
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // isIntersecting = true means the element is now visible in the viewport
        entry.target.classList.add("visible");
        // add class "visible" to the element that is now visible
        observer.unobserve(entry.target);
        // stop observing this element after it has become visible
      }
    });
  },
  {
    threshold: 0.15,
    // threshold 0.15 = detect when 15% of the element is visible in the viewport
  },
);

// order of execution: forEach → observer.observe → IntersectionObserver callback
revealElements.forEach((el) => observer.observe(el));

// ===== fetch(): ดึงคำคมสุ่มจาก API มาโชว์ =====
const quoteElement = document.querySelector('#quote');

fetch("https://dummyjson.com/quotes/random")
  // fetch()  = request data from the API, returns a Promise (a placeholder for future data)
  .then((response) => response.json())
  // .then() = wait for the Promise to resolve, then execute the function with the resolved value (response)
  .then((data) => {
    // .then() = wait for the previous .then() to finish, then execute the function with the resolved value (data)
    quoteElement.textContent = `"${data.quote}" — ${data.author}`;
    // data.quote = the quote text, data.author = the author of the quote
  })
  .catch((error) => {
    // .catch() = Find any errors that occur in the previous .then() calls and execute the function with the error object
    quoteElement.textContent = "Stay curious, keep building.";
    // fallback quote if the API request fails
    console.error("Failed to load quote:", error);
    // log the error to the console for debugging
  });

// ===== Contact Form: submit AJAX with fetch =====
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // preventDefault() = stop the form from submitting normally (which would reload the page)
    // Instead, we will handle the submission with JavaScript and fetch()

    const formData = new FormData(contactForm);
    // FormData = an object that holds the <form> data in key-value pairs, ready to be sent via fetch()

    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
            // Tell the server(Formspree) to know that we expect a JSON response
        }
    })
        .then((response) => {
            if (response.ok) {
                // response.ok = true if the HTTP status code is in the range 200-299, indicating a successful request
                formStatus.textContent = 'Thank you! Your message has been sent.';
                formStatus.className = 'success';
                contactForm.reset();
                // reset() = clear the form fields after successful submission
            } else {
                formStatus.textContent = 'Something went wrong. Please try again.';
                formStatus.className = 'error';
            }
        })
        .catch((error) => {
            formStatus.textContent = 'Network error. Please check your connection.';
            formStatus.className = 'error';
            console.error('Form submission failed:', error);
        });
});
