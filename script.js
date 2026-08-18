// ===== Select HTML Elements =====
const toggleButton = document.querySelector('#theme-toggle');
const body = document.querySelector('body');

// ===== Function: Toggle Dark Mode =====
function toggleDarkMode() {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        toggleButton.textContent = 'Light Mode';
    } else {
        toggleButton.textContent = 'Dark Mode';
    }
}

// ===== Event Listener =====
toggleButton.addEventListener('click', toggleDarkMode);

// ===== Scroll-triggered Reveal Animation =====
// select all elements with the class "reveal"
const revealElements = document.querySelectorAll('.reveal');

// create an IntersectionObserver to observe when elements enter the viewport
const observer = new IntersectionObserver((entries) => {
    // entries = all the elements being observed (revealElements)
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // isIntersecting = true means the element is now visible in the viewport
            entry.target.classList.add('visible');
            // add class "visible" to the element that is now visible
            observer.unobserve(entry.target);
            // stop observing this element after it has become visible
        }
    });
}, {
    threshold: 0.15
    // threshold 0.15 = detect when 15% of the element is visible in the viewport
});

// order of execution: forEach → observer.observe → IntersectionObserver callback
revealElements.forEach((el) => observer.observe(el));