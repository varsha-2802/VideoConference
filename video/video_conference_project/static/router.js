// Simple router to handle page transitions
(function() {
    function checkAuth() {
        return localStorage.getItem('userLoggedIn') === 'true';
    }

    function init() {
        const currentPage = window.location.pathname.split('/').pop();

        if (currentPage === 'base.html' && !checkAuth()) {
            window.location.href = 'login.html';
            return;
        }

        if ((currentPage === 'login.html' || currentPage === 'signup.html') && checkAuth()) {
            window.location.href = 'base.html';
            return;
        }

        if (currentPage === 'login.html') {
            document.getElementById('loginForm').addEventListener('submit', function(e) {
                e.preventDefault();
                // Here you would typically validate the login credentials
                // For this example, we'll just set the user as logged in
                localStorage.setItem('userLoggedIn', 'true');
                window.location.href = 'base.html';
            });
        }

        if (currentPage === 'signup.html') {
            document.getElementById('signupForm').addEventListener('submit', function(e) {
                e.preventDefault();
                // Here you would typically handle the signup process
                // For this example, we'll just set the user as logged in
                localStorage.setItem('userLoggedIn', 'true');
                window.location.href = 'base.html';
            });
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();