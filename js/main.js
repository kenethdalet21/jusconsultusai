// JusConsultus AI - Main JavaScript
// Comprehensive functionality for the static website

// ============================================
// DEMO USERS FOR TESTING
// ============================================

const DEMO_USERS = {
  'test@jusconsultus.com': { password: 'test123', name: 'Test User', role: 'free', plan: 'Free' },
  'pro@jusconsultus.com': { password: 'pro123', name: 'Pro User', role: 'pro', plan: 'Professional' },
  'admin': { password: 'admin', name: 'Administrator', role: 'admin', plan: 'Enterprise' },
  'admin@jusconsultus.com': { password: 'admin123', name: 'Admin User', role: 'admin', plan: 'Enterprise' }
};

// ============================================
// AUTHENTICATION & SESSION MANAGEMENT
// ============================================

// Quick Login Function
function quickLogin(email, password) {
  // Fill in the form
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  
  if (emailInput && passwordInput) {
    emailInput.value = email;
    passwordInput.value = password;
    
    // Simulate form submission
    const loginForm = document.querySelector('form[onsubmit*="handleLogin"]');
    if (loginForm) {
      // Create a synthetic event
      const event = new Event('submit', {
        bubbles: true,
        cancelable: true
      });
      loginForm.dispatchEvent(event);
    }
  }
}

// Check if user is authenticated (for protected pages)
function checkAuth() {
  const user = localStorage.getItem('jusconsultus_user');
  if (!user) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// Get current user data
function getCurrentUser() {
  const userData = localStorage.getItem('jusconsultus_user');
  return userData ? JSON.parse(userData) : null;
}

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('jusconsultus_user') !== null;
}

// Check if user is Pro
function isProUser() {
  const user = getCurrentUser();
  return user && (user.role === 'pro' || user.role === 'admin');
}

// Check if user is Admin
function isAdmin() {
  const user = getCurrentUser();
  return user && user.role === 'admin';
}

// Logout Handler
function handleLogout() {
  localStorage.removeItem('jusconsultus_user');
  window.location.href = 'login.html';
}

// Update user session data
function updateUserSession(data) {
  const user = getCurrentUser();
  if (user) {
    const updatedUser = { ...user, ...data };
    localStorage.setItem('jusconsultus_user', JSON.stringify(updatedUser));
    return updatedUser;
  }
  return null;
}

// ============================================
// THEME MANAGEMENT
// ============================================

// ============================================
// THEME MANAGEMENT
// ============================================

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

// ============================================
// NAVIGATION & MOBILE MENU
// ============================================

// ============================================
// NAVIGATION & MOBILE MENU
// ============================================

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

// Toggle sidebar on mobile
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.toggle('active');
  }
}

// Close sidebar on mobile
function closeSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.remove('active');
  }
}

// ============================================
// FORM VALIDATION
// ============================================

// ============================================
// FORM VALIDATION
// ============================================

// Form Validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

// ============================================
// DEMO USERS & LOGIN
// ============================================

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
      errorDiv.textContent = 'Password must be at least 6 characters';
      errorDiv.style.display = 'block';
    }
    return;
  }
  
  // Invalid credentials
  if (errorDiv) {
    errorDiv.textContent = 'Invalid email or password. Try the demo credentials below.';
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

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Format date for display
function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Format date with time
function formatDateTime(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Format relative time (e.g., "2 hours ago")
function formatRelativeTime(date) {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now - d;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);

  if (diffDays > 30) return formatDate(date);
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffHr > 0) return `${diffHr} hour${diffHr > 1 ? 's' : ''} ago`;
  if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  return 'Just now';
}

// Format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Debounce function for search inputs
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Truncate text with ellipsis
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

// Copy text to clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

// Show toast notification
function showToast(message, type = 'info', duration = 3000) {
  // Remove existing toast
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;color:inherit;cursor:pointer;padding:0 0 0 10px;">&times;</button>
  `;
  
  // Add toast styles if not present
  if (!document.querySelector('#toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
      .toast-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      .toast-info { background: var(--primary-600, #2563eb); color: white; }
      .toast-success { background: #10b981; color: white; }
      .toast-error { background: #ef4444; color: white; }
      .toast-warning { background: #f59e0b; color: white; }
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(toast);
  
  // Auto-remove after duration
  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.animation = 'slideIn 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }
  }, duration);
}

// ============================================
// MODAL MANAGEMENT
// ============================================

// Open modal by ID
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

// Close modal by ID
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking outside
function setupModalCloseOnOutsideClick() {
  document.querySelectorAll('.modal, .modal-overlay').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  });
}

// ============================================
// LOCAL STORAGE HELPERS
// ============================================

// Get data from localStorage with default value
function getStorageItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return defaultValue;
  }
}

// Set data to localStorage
function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('Error writing to localStorage:', e);
    return false;
  }
}

// Remove item from localStorage
function removeStorageItem(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error('Error removing from localStorage:', e);
    return false;
  }
}

// ============================================
// BOOKMARKS MANAGEMENT
// ============================================

const BOOKMARKS_KEY = 'jusconsultus_bookmarks';

function getBookmarks() {
  return getStorageItem(BOOKMARKS_KEY, []);
}

function addBookmark(item) {
  const bookmarks = getBookmarks();
  const newBookmark = {
    id: generateId(),
    ...item,
    createdAt: new Date().toISOString()
  };
  bookmarks.push(newBookmark);
  setStorageItem(BOOKMARKS_KEY, bookmarks);
  return newBookmark;
}

function removeBookmark(id) {
  const bookmarks = getBookmarks();
  const filtered = bookmarks.filter(b => b.id !== id);
  setStorageItem(BOOKMARKS_KEY, filtered);
  return filtered;
}

function isBookmarked(type, title) {
  const bookmarks = getBookmarks();
  return bookmarks.some(b => b.type === type && b.title === title);
}

// ============================================
// LIBRARY/FILES MANAGEMENT
// ============================================

const LIBRARY_KEY = 'jusconsultus_library';

function getLibraryFiles() {
  return getStorageItem(LIBRARY_KEY, []);
}

function addLibraryFile(file) {
  const files = getLibraryFiles();
  const newFile = {
    id: generateId(),
    ...file,
    uploadedAt: new Date().toISOString()
  };
  files.push(newFile);
  setStorageItem(LIBRARY_KEY, files);
  return newFile;
}

function removeLibraryFile(id) {
  const files = getLibraryFiles();
  const filtered = files.filter(f => f.id !== id);
  setStorageItem(LIBRARY_KEY, filtered);
  return filtered;
}

// ============================================
// CHAT HISTORY MANAGEMENT
// ============================================

const CHAT_HISTORY_KEY = 'jusconsultus_chat_history';

function getChatHistory() {
  return getStorageItem(CHAT_HISTORY_KEY, []);
}

function saveChatMessage(role, content) {
  const history = getChatHistory();
  history.push({
    id: generateId(),
    role,
    content,
    timestamp: new Date().toISOString()
  });
  setStorageItem(CHAT_HISTORY_KEY, history);
}

function clearChatHistory() {
  removeStorageItem(CHAT_HISTORY_KEY);
}

// ============================================
// QUERY USAGE MANAGEMENT
// ============================================

const QUERY_USAGE_KEY = 'jusconsultus_query_usage';
const FREE_QUERY_LIMIT = 50;

function getQueryUsage() {
  const usage = getStorageItem(QUERY_USAGE_KEY, { count: 0, resetDate: new Date().toISOString().split('T')[0] });
  // Reset if it's a new day
  const today = new Date().toISOString().split('T')[0];
  if (usage.resetDate !== today) {
    usage.count = 0;
    usage.resetDate = today;
    setStorageItem(QUERY_USAGE_KEY, usage);
  }
  return usage;
}

function incrementQueryUsage() {
  const usage = getQueryUsage();
  usage.count++;
  setStorageItem(QUERY_USAGE_KEY, usage);
  return usage;
}

function canMakeQuery() {
  const user = getCurrentUser();
  if (user && (user.role === 'pro' || user.role === 'admin')) {
    return true;
  }
  const usage = getQueryUsage();
  return usage.count < FREE_QUERY_LIMIT;
}

function getRemainingQueries() {
  const user = getCurrentUser();
  if (user && (user.role === 'pro' || user.role === 'admin')) {
    return 'Unlimited';
  }
  const usage = getQueryUsage();
  return FREE_QUERY_LIMIT - usage.count;
}

// ============================================
// GENERATED DOCUMENTS MANAGEMENT
// ============================================

const GENERATED_DOCS_KEY = 'jusconsultus_generated_docs';

function getGeneratedDocuments() {
  return getStorageItem(GENERATED_DOCS_KEY, []);
}

function saveGeneratedDocument(doc) {
  const docs = getGeneratedDocuments();
  const newDoc = {
    id: generateId(),
    ...doc,
    createdAt: new Date().toISOString()
  };
  docs.unshift(newDoc); // Add to beginning
  setStorageItem(GENERATED_DOCS_KEY, docs);
  return newDoc;
}

function removeGeneratedDocument(id) {
  const docs = getGeneratedDocuments();
  const filtered = docs.filter(d => d.id !== id);
  setStorageItem(GENERATED_DOCS_KEY, filtered);
  return filtered;
}

// ============================================
// SEARCH RESULTS DATA
// ============================================

const SAMPLE_LEGAL_DATA = {
  laws: [
    { id: 'law1', title: 'Republic Act No. 386 - Civil Code of the Philippines', type: 'Republic Act', date: '1949-06-18', category: 'Laws' },
    { id: 'law2', title: 'Republic Act No. 10963 - TRAIN Law', type: 'Republic Act', date: '2017-12-19', category: 'Laws' },
    { id: 'law3', title: 'Republic Act No. 10173 - Data Privacy Act of 2012', type: 'Republic Act', date: '2012-08-15', category: 'Laws' },
    { id: 'law4', title: 'Republic Act No. 9262 - Anti-Violence Against Women and Children Act', type: 'Republic Act', date: '2004-03-08', category: 'Laws' },
    { id: 'law5', title: 'Republic Act No. 11032 - Ease of Doing Business Act', type: 'Republic Act', date: '2018-05-28', category: 'Laws' },
    { id: 'law6', title: 'Executive Order No. 209 - Family Code of the Philippines', type: 'Executive Order', date: '1987-07-06', category: 'Laws' }
  ],
  cases: [
    { id: 'case1', title: 'G.R. No. 123456 - People v. Dela Cruz', type: 'Supreme Court Decision', date: '2024-01-15', category: 'Supreme Court' },
    { id: 'case2', title: 'G.R. No. 234567 - Republic v. Santos', type: 'Supreme Court Decision', date: '2024-02-20', category: 'Supreme Court' },
    { id: 'case3', title: 'G.R. No. 345678 - Gonzales v. Court of Appeals', type: 'Supreme Court Decision', date: '2023-11-10', category: 'Supreme Court' },
    { id: 'case4', title: 'G.R. No. 456789 - Estate of Garcia v. Heirs of Lopez', type: 'Supreme Court Decision', date: '2023-09-05', category: 'Supreme Court' }
  ],
  issuances: [
    { id: 'iss1', title: 'Executive Order No. 292 - Administrative Code of 1987', type: 'Executive Order', date: '1987-07-25', category: 'Executive Issuances' },
    { id: 'iss2', title: 'Administrative Order No. 25 - Rationalization Program', type: 'Administrative Order', date: '2011-12-21', category: 'Executive Issuances' },
    { id: 'iss3', title: 'Memorandum Circular No. 18 - Guidelines on Home-Based Work', type: 'Memorandum Circular', date: '2020-03-16', category: 'Executive Issuances' }
  ]
};

// ============================================
// AI RESPONSE GENERATION
// ============================================

function generateAIResponse(query, mode = 'find') {
  const lowerQuery = query.toLowerCase();
  let response = '';
  let searchResults = [];
  
  // Simulate search in legal database
  const allDocs = [...SAMPLE_LEGAL_DATA.laws, ...SAMPLE_LEGAL_DATA.cases, ...SAMPLE_LEGAL_DATA.issuances];
  
  // Simple keyword matching
  const keywords = lowerQuery.split(' ').filter(w => w.length > 3);
  searchResults = allDocs.filter(doc => {
    const docText = (doc.title + ' ' + doc.type + ' ' + doc.category).toLowerCase();
    return keywords.some(keyword => docText.includes(keyword));
  }).slice(0, 5);

  // Generate response based on mode
  switch (mode) {
    case 'find':
      response = generateFindResponse(query, searchResults);
      break;
    case 'explain':
      response = generateExplainResponse(query);
      break;
    case 'draft':
      response = generateDraftResponse(query);
      break;
    case 'digest':
      response = generateDigestResponse(query);
      break;
    default:
      response = generateFindResponse(query, searchResults);
  }
  
  return { response, searchResults };
}

function generateFindResponse(query, results) {
  if (results.length > 0) {
    let response = `Based on my search of the Philippine legal database, I found the following relevant results for your query:\n\n`;
    results.forEach((doc, idx) => {
      response += `**${idx + 1}. ${doc.title}**\n`;
      response += `   Type: ${doc.type} | Category: ${doc.category}\n\n`;
    });
    response += `\nWould you like me to explain any of these in detail? You can also use the "Explain" mode for a deeper analysis.`;
    return response;
  } else {
    return `I searched the legal database for "${query}" but couldn't find exact matches. Here are some suggestions:\n\n` +
           `1. Try using more specific legal terms\n` +
           `2. Check for the correct Republic Act or case number\n` +
           `3. Use the Legal Database page to browse categories\n\n` +
           `Would you like me to help refine your search?`;
  }
}

function generateExplainResponse(query) {
  return `**Legal Analysis:**\n\n` +
         `Based on Philippine law and jurisprudence regarding "${query}":\n\n` +
         `**Key Legal Principles:**\n` +
         `• The applicable law provides for specific requirements that must be met\n` +
         `• Relevant jurisprudence has established important precedents\n` +
         `• The Supreme Court has consistently held that proper procedure must be followed\n\n` +
         `**Practical Application:**\n` +
         `When dealing with matters related to your query, consider:\n` +
         `1. Consulting the specific provisions of relevant laws\n` +
         `2. Reviewing leading Supreme Court decisions on the matter\n` +
         `3. Seeking professional legal counsel for specific cases\n\n` +
         `*Note: This is a demo response. In the full version, you would receive comprehensive legal analysis with specific citations.*`;
}

function generateDraftResponse(query) {
  return `**Document Draft Suggestions:**\n\n` +
         `Based on your request for "${query}", here are some drafting guidelines:\n\n` +
         `**Recommended Document Structure:**\n` +
         `1. **Caption/Heading** - Proper formatting per court rules\n` +
         `2. **Statement of Facts** - Clear, chronological presentation\n` +
         `3. **Legal Basis** - Applicable laws and jurisprudence\n` +
         `4. **Prayer/Relief** - Specific remedies sought\n\n` +
         `**Key Reminders:**\n` +
         `• Follow the SC Efficient Use of Paper Rule (A.M. No. 11-9-4-SC)\n` +
         `• Use proper legal terminology\n` +
         `• Include all required certifications\n\n` +
         `Would you like me to help you create this document? Go to the **Document Generator** for templates and AI-assisted drafting.`;
}

function generateDigestResponse(query) {
  return `**Case/Law Digest:**\n\n` +
         `Here's a summary digest format for legal research on "${query}":\n\n` +
         `**Title:** [Case/Law Title]\n\n` +
         `**Citation:** [Proper Citation Format]\n\n` +
         `**Facts:** Brief statement of the relevant facts\n\n` +
         `**Issue(s):** The legal questions presented\n\n` +
         `**Held:** The court's ruling or the law's key provisions\n\n` +
         `**Ratio Decidendi:** The legal reasoning behind the decision\n\n` +
         `**Application:** How this applies to your situation\n\n` +
         `*To get a complete digest, please provide the specific case GR number or law reference.*`;
}

// ============================================
// DOCUMENT TEMPLATES
// ============================================

const DOCUMENT_TEMPLATES = {
  complaint: {
    title: 'Complaint',
    content: `REPUBLIC OF THE PHILIPPINES
[COURT NAME]
[JUDICIAL REGION]
[City/Municipality], [Province]

[PLAINTIFF NAME],
          Plaintiff,

-versus-                          Civil Case No. _______

[DEFENDANT NAME],
          Defendant.
x----------------------------------x

COMPLAINT

COMES NOW the Plaintiff, through undersigned counsel, unto this Honorable Court, most respectfully alleges that:

1. Plaintiff is of legal age, Filipino citizen, and a resident of [Address], where summons and other legal processes may be served;

2. Defendant is likewise of legal age, and a resident of [Address], where summons and other legal processes may be served;

STATEMENT OF FACTS

3. [State the facts giving rise to the cause of action]

CAUSE OF ACTION

4. [State the legal basis for the claim]

PRAYER

WHEREFORE, premises considered, plaintiff respectfully prays that judgment be rendered:

1. [State the relief sought]
2. Such other reliefs as may be just and equitable under the circumstances.

[City], Philippines, [Date].

                              [COUNSEL NAME]
                              Counsel for Plaintiff
                              [Address]
                              [IBP/PTR/Roll No./MCLE]`
  },
  affidavit: {
    title: 'Affidavit',
    content: `REPUBLIC OF THE PHILIPPINES)
[City/Municipality]               ) S.S.

AFFIDAVIT

I, [AFFIANT NAME], of legal age, Filipino citizen, and a resident of [Complete Address], after having been duly sworn in accordance with law, do hereby depose and state that:

1. I am executing this Affidavit to attest to the truth of the following facts within my personal knowledge;

2. [State fact 1];

3. [State fact 2];

4. [State additional facts as necessary];

5. I am executing this Affidavit to [state the purpose];

6. I am executing this Affidavit in support of [if applicable];

7. I hereby attest that all statements made herein are true and correct based on my personal knowledge and/or authentic records, and I understand that any false statement may subject me to criminal prosecution.

IN WITNESS WHEREOF, I have hereunto affixed my signature this ____ day of ________ 20__ in [City], Philippines.

                              ________________________
                              [AFFIANT NAME]
                              Affiant

SUBSCRIBED AND SWORN to before me this ____ day of ________ 20__ at [City], Philippines. Affiant exhibited to me his/her [ID Type] with ID No. ________ issued on ________ at ________.

                              ________________________
                              Notary Public
Doc. No. ______;
Page No. ______;
Book No. ______;
Series of 20__.`
  },
  demandLetter: {
    title: 'Demand Letter',
    content: `[YOUR LETTERHEAD]
[Your Address]
[Date]

[RECIPIENT NAME]
[Recipient Address]
[City, Province, ZIP]

RE: DEMAND FOR PAYMENT
    Amount: [PHP Amount]
    Reference: [Contract/Invoice No.]

Dear [Mr./Ms./Atty. RECIPIENT]:

I write on behalf of [CLIENT NAME / or "myself"] to formally demand payment of the sum of [AMOUNT IN WORDS (PHP Amount)] representing [describe the obligation, e.g., unpaid balance, services rendered, damages, etc.].

STATEMENT OF FACTS

[Briefly state the circumstances giving rise to the obligation]

Despite previous verbal and/or written demands, you have failed and refused to settle your obligation.

LEGAL BASIS

Under the Civil Code of the Philippines, specifically Articles [cite relevant articles], you are legally bound to fulfill your contractual obligation.

DEMAND

WHEREFORE, formal demand is hereby made upon you to pay the aforementioned amount within FIFTEEN (15) DAYS from receipt of this letter.

FAILURE to comply with this demand shall constrain us to take appropriate legal action against you, including but not limited to the filing of a civil case for collection of sum of money, without further notice. In such event, you shall be additionally liable for attorney's fees, litigation expenses, and costs of suit.

We trust that you will give this matter your immediate attention.

Very truly yours,

________________________
[YOUR NAME]
[Your designation if applicable]

CC: File`
  },
  contract: {
    title: 'Contract/Agreement',
    content: `CONTRACT OF [TYPE]

KNOW ALL MEN BY THESE PRESENTS:

This CONTRACT, made and executed this ____ day of ________ 20__, at [City], Philippines, by and between:

[PARTY A NAME], of legal age, [civil status], Filipino citizen, and a resident of [Complete Address], hereinafter referred to as the "[FIRST PARTY/SELLER/LESSOR]";

-and-

[PARTY B NAME], of legal age, [civil status], Filipino citizen, and a resident of [Complete Address], hereinafter referred to as the "[SECOND PARTY/BUYER/LESSEE]";

WITNESSETH: That—

WHEREAS, [State the background/recitals];

WHEREAS, [Additional recitals if necessary];

NOW, THEREFORE, for and in consideration of the foregoing premises and the mutual covenants herein contained, the parties hereby agree as follows:

1. SUBJECT MATTER
   [Describe the subject of the contract]

2. CONSIDERATION
   [State the price, payment terms, or other consideration]

3. TERMS AND CONDITIONS
   [List all agreed terms]

4. WARRANTIES AND REPRESENTATIONS
   [State warranties by each party]

5. DEFAULT
   [State consequences of breach]

6. DISPUTE RESOLUTION
   [State how disputes will be resolved]

7. GENERAL PROVISIONS
   a) This contract constitutes the entire agreement between the parties.
   b) Any amendment must be in writing signed by both parties.
   c) This contract shall be governed by Philippine law.

IN WITNESS WHEREOF, the parties have hereunto affixed their signatures on the date and place above-written.

_________________________          _________________________
[PARTY A NAME]                     [PARTY B NAME]
First Party                        Second Party

SIGNED IN THE PRESENCE OF:

_________________________          _________________________

ACKNOWLEDGMENT

[Notarization if required]`
  },
  motion: {
    title: 'Motion',
    content: `REPUBLIC OF THE PHILIPPINES
[COURT NAME]
[JUDICIAL REGION]
[Branch Number]
[City/Municipality]

[CASE TITLE]                      [Case Type] No. _______

x----------------------------------x

MOTION [TO/FOR ________]

COMES NOW [movant], through undersigned counsel, unto this Honorable Court, most respectfully moves for [state the relief sought] and in support thereof, respectfully states that:

STATEMENT OF FACTS

1. [State relevant procedural history]

2. [State facts supporting the motion]

ARGUMENTS/GROUNDS

3. [State legal basis for the motion]

4. [Cite relevant laws, rules, and jurisprudence]

PRAYER

WHEREFORE, premises considered, [movant] respectfully prays that this Honorable Court issue an Order:

1. [State specific relief sought]

2. [Other reliefs prayed for]

Other reliefs just and equitable under the premises are likewise prayed for.

[City], Philippines, [Date].

                              [COUNSEL NAME]
                              Counsel for [Movant]
                              [Office Address]
                              [Contact Details]
                              [IBP/PTR/Roll No./MCLE]

NOTICE OF HEARING

TO:     The Branch Clerk of Court
        [Court Address]

        [Opposing Counsel]
        [Address]

GREETINGS:

        Please take notice that the foregoing Motion will be submitted for consideration and approval of this Honorable Court on [Date] at [Time] or as soon thereafter as counsel may be heard.

                              [COUNSEL NAME]

Copy furnished:
[List of parties to be furnished copies]

EXPLANATION
[Under Section 11, Rule 13 of the Rules of Court]`
  },
  petition: {
    title: 'Petition',
    content: `REPUBLIC OF THE PHILIPPINES
[COURT NAME]
[JUDICIAL REGION]
[City/Municipality]

IN RE: [SUBJECT OF PETITION]

[PETITIONER NAME],                [Case Type] No. _______
          Petitioner.             For: [Nature of Petition]

x----------------------------------x

VERIFIED PETITION

[PETITIONER NAME], petitioner, through undersigned counsel, unto this Honorable Court, most respectfully states that:

I. THE PARTIES

1. Petitioner is of legal age, Filipino citizen, [civil status], and a resident of [Address], where summons and other legal processes may be served;

II. STATEMENT OF FACTS

2. [State the factual background]

III. GROUNDS FOR THE PETITION

3. [State the legal basis]

IV. PRAYER

WHEREFORE, premises considered, petitioner respectfully prays that after due notice, publication, and hearing, this Honorable Court render judgment:

1. [State relief sought]

Other reliefs just and equitable are likewise prayed for.

[City], Philippines, [Date].

                              [COUNSEL NAME]
                              Counsel for Petitioner
                              [Address]
                              [Contact Details]

VERIFICATION AND CERTIFICATION

I, [PETITIONER NAME], under oath, state that I am the petitioner in the above-captioned case; I have read and understood the contents of the foregoing Petition; the allegations therein are true and correct based on my personal knowledge and/or authentic records; and I have not commenced any similar action before any court, tribunal, or quasi-judicial agency, and to my knowledge, no such action is pending. Should I learn of any similar action, I undertake to inform this Honorable Court within five (5) days therefrom.

                              ________________________
                              [PETITIONER NAME]

SUBSCRIBED AND SWORN to before me this ____ day of ________ 20__ at [City], Philippines.

                              ________________________
                              Notary Public`
  }
};

// ============================================
// INITIALIZATION
// ============================================

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  initSmoothScroll();
  setupModalCloseOnOutsideClick();
  
  // Check for form toggle based on URL
  const params = getURLParams();
  if (params.signup) {
    const signupTab = document.getElementById('signup-tab');
    if (signupTab) signupTab.click();
  }
  
  // Update user display if on protected page
  const user = getCurrentUser();
  if (user) {
    // Update username displays
    document.querySelectorAll('.user-name, #userName').forEach(el => {
      el.textContent = user.name || 'User';
    });
    
    // Update email displays
    document.querySelectorAll('.user-email, #userEmail').forEach(el => {
      el.textContent = user.email || '';
    });
    
    // Update plan displays
    document.querySelectorAll('.user-plan, #userPlan').forEach(el => {
      el.textContent = user.plan || 'Free';
    });
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
  
  // Also close sidebar on mobile when clicking outside
  const sidebar = document.querySelector('.sidebar');
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  if (sidebar && sidebar.classList.contains('active')) {
    if (!sidebar.contains(e.target) && (!sidebarToggle || !sidebarToggle.contains(e.target))) {
      closeSidebar();
    }
  }
});

// Handle Escape key for modals and menus
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    // Close any open modals
    document.querySelectorAll('.modal, .modal-overlay').forEach(modal => {
      if (modal.style.display === 'flex' || modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
    
    // Close mobile menu
    closeMobileMenu();
    closeSidebar();
  }
});
