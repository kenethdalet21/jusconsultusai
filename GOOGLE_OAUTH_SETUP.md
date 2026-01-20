# Google OAuth Authentication - Setup & Implementation Guide

## Overview
This document details the complete Google OAuth authentication implementation for JusConsultus AI, including setup instructions, functionality, and troubleshooting.

---

## ✅ What's Been Implemented

### 1. **Google Sign-In Button**
- ✅ Professional Google-styled button with official logo
- ✅ Appears on both Sign In and Sign Up forms
- ✅ Proper hover states and animations
- ✅ Responsive design for mobile and desktop

### 2. **Firebase Google Authentication**
- ✅ Google OAuth provider configuration
- ✅ Pop-up based authentication flow
- ✅ Automatic user profile creation in Firestore
- ✅ Session persistence in localStorage
- ✅ Error handling for common scenarios

### 3. **User Data Management**
- ✅ Automatic Firestore document creation for new Google users
- ✅ User profile includes: email, name, role, plan, subscription
- ✅ Last login timestamp tracking
- ✅ Query usage tracking (10 queries/day for free users)
- ✅ Session data stored in localStorage

### 4. **Error Handling**
- ✅ Pop-up blocked detection
- ✅ User cancellation handling
- ✅ Network error handling
- ✅ Duplicate sign-in request prevention
- ✅ User-friendly error messages

---

## 🚀 How to Enable Google OAuth

### Step 1: Firebase Project Setup

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com
   - Select your project or create a new one

2. **Enable Google Authentication**
   ```
   Navigate to: Authentication → Sign-in method → Google
   Click "Enable"
   ```

3. **Configure OAuth Consent Screen**
   - Project name: JusConsultus AI
   - User support email: your-email@domain.com
   - Developer contact: your-email@domain.com
   - Save configuration

4. **Add Authorized Domains**
   ```
   Authentication → Settings → Authorized domains
   Add: localhost (for development)
   Add: your-production-domain.com (for production)
   ```

### Step 2: Update Firebase Configuration

In `js/firebase-config.js`, update the configuration object:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

**How to get these values:**
1. Go to Firebase Console
2. Click the gear icon (⚙️) → Project settings
3. Scroll to "Your apps" section
4. Copy the configuration object

### Step 3: Test Locally

1. **Run a local server** (required for Firebase Auth):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server -p 8000
   
   # Using VS Code Live Server extension
   Right-click on index.html → Open with Live Server
   ```

2. **Open in browser**:
   ```
   http://localhost:8000/login.html
   ```

3. **Test Google Sign-In**:
   - Click "Sign in with Google" button
   - Select your Google account
   - Grant permissions
   - Should redirect to dashboard.html

### Step 4: Production Deployment

1. **Update Authorized Domains** in Firebase:
   ```
   Add your production domain: yourdomain.com
   Add www variant: www.yourdomain.com
   ```

2. **Enable HTTPS** (required for production):
   - Firebase Auth requires HTTPS in production
   - Use hosting services that provide SSL (Netlify, Vercel, Firebase Hosting)

3. **Update OAuth Consent Screen**:
   - Add production domain
   - Add privacy policy URL
   - Add terms of service URL

---

## 🔧 Implementation Details

### Authentication Flow

```
1. User clicks "Sign in with Google"
   ↓
2. oauthLogin('google') function called
   ↓
3. Check if Firebase is initialized
   ↓
4. Call firebaseGoogleSignIn()
   ↓
5. Open Google OAuth popup
   ↓
6. User selects account and grants permissions
   ↓
7. Firebase returns user credentials
   ↓
8. Check if user exists in Firestore
   ↓
9a. If NEW user:
   - Create Firestore document with profile
   - Set default role: 'free'
   - Set default plan: 'Free'
   - Set query limit: 10/day
   ↓
9b. If EXISTING user:
   - Update lastLogin timestamp
   - Retrieve existing user data
   ↓
10. Create localStorage session
   ↓
11. Redirect to dashboard.html
```

### User Data Structure

**Firestore Document** (`users/{uid}`):
```javascript
{
  uid: "firebase-user-id",
  email: "user@gmail.com",
  name: "John Doe",
  role: "free",              // free | pro | admin
  plan: "Free",              // Free | Professional | Enterprise
  subscription: {
    status: "active",
    plan: "free",
    startDate: Timestamp,
    endDate: null
  },
  queryUsage: {
    daily: 0,
    lastReset: "2026-01-20",
    limit: 10
  },
  createdAt: Timestamp,
  lastLogin: Timestamp
}
```

**localStorage Session** (`jusconsultus_user`):
```javascript
{
  uid: "firebase-user-id",
  email: "user@gmail.com",
  name: "John Doe",
  role: "free",
  plan: "Free",
  loginTime: "2026-01-20T10:30:00.000Z",
  authProvider: "google"
}
```

---

## 📝 Code Reference

### Main Files

1. **js/firebase-config.js** (Lines 99-173)
   - `firebaseGoogleSignIn()` - Main Google OAuth function
   - Handles popup, user creation, session management

2. **login.html** (Lines 416-455)
   - `oauthLogin(provider)` - UI handler for OAuth buttons
   - Error handling and user feedback

3. **login.html** (Lines 245-254, 315-324)
   - Google Sign-In buttons in Sign In and Sign Up forms

### Key Functions

#### `firebaseGoogleSignIn()`
```javascript
// Creates Google OAuth popup
// Handles user authentication
// Creates/updates Firestore document
// Stores session in localStorage
// Returns: { success: true, user: {...}, userData: {...} }
```

#### `oauthLogin(provider)`
```javascript
// UI handler for OAuth buttons
// Checks Firebase initialization
// Calls appropriate OAuth function
// Shows loading/success/error messages
// Redirects on success
```

---

## 🧪 Testing Guide

### Test Scenarios

#### 1. **New User Sign-In**
- Expected: Creates Firestore document
- Expected: Redirects to dashboard
- Expected: User data appears in sidebar
- Expected: Default "Free" plan assigned

#### 2. **Existing User Sign-In**
- Expected: Updates lastLogin timestamp
- Expected: Redirects to dashboard
- Expected: Preserves existing role and plan
- Expected: Session restored correctly

#### 3. **Cancelled Sign-In**
- Expected: Shows "Sign-in cancelled" message
- Expected: Stays on login page
- Expected: No Firestore changes
- Expected: No localStorage changes

#### 4. **Pop-Up Blocked**
- Expected: Shows "Pop-up blocked" message
- Expected: Instructs user to allow pop-ups
- Expected: No error in console

#### 5. **Network Error**
- Expected: Shows network error message
- Expected: Suggests checking connection
- Expected: User can retry

### Manual Testing Steps

1. **Clear all data**:
   ```javascript
   // In browser console
   localStorage.clear();
   // Go to Application → IndexedDB → Delete Firebase database
   ```

2. **Test new user flow**:
   - Click "Sign in with Google"
   - Select account
   - Verify redirection
   - Check localStorage (F12 → Application → Local Storage)
   - Check Firestore (Firebase Console → Firestore)

3. **Test existing user flow**:
   - Sign out
   - Sign in again with same Google account
   - Verify existing data preserved
   - Check lastLogin updated

4. **Test error scenarios**:
   - Block pop-ups in browser settings
   - Try signing in (should show error)
   - Allow pop-ups and retry

---

## 🐛 Troubleshooting

### Issue 1: "Pop-up blocked"
**Cause**: Browser blocking pop-up windows

**Solution**:
1. Click the blocked icon in address bar
2. Click "Always allow pop-ups from [site]"
3. Retry sign-in

### Issue 2: "Firebase not initialized"
**Cause**: Firebase SDK not loaded or configured

**Solution**:
1. Check Firebase CDN scripts in HTML `<head>`
2. Verify `firebaseConfig` has correct values
3. Check browser console for initialization errors
4. Ensure `initializeFirebase()` is called

### Issue 3: "Unauthorized domain"
**Cause**: Current domain not authorized in Firebase

**Solution**:
1. Go to Firebase Console → Authentication → Settings
2. Add domain to "Authorized domains" list
3. For localhost: add `localhost`
4. For production: add your domain without protocol

### Issue 4: "Sign-in successful but not redirecting"
**Cause**: localStorage not being set or read

**Solution**:
1. Check browser console for errors
2. Verify `localStorage.setItem()` is being called
3. Check if localStorage is disabled (private browsing)
4. Try clearing localStorage and signing in again

### Issue 5: "Pop-up closed immediately"
**Cause**: Multiple sign-in requests or race condition

**Solution**:
1. Wait for previous request to complete
2. Refresh the page
3. Try signing in again
4. Check for duplicate event listeners

---

## 🔒 Security Best Practices

### 1. **API Key Security**
```javascript
// ❌ DON'T commit actual keys to public repos
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY"  // Exposed in client anyway
};

// ✅ DO use environment variables for backend
// Note: Firebase API keys are designed to be public
// Real security comes from Firestore security rules
```

### 2. **Firestore Security Rules**
```javascript
// Recommended rules for users collection
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      // Users can read/write their own document
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /users/{userId}/library/{docId} {
      // Users can manage their own library
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 3. **OAuth Consent Screen**
- Use clear, descriptive project name
- Add privacy policy and terms of service URLs
- Request only necessary scopes (profile, email)
- Keep branding consistent

### 4. **Production Checklist**
- [ ] Enable HTTPS
- [ ] Add production domain to authorized domains
- [ ] Set up proper Firestore security rules
- [ ] Configure OAuth consent screen
- [ ] Test with multiple Google accounts
- [ ] Monitor authentication logs
- [ ] Set up error reporting (Sentry, etc.)

---

## 📊 Monitoring & Analytics

### Firebase Console

**Authentication Stats**:
- Navigate to: Authentication → Users
- View: Total users, new sign-ups, active users
- Filter: By provider (Google, Email, etc.)

**User Activity**:
```
Firestore → users collection
Check lastLogin timestamps
Monitor query usage
Track subscription changes
```

### Browser Console Logs

When `firebaseGoogleSignIn()` runs:
```
✅ Success:
"Google sign-in successful: {userData}"

❌ Error:
"Google sign in error: [error details]"
```

### localStorage Inspection

```javascript
// Check current session
JSON.parse(localStorage.getItem('jusconsultus_user'));

// Output:
{
  uid: "...",
  email: "user@gmail.com",
  name: "...",
  role: "free",
  plan: "Free",
  authProvider: "google"
}
```

---

## 🔄 Demo Mode Fallback

If Firebase is not configured, the system falls back to demo mode:

```javascript
function handleDemoOAuthLogin(provider) {
  const demoUser = {
    email: provider + '@demo.com',
    name: 'Demo Google User',
    role: 'free',
    plan: 'Free',
    loginTime: new Date().toISOString()
  };
  
  localStorage.setItem('jusconsultus_user', JSON.stringify(demoUser));
  window.location.href = 'dashboard.html';
}
```

**When Demo Mode Activates**:
- Firebase SDK not loaded
- Firebase not initialized
- `firebaseReady = false`

---

## 📱 Mobile Considerations

### iOS Safari
- Pop-ups may be blocked by default
- User must enable pop-ups in Settings
- Redirect method works better than pop-up

### Android Chrome
- Pop-ups usually work well
- May show permission prompt first time
- Cookie settings must allow third-party cookies

### Progressive Web App (PWA)
- OAuth works in installed PWAs
- Same security context as browser
- Consider using redirect flow instead of popup

---

## 🚀 Future Enhancements

### Potential Improvements:

1. **Microsoft OAuth**
   - Add Azure AD provider
   - Enable enterprise SSO
   - Office 365 integration

2. **Social Providers**
   - Facebook Login
   - Apple Sign-In
   - GitHub OAuth (for developers)

3. **Enhanced Security**
   - Multi-factor authentication (MFA)
   - Email verification requirement
   - Session timeout
   - Device tracking

4. **User Experience**
   - Remember last used provider
   - One-click sign-in for returning users
   - Profile picture from Google
   - Auto-fill user preferences

---

## 📞 Support & Resources

### Official Documentation
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Firebase Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

### Internal Documentation
- `FIREBASE_STRIPE_SETUP.md` - Complete Firebase setup
- `IMPLEMENTATION_SUMMARY.md` - Overall implementation
- `UI_UPDATES_SUMMARY.md` - Recent UI changes

### Getting Help
- Check browser console for errors
- Review Firebase Console logs
- Test with different Google accounts
- Clear browser cache and localStorage
- Try incognito/private browsing mode

---

**Status:** ✅ Fully Functional  
**Last Updated:** January 20, 2026  
**Version:** 2.1.0  
**Tested:** Chrome, Firefox, Safari, Edge  
**Mobile:** iOS Safari, Android Chrome  

---

Made with ❤️ for JusConsultus AI
