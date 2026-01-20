// JusConsultus AI - Main JavaScript

// Theme Toggle
function toggleTheme() {
  const html = document.documentElement;
  const sunIcons = document.querySelectorAll('#sunIcon');
  const moonIcons = document.querySelectorAll('#moonIcon');
  
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    sunIcons.forEach(icon => icon.style.display = 'block');
    moonIcons.forEach(icon => icon.style.display = 'none');
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    sunIcons.forEach(icon => icon.style.display = 'none');
    moonIcons.forEach(icon => icon.style.display = 'block');
  }
}

// Initialize theme from localStorage
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const sunIcons = document.querySelectorAll('#sunIcon');
  const moonIcons = document.querySelectorAll('#moonIcon');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    sunIcons.forEach(icon => icon.style.display = 'none');
    moonIcons.forEach(icon => icon.style.display = 'block');
  } else {
    document.documentElement.classList.remove('dark');
    sunIcons.forEach(icon => icon.style.display = 'block');
    moonIcons.forEach(icon => icon.style.display = 'none');
  }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('active');
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.remove('active');
  }
}

// Form Validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

// Demo Users Database
const DEMO_USERS = {
  'test@jusconsultus.com': { password: 'testuser123', name: 'Test User', role: 'free', plan: 'Free Trial' },
  'pro@jusconsultus.com': { password: 'prouser123', name: 'Pro User', role: 'pro', plan: 'Professional' },
  'admin': { password: 'ChangeMe123!', name: 'Administrator', role: 'admin', plan: 'Enterprise' }
};

// Login Form Handler
function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const errorDiv = document.getElementById('error-message');
  const successDiv = document.getElementById('success-message');
  
  // Reset messages
  if (errorDiv) errorDiv.style.display = 'none';
  if (successDiv) successDiv.style.display = 'none';
  
  // Check demo credentials
  const user = DEMO_USERS[email] || DEMO_USERS[email.toLowerCase()];
  
  if (user && user.password === password) {
    // Store user session in localStorage
    const sessionData = {
      email: email,
      name: user.name,
      role: user.role,
      plan: user.plan,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('jusconsultus_user', JSON.stringify(sessionData));
    
    // Show success message
    if (successDiv) {
      successDiv.textContent = 'Login successful! Redirecting to dashboard...';
      successDiv.style.display = 'block';
    }
    
    // Redirect to dashboard
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
    return;
  }
  
  // Validate email format for non-demo users
  if (!validateEmail(email) && email !== 'admin') {
    if (errorDiv) {
      errorDiv.textContent = 'Please enter a valid email address';
      errorDiv.style.display = 'block';
    }
    return;
  }
  
  if (!validatePassword(password)) {
    if (errorDiv) {
      errorDiv.textContent = 'Password must be at least 8 characters';
      errorDiv.style.display = 'block';
    }
    return;
  }
  
  // Invalid credentials
  if (errorDiv) {
    errorDiv.textContent = 'Invalid email or password. Please check your credentials.';
    errorDiv.style.display = 'block';
  }
}

// Signup Form Handler
function handleSignup(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  // Try signup-specific IDs first, fall back to generic IDs
  const emailInput = document.getElementById('signup-email') || document.getElementById('email');
  const passwordInput = document.getElementById('signup-password') || document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  
  const email = emailInput ? emailInput.value : '';
  const password = passwordInput ? passwordInput.value : '';
  const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';
  
  const errorDiv = document.getElementById('error-message');
  const successDiv = document.getElementById('success-message');
  
  // Reset messages
  if (errorDiv) errorDiv.style.display = 'none';
  if (successDiv) successDiv.style.display = 'none';
  
  // Validate
  if (!name || name.trim().length < 2) {
    if (errorDiv) {
      errorDiv.textContent = 'Please enter a valid name (at least 2 characters)';
      errorDiv.style.display = 'block';
    }
    return;
  }
  
  if (!validateEmail(email)) {
    if (errorDiv) {
      errorDiv.textContent = 'Please enter a valid email address';
      errorDiv.style.display = 'block';
    }
    return;
  }
  
  if (password.length < 6) {
    if (errorDiv) {
      errorDiv.textContent = 'Password must be at least 6 characters';
      errorDiv.style.display = 'block';
    }
    return;
  }
  
  if (password !== confirmPassword) {
    if (errorDiv) {
      errorDiv.textContent = 'Passwords do not match';
      errorDiv.style.display = 'block';
    }
    return;
  }
  
  // Show success message and switch to signin
  if (successDiv) {
    successDiv.textContent = 'Account created successfully! Please sign in to continue.';
    successDiv.style.display = 'block';
  }
  
  // Switch to sign in tab after successful signup
  setTimeout(() => {
    switchTab('signin');
    // Pre-fill email if available
    const signinEmail = document.getElementById('email');
    if (signinEmail && email) {
      signinEmail.value = email;
    }
  }, 2000);
}

// Contact Form Handler
function handleContact(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  const successDiv = document.getElementById('success-message');
  const formContainer = document.getElementById('contact-form-container');
  
  // Basic validation
  if (!name || !email || !subject || !message) {
    alert('Please fill in all fields');
    return;
  }
  
  if (!validateEmail(email)) {
    alert('Please enter a valid email address');
    return;
  }
  
  // Show success message
  if (formContainer) formContainer.style.display = 'none';
  if (successDiv) successDiv.style.display = 'block';
}

// Toggle password visibility
function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(inputId + '-icon');
  
  if (input.type === 'password') {
    input.type = 'text';
    if (icon) icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>';
  } else {
    input.type = 'password';
    if (icon) icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>';
  }
}

// FAQ Toggle
function toggleFAQ(element) {
  // Handle both clicking on .faq-question and .faq-item
  const faqItem = element.classList.contains('faq-item') ? element : element.closest('.faq-item');
  
  if (faqItem) {
    // Close other open FAQ items (accordion behavior)
    const allFaqItems = document.querySelectorAll('.faq-item');
    allFaqItems.forEach(item => {
      if (item !== faqItem && item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });
    
    // Toggle current FAQ item
    faqItem.classList.toggle('active');
  }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
      closeMobileMenu();
    });
  });
}

// Check URL parameters
function getURLParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    signup: params.get('signup') === 'true',
    plan: params.get('plan'),
    mode: params.get('mode')
  };
}

// Logout Handler
function handleLogout() {
  localStorage.removeItem('jusconsultus_user');
  window.location.href = 'login.html';
}

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('jusconsultus_user') !== null;
}

// Get current user data
function getCurrentUser() {
  const userData = localStorage.getItem('jusconsultus_user');
  return userData ? JSON.parse(userData) : null;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  initSmoothScroll();
  
  // Check for form toggle based on URL
  const params = getURLParams();
  if (params.signup) {
    const signupTab = document.getElementById('signup-tab');
    if (signupTab) signupTab.click();
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.hamburger');
  
  if (mobileMenu && mobileMenu.classList.contains('active')) {
    if (!mobileMenu.contains(e.target) && (!hamburger || !hamburger.contains(e.target))) {
      closeMobileMenu();
    }
  }
});
