// Toggle the mobile navbar visibility
function toggleNav() {
    var navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active'); // This toggles the 'active' class to show/hide the navbar
}

// Check if the user is logged in
function isLoggedIn() {
    return localStorage.getItem('userLoggedIn') === 'true';
}

// Handle navigation, showing login prompt if not logged in
function handleNavigation(event, redirectUrl) {
    event.preventDefault();
    
    if (isLoggedIn()) {
        window.location.href = redirectUrl;
    } else {
        showLoginPrompt();
    }
}

// Show the login prompt (modal) to the user
function showLoginPrompt() {
    const loginPrompt = document.querySelector('.login-prompt');
    if (loginPrompt) {
        loginPrompt.style.visibility = 'visible'; // Show modal
        loginPrompt.style.opacity = '1'; // Smooth transition
    }
}

// Close the login prompt (modal)
function closeLoginPrompt() {
    const loginPrompt = document.querySelector('.login-prompt');
    if (loginPrompt) {
        loginPrompt.style.opacity = '0'; // Fade out
        setTimeout(() => {
            loginPrompt.style.visibility = 'hidden'; // Hide after fading out
        }, 300); // Match this duration with your CSS animation timing
    }
}

// Redirect the user to the login page
function redirectToLogin() {
    window.location.href = 'public/login.html';
}

// Add event listeners for the Exam and Result links
document.querySelector('.exam-link')?.addEventListener('click', function (event) {
    handleNavigation(event, 'public/exam.html');
});

document.querySelector('.result-link')?.addEventListener('click', function (event) {
    handleNavigation(event, 'public/results.html');
});

// Add event listeners for modal buttons
document.querySelector('#cancelButton')?.addEventListener('click', closeLoginPrompt);
document.querySelector('#loginButton')?.addEventListener('click', redirectToLogin);

// Add event listener to the hamburger icon to toggle the menu on click
document.querySelector('.hamburger')?.addEventListener('click', toggleNav);
