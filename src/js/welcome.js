function toggleNav() {
    var navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

function isLoggedIn() {
    return localStorage.getItem('userLoggedIn') === 'true';
}

function handleNavigation(event, redirectUrl) {
    event.preventDefault();
    
    if (isLoggedIn()) {
        window.location.href = redirectUrl;
    } else {
        showLoginPrompt();
    }
}

function showLoginPrompt() {
    const loginPrompt = document.querySelector('.login-prompt');
    if (loginPrompt) {
        loginPrompt.style.visibility = 'visible';
        loginPrompt.style.opacity = '1';
    }
}

function closeLoginPrompt() {
    const loginPrompt = document.querySelector('.login-prompt');
    if (loginPrompt) {
        loginPrompt.style.opacity = '0';
        setTimeout(() => {
            loginPrompt.style.visibility = 'hidden';
        }, 300);
    }
}

function redirectToLogin() {
    window.location.href = 'public/login.html';
}

document.querySelector('.exam-link')?.addEventListener('click', function (event) {
    handleNavigation(event, 'public/exam.html');
});

document.querySelector('.result-link')?.addEventListener('click', function (event) {
    handleNavigation(event, 'public/results.html');
});

document.querySelector('#cancelButton')?.addEventListener('click', closeLoginPrompt);
document.querySelector('#loginButton')?.addEventListener('click', redirectToLogin);

document.querySelector('.hamburger')?.addEventListener('click', toggleNav);
