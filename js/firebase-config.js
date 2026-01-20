// Firebase Configuration and Initialization
// JusConsultus AI - Unified Database for User and Admin

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeCo91gZ0flP_ufn6enO7Hq5B8f0-lclI",
  authDomain: "jusconsultusai.firebaseapp.com",
  projectId: "jusconsultusai",
  storageBucket: "jusconsultusai.firebasestorage.app",
  messagingSenderId: "319929102882",
  appId: "1:319929102882:web:c4c775026876602018507b",
  measurementId: "G-82TFMKPR77"
};

// Initialize Firebase (will be loaded from CDN in HTML)
let app, auth, db;

function initializeFirebase() {
  if (typeof firebase === 'undefined') {
    console.error('Firebase SDK not loaded. Please include Firebase CDN scripts in HTML.');
    return false;
  }
  
  try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    
    console.log('Firebase initialized successfully');
    return true;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return false;
  }
}

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

// Sign up with email/password
async function firebaseSignUp(email, password, name) {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Update display name
    await user.updateProfile({
      displayName: name
    });
    
    // Create user document in Firestore
    const userData = {
      uid: user.uid,
      email: email,
      name: name,
      role: 'free',
      plan: 'Free',
      subscription: {
        status: 'active',
        plan: 'free',
        startDate: firebase.firestore.FieldValue.serverTimestamp(),
        endDate: null
      },
      queryUsage: {
        daily: 0,
        lastReset: new Date().toISOString().split('T')[0],
        limit: 10
      },
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastLogin: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    await db.collection('users').doc(user.uid).set(userData);
    
    // Create session data for localStorage
    const sessionData = {
      uid: user.uid,
      email: email,
      name: name,
      role: 'free',
      plan: 'Free',
      loginTime: new Date().toISOString(),
      authProvider: 'email'
    };
    
    // Store in localStorage for session persistence
    localStorage.setItem('jusconsultus_user', JSON.stringify(sessionData));
    
    return { success: true, user: user, userData: sessionData };
  } catch (error) {
    console.error('Sign up error:', error);
    return { success: false, error: error.message };
  }
}

// Sign in with email/password
async function firebaseSignIn(email, password) {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Get user data from Firestore
    const userDoc = await db.collection('users').doc(user.uid).get();
    const userData = userDoc.data();
    
    // Update last login
    await db.collection('users').doc(user.uid).update({
      lastLogin: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    // Create session data for localStorage
    const sessionData = {
      uid: user.uid,
      email: user.email,
      name: user.displayName || userData.name || 'User',
      role: userData.role || 'free',
      plan: userData.plan || 'Free',
      loginTime: new Date().toISOString(),
      authProvider: 'email'
    };
    
    // Store in localStorage for session persistence
    localStorage.setItem('jusconsultus_user', JSON.stringify(sessionData));
    
    return { success: true, user: user, userData: sessionData };
  } catch (error) {
    console.error('Sign in error:', error);
    return { success: false, error: error.message };
  }
}

// Sign in with Google
async function firebaseGoogleSignIn() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    // Add scopes for better user info
    provider.addScope('profile');
    provider.addScope('email');
    
    const result = await auth.signInWithPopup(provider);
    const user = result.user;
    
    // Check if user document exists
    const userDoc = await db.collection('users').doc(user.uid).get();
    
    let userData;
    if (!userDoc.exists) {
      // Create new user document
      userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || 'User',
        role: 'free',
        plan: 'Free',
        subscription: {
          status: 'active',
          plan: 'free',
          startDate: firebase.firestore.FieldValue.serverTimestamp(),
          endDate: null
        },
        queryUsage: {
          daily: 0,
          lastReset: new Date().toISOString().split('T')[0],
          limit: 10
        },
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      };
      
      await db.collection('users').doc(user.uid).set(userData);
    } else {
      // Update last login
      await db.collection('users').doc(user.uid).update({
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      // Get existing user data
      userData = userDoc.data();
    }
    
    // Create session data for localStorage
    const sessionData = {
      uid: user.uid,
      email: user.email,
      name: user.displayName || userData.name || 'User',
      role: userData.role || 'free',
      plan: userData.plan || 'Free',
      loginTime: new Date().toISOString(),
      authProvider: 'google'
    };
    
    // Store in localStorage for session persistence
    localStorage.setItem('jusconsultus_user', JSON.stringify(sessionData));
    
    return { success: true, user: user, userData: sessionData };
  } catch (error) {
    console.error('Google sign in error:', error);
    // Handle specific error cases
    let errorMessage = error.message;
    if (error.code === 'auth/popup-blocked') {
      errorMessage = 'Pop-up blocked. Please allow pop-ups for this site.';
    } else if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = 'Sign-in cancelled. Please try again.';
    } else if (error.code === 'auth/cancelled-popup-request') {
      errorMessage = 'Only one sign-in request at a time.';
    }
    return { success: false, error: errorMessage };
  }
}

// Sign out
async function firebaseSignOut() {
  try {
    await auth.signOut();
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    return { success: false, error: error.message };
  }
}

// Get current user data from Firestore
async function getCurrentUserData() {
  const user = auth.currentUser;
  if (!user) return null;
  
  try {
    const userDoc = await db.collection('users').doc(user.uid).get();
    if (userDoc.exists) {
      return { uid: user.uid, ...userDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
}

// ============================================
// DATABASE FUNCTIONS
// ============================================

// Save document to library
async function saveDocumentToLibrary(document) {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');
  
  try {
    const docRef = await db.collection('users').doc(user.uid)
      .collection('library').add({
        ...document,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving document:', error);
    return { success: false, error: error.message };
  }
}

// Get user's library documents
async function getLibraryDocuments() {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');
  
  try {
    const snapshot = await db.collection('users').doc(user.uid)
      .collection('library')
      .orderBy('createdAt', 'desc')
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting documents:', error);
    return [];
  }
}

// Save bookmark
async function saveBookmark(bookmark) {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');
  
  try {
    const bookmarkRef = await db.collection('users').doc(user.uid)
      .collection('bookmarks').add({
        ...bookmark,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    
    return { success: true, id: bookmarkRef.id };
  } catch (error) {
    console.error('Error saving bookmark:', error);
    return { success: false, error: error.message };
  }
}

// Get user's bookmarks
async function getBookmarks() {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');
  
  try {
    const snapshot = await db.collection('users').doc(user.uid)
      .collection('bookmarks')
      .orderBy('createdAt', 'desc')
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    return [];
  }
}

// Update subscription
async function updateSubscription(subscriptionData) {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');
  
  try {
    await db.collection('users').doc(user.uid).update({
      'subscription': subscriptionData,
      'role': subscriptionData.plan === 'pro' ? 'pro' : 'free',
      'plan': subscriptionData.plan === 'pro' ? 'Professional' : 'Free',
      'queryUsage.limit': subscriptionData.plan === 'pro' ? 999999 : 10
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating subscription:', error);
    return { success: false, error: error.message };
  }
}

// Increment query usage
async function incrementQueryUsage() {
  const user = auth.currentUser;
  if (!user) return;
  
  try {
    const userRef = db.collection('users').doc(user.uid);
    const userDoc = await userRef.get();
    const userData = userDoc.data();
    
    const today = new Date().toISOString().split('T')[0];
    
    // Reset if new day
    if (userData.queryUsage?.lastReset !== today) {
      await userRef.update({
        'queryUsage.daily': 1,
        'queryUsage.lastReset': today
      });
    } else {
      await userRef.update({
        'queryUsage.daily': firebase.firestore.FieldValue.increment(1)
      });
    }
  } catch (error) {
    console.error('Error incrementing query usage:', error);
  }
}

// Check if user can make query
async function canMakeQuery() {
  const user = auth.currentUser;
  if (!user) return false;
  
  try {
    const userDoc = await db.collection('users').doc(user.uid).get();
    const userData = userDoc.data();
    
    // Pro users have unlimited queries
    if (userData.role === 'pro' || userData.role === 'admin') {
      return true;
    }
    
    const today = new Date().toISOString().split('T')[0];
    
    // Reset if new day
    if (userData.queryUsage?.lastReset !== today) {
      return true;
    }
    
    return userData.queryUsage?.daily < userData.queryUsage?.limit;
  } catch (error) {
    console.error('Error checking query limit:', error);
    return false;
  }
}

// ============================================
// REALTIME LISTENERS
// ============================================

// Listen to user data changes
function listenToUserData(callback) {
  const user = auth.currentUser;
  if (!user) return null;
  
  return db.collection('users').doc(user.uid).onSnapshot((doc) => {
    if (doc.exists) {
      callback({ uid: user.uid, ...doc.data() });
    }
  });
}

// Listen to auth state changes
function onAuthStateChanged(callback) {
  return auth.onAuthStateChanged(async (user) => {
    if (user) {
      const userData = await getCurrentUserData();
      callback(userData);
    } else {
      callback(null);
    }
  });
}

// ============================================
// ADMIN FUNCTIONS (for Admin Panel)
// ============================================

// Get all users (Admin only)
async function getAllUsers() {
  try {
    const snapshot = await db.collection('users')
      .orderBy('createdAt', 'desc')
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
}

// Update user role (Admin only)
async function updateUserRole(userId, role) {
  try {
    await db.collection('users').doc(userId).update({
      role: role,
      plan: role === 'pro' ? 'Professional' : role === 'admin' ? 'Enterprise' : 'Free'
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating user role:', error);
    return { success: false, error: error.message };
  }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeFirebase,
    firebaseSignUp,
    firebaseSignIn,
    firebaseGoogleSignIn,
    firebaseSignOut,
    getCurrentUserData,
    saveDocumentToLibrary,
    getLibraryDocuments,
    saveBookmark,
    getBookmarks,
    updateSubscription,
    incrementQueryUsage,
    canMakeQuery,
    listenToUserData,
    onAuthStateChanged,
    getAllUsers,
    updateUserRole
  };
}
