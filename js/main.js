// JusConsultus AI - Main JavaScript

// Theme Toggle
function toggleTheme() {
  const html = document.documentElement;
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    if (sunIcon) sunIcon.style.display = 'block';
    if (moonIcon) moonIcon.style.display = 'none';
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    if (sunIcon) sunIcon.style.display = 'none';
    if (moonIcon) moonIcon.style.display = 'block';
  }
}

// Initialize theme from localStorage
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    if (sunIcon) sunIcon.style.display = 'none';
    if (moonIcon) moonIcon.style.display = 'block';
  } else {
    document.documentElement.classList.remove('dark');
    if (sunIcon) sunIcon.style.display = 'block';
    if (moonIcon) moonIcon.style.display = 'none';
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

// Login Form Handler
function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorDiv = document.getElementById('error-message');
  const successDiv = document.getElementById('success-message');
  
  // Reset messages
  if (errorDiv) errorDiv.style.display = 'none';
  if (successDiv) successDiv.style.display = 'none';
  
  // Validate
  if (!validateEmail(email)) {
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
  
  // Show success message (in a real app, this would make an API call)
  if (successDiv) {
    successDiv.textContent = 'Login successful! Redirecting...';
    successDiv.style.display = 'block';
  }
  
  // Simulate redirect (in production, this would be handled after API response)
  setTimeout(() => {
    alert('This is a demo. In production, you would be redirected to the app.');
  }, 1500);
}

// Signup Form Handler
function handleSignup(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorDiv = document.getElementById('error-message');
  const successDiv = document.getElementById('success-message');
  
  // Reset messages
  if (errorDiv) errorDiv.style.display = 'none';
  if (successDiv) successDiv.style.display = 'none';
  
  // Validate
  if (!name || name.length < 2) {
    if (errorDiv) {
      errorDiv.textContent = 'Please enter your name';
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
  
  if (!validatePassword(password)) {
    if (errorDiv) {
      errorDiv.textContent = 'Password must be at least 8 characters';
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
  
  // Show success message
  if (successDiv) {
    successDiv.textContent = 'Account created successfully! Redirecting...';
    successDiv.style.display = 'block';
  }
  
  // Simulate redirect
  setTimeout(() => {
    alert('This is a demo. In production, you would be redirected to the app.');
  }, 1500);
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
  const answer = element.nextElementSibling;
  const icon = element.querySelector('.faq-icon');
  
  if (answer.style.maxHeight) {
    answer.style.maxHeight = null;
    answer.style.paddingTop = '0';
    answer.style.paddingBottom = '0';
    if (icon) icon.style.transform = 'rotate(0deg)';
  } else {
    answer.style.maxHeight = answer.scrollHeight + 'px';
    answer.style.paddingTop = '1rem';
    answer.style.paddingBottom = '1rem';
    if (icon) icon.style.transform = 'rotate(180deg)';
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
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  }
});
