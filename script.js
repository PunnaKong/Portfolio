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
