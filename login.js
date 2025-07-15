document.addEventListener('DOMContentLoaded', () => {
    const flipper = document.getElementById('flipper');
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    const captchaTextEl = document.getElementById('captchaText');
    const captchaInput = document.getElementById('captchaInput');
    const refreshCaptchaBtn = document.getElementById('refreshCaptcha');

    let currentCaptcha = '';

    // --- Flipper Logic ---
    showRegisterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        flipper.classList.add('is-flipped');
    });

    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        flipper.classList.remove('is-flipped');
    });

    // --- Captcha Logic ---
    function generateCaptcha() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = '';
        for (let i = 0; i < 5; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        currentCaptcha = result;
        captchaTextEl.textContent = result;
        captchaInput.value = '';
    }

    refreshCaptchaBtn.addEventListener('click', generateCaptcha);

    // --- Form Submission Logic ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // --- NEW: Save user info to localStorage ---
        const loginEmail = document.getElementById('loginEmail').value;
        localStorage.setItem('cleanseFlowUserEmail', loginEmail);
        // For login, we don't have a name, so we can use a placeholder or derive from email
        const nameFromEmail = loginEmail.split('@')[0];
        localStorage.setItem('cleanseFlowUserName', nameFromEmail);
        // --- END NEW ---

        window.location.href = 'app.html'; // Redirect to the main app
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (captchaInput.value.toUpperCase() !== currentCaptcha.toUpperCase()) {
            alert('Captcha validation failed. Please try again.');
            generateCaptcha();
            return;
        }
        
        // --- NEW: Save user info to localStorage ---
        const registerName = document.getElementById('registerName').value;
        const registerEmail = document.getElementById('registerEmail').value;
        localStorage.setItem('cleanseFlowUserName', registerName);
        localStorage.setItem('cleanseFlowUserEmail', registerEmail);
        // --- END NEW ---

        alert('Registration successful! You will now be taken to the app.');
        window.location.href = 'app.html'; // Redirect to the main app
    });

    // Initial captcha generation
    generateCaptcha();
});
