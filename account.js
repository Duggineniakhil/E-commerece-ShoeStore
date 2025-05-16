document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const tabIndicator = document.querySelector('.tab-indicator');
    const menuItems = document.getElementById('menuItems');

    // Form Switching Function
    function switchForm(formType) {
        // Reset all forms and tabs
        loginForm.classList.remove('active');
        registerForm.classList.remove('active');
        forgotPasswordForm.classList.remove('active');
        loginTab.classList.remove('active');
        registerTab.classList.remove('active');

        // Activate the selected form and tab
        if (formType === 'login') {
            loginForm.classList.add('active');
            loginTab.classList.add('active');
            tabIndicator.style.transform = 'translateX(0)';
        } else if (formType === 'register') {
            registerForm.classList.add('active');
            registerTab.classList.add('active');
            tabIndicator.style.transform = 'translateX(100%)';
        } else if (formType === 'forgot') {
            forgotPasswordForm.classList.add('active');
        }
    }

    // Event Listeners
    loginTab.addEventListener('click', () => switchForm('login'));
    registerTab.addEventListener('click', () => switchForm('register'));
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchForm('forgot');
    });

    // Form Submissions
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        // Here you would typically validate and send to server
        console.log('Login submitted:', { username, password });
        alert('Login functionality would be implemented here');
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Here you would typically validate and send to server
        console.log('Register submitted:', { username, email, password });
        alert('Registration functionality would be implemented here');
    });

    forgotPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('resetEmail').value;
        
        // Here you would typically send reset email
        console.log('Password reset requested for:', email);
        alert('Password reset link would be sent to your email');
        switchForm('login');
    });

    // Mobile Menu Toggle
    window.menuToggle = function() {
        menuItems.classList.toggle('show');
    };

    // Initialize the default form (Login)
    switchForm('login');
});