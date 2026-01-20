# Firebase & Stripe Setup Guide for JusConsultus AI

This document provides comprehensive instructions for setting up Firebase Authentication, Firestore Database, and Stripe Payment Integration for the JusConsultusAI Web application.

## 🔥 Firebase Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `jusconsultus-ai`
4. Enable Google Analytics (recommended)
5. Click "Create project"

### Step 2: Register Your Web App

1. In your Firebase project, click the **web icon (</>)** to add a web app
2. Register app name: `JusConsultus AI Web`
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. Copy the Firebase configuration object - you'll need this!

### Step 3: Enable Authentication Methods

1. In Firebase Console, go to **Build > Authentication**
2. Click "Get started"
3. Go to **Sign-in method** tab
4. Enable the following providers:

#### Email/Password Authentication:
- Click on "Email/Password"
- Toggle "Enable"
- Click "Save"

#### Google Sign-In:
- Click on "Google"
- Toggle "Enable"
- Enter project support email
- Click "Save"

#### Microsoft Sign-In (Optional):
- Click on "Microsoft"
- Follow the setup instructions
- You'll need Azure AD credentials

### Step 4: Create Firestore Database

1. In Firebase Console, go to **Build > Firestore Database**
2. Click "Create database"
3. Choose "Start in production mode" (we'll adjust rules later)
4. Select your Cloud Firestore location (choose closest to your users)
5. Click "Enable"

### Step 5: Set Up Firestore Security Rules

1. Go to **Firestore Database > Rules** tab
2. Replace the default rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User documents - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // User library documents
      match /library/{docId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      // User bookmarks
      match /bookmarks/{bookmarkId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
    
    // Admin access (replace with actual admin UIDs)
    match /{document=**} {
      allow read, write: if request.auth != null && 
        request.auth.uid in ['ADMIN_UID_1', 'ADMIN_UID_2'];
    }
  }
}
```

3. Click "Publish"

### Step 6: Configure Firebase in Your App

1. Open `d:\JusconsultusAI Web\js\firebase-config.js`
2. Replace the configuration values with your Firebase project credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",  // From Firebase Console > Project Settings
  authDomain: "jusconsultus-ai.firebaseapp.com",
  projectId: "jusconsultus-ai",
  storageBucket: "jusconsultus-ai.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"  // Optional
};
```

**Where to find these values:**
- Go to Firebase Console
- Click the gear icon (⚙️) next to "Project Overview"
- Select "Project settings"
- Scroll down to "Your apps" section
- Copy each value from the Firebase SDK snippet

## 💳 Stripe Setup

### Step 1: Create a Stripe Account

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Sign up for a new account
3. Complete account verification
4. Switch to "Test mode" for development (toggle in top-right corner)

### Step 2: Get API Keys

1. In Stripe Dashboard, go to **Developers > API keys**
2. Copy your keys:
   - **Publishable key** (starts with `pk_test_...`) - This goes in the frontend
   - **Secret key** (starts with `sk_test_...`) - This goes in your backend (DO NOT expose in frontend)

### Step 3: Create Products and Prices

1. Go to **Products** in Stripe Dashboard
2. Click "+ Add product"

#### Create Pro Monthly Product:
- Name: `JusConsultus Pro - Monthly`
- Description: `Full access to JusConsultus AI features`
- Pricing model: `Recurring`
- Price: `1,499.00 PHP`
- Billing period: `Monthly`
- Click "Save product"
- **Copy the Price ID** (looks like `price_xxxxxxxxxxxxx`)

#### Create Pro Yearly Product:
- Name: `JusConsultus Pro - Yearly`
- Description: `Full access to JusConsultus AI features with 17% savings`
- Pricing model: `Recurring`
- Price: `14,999.00 PHP`
- Billing period: `Yearly`
- Click "Save product"
- **Copy the Price ID**

### Step 4: Configure Stripe in Your App

1. Open `d:\JusconsultusAI Web\js\stripe-integration.js`
2. Update the configuration:

```javascript
// Stripe Configuration
const STRIPE_PUBLIC_KEY = 'pk_test_YOUR_PUBLISHABLE_KEY';  // Your Stripe publishable key

// Price IDs for subscription plans
const STRIPE_PRICES = {
  pro_monthly: 'price_XXXXXXXXXXXXX',  // Your monthly price ID from Step 3
  pro_yearly: 'price_XXXXXXXXXXXXX'    // Your yearly price ID from Step 3
};
```

3. **Important:** Set `DEMO_MODE` to control payment behavior:

```javascript
const DEMO_MODE = true;  // Set to true for testing without real payments
                         // Set to false in production
```

### Step 5: Create Backend for Stripe (Required for Production)

**Note:** Stripe requires a backend server to handle secure payment processing. The current implementation uses DEMO_MODE for testing.

For production, you need to create a backend API with these endpoints:

#### Required Endpoints:

1. **POST /api/create-checkout-session**
   - Creates a Stripe Checkout session
   - Returns session ID for redirect

2. **POST /api/create-payment-intent**
   - Creates a payment intent for custom checkout
   - Returns client secret

3. **POST /api/verify-session**
   - Verifies completed payment
   - Updates subscription in Firebase

4. **POST /api/cancel-subscription**
   - Cancels active subscription
   - Marks for cancellation at period end

5. **POST /api/reactivate-subscription**
   - Reactivates a canceled subscription

#### Example Backend Structure (Node.js/Express):

```bash
# Create backend directory
mkdir jusconsultus-backend
cd jusconsultus-backend
npm init -y
npm install express stripe firebase-admin cors dotenv
```

Create `.env` file:
```
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json
```

#### Firebase Admin SDK Setup:

1. In Firebase Console, go to **Project Settings**
2. Go to **Service accounts** tab
3. Click "Generate new private key"
4. Save the JSON file as `firebase-service-account.json` in your backend directory
5. **NEVER commit this file to git!** Add it to `.gitignore`

## 🗂️ Database Structure

### Firestore Collections

```
users (collection)
  ├─ {userId} (document)
  │   ├─ uid: string
  │   ├─ email: string
  │   ├─ name: string
  │   ├─ role: string (free | pro | admin)
  │   ├─ plan: string (Free | Professional | Enterprise)
  │   ├─ subscription: object
  │   │   ├─ status: string (active | canceling | canceled)
  │   │   ├─ plan: string (free | pro)
  │   │   ├─ stripeSubscriptionId: string
  │   │   ├─ stripeCustomerId: string
  │   │   ├─ startDate: timestamp
  │   │   ├─ currentPeriodEnd: timestamp
  │   │   └─ cancelAtPeriodEnd: boolean
  │   ├─ queryUsage: object
  │   │   ├─ daily: number
  │   │   ├─ lastReset: string (date)
  │   │   └─ limit: number
  │   ├─ createdAt: timestamp
  │   └─ lastLogin: timestamp
  │
  │   ├─ library (subcollection)
  │   │   └─ {docId} (document)
  │   │       ├─ name: string
  │   │       ├─ type: string
  │   │       ├─ content: string
  │   │       ├─ category: string
  │   │       ├─ createdAt: timestamp
  │   │       └─ updatedAt: timestamp
  │   │
  │   └─ bookmarks (subcollection)
  │       └─ {bookmarkId} (document)
  │           ├─ title: string
  │           ├─ url: string
  │           ├─ category: string
  │           ├─ notes: string
  │           └─ createdAt: timestamp
```

## 🚀 Deployment Steps

### 1. Development Testing

```bash
# Open in browser
# Test login with demo credentials:
# Email: test@jusconsultus.com
# Password: test123
```

### 2. Firebase Configuration (One-time)

- Update `js/firebase-config.js` with your Firebase credentials
- Deploy Firestore security rules
- Test authentication flows

### 3. Stripe Configuration (One-time)

- Update `js/stripe-integration.js` with your Stripe keys
- Create products and prices in Stripe Dashboard
- Set up backend API endpoints (for production)

### 4. Testing Checklist

- [ ] Sign up with email/password
- [ ] Sign in with email/password
- [ ] Sign in with Google
- [ ] Test document generator templates (all 12 templates)
- [ ] Upload document to library
- [ ] Create bookmark
- [ ] View subscription page
- [ ] Test demo payment flow
- [ ] Check Firebase Console for user data
- [ ] Verify real-time data sync

### 5. Production Deployment

1. Set `DEMO_MODE = false` in `stripe-integration.js`
2. Deploy backend API server
3. Update CORS settings to allow your domain
4. Enable production mode in Stripe
5. Update Firebase security rules for production
6. Test complete payment flow with test cards
7. Deploy to your hosting provider

## 🔐 Security Best Practices

### Firebase Security

1. **Never expose Firebase Admin SDK credentials in frontend**
2. **Keep Firestore security rules restrictive**
3. **Enable App Check** for additional security:
   - Go to Firebase Console > Build > App Check
   - Register your web app
   - Add reCAPTCHA v3 or v2 checkbox

4. **Enable email verification** (optional but recommended):
   ```javascript
   // After signup
   await user.sendEmailVerification();
   ```

### Stripe Security

1. **NEVER expose Secret Key (`sk_`) in frontend code**
2. **Always process payments on backend**
3. **Validate webhook signatures** for secure event handling
4. **Use Stripe's test cards** during development
5. **Enable 3D Secure** for added security

### General Security

1. **Use HTTPS** in production (required for Payment Request API)
2. **Implement rate limiting** on authentication endpoints
3. **Enable MFA** (Multi-Factor Authentication) for admin accounts
4. **Regular security audits** of Firebase and Stripe dashboards
5. **Monitor for suspicious activity**

## 🧪 Testing

### Test Credentials

**Demo Users (localStorage-based):**
- Free User: `test@jusconsultus.com` / `test123`
- Pro User: `pro@jusconsultus.com` / `pro123`
- Admin: `admin` / `admin`

**Stripe Test Cards:**
```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure Required: 4000 0027 6000 3184
Insufficient Funds: 4000 0000 0000 9995
```

### Testing Firebase

1. Create a test user in Firebase Authentication
2. Check Firestore for user document creation
3. Test library and bookmark subcollections
4. Verify security rules are working

### Testing Stripe

1. Use test mode (toggle in Stripe Dashboard)
2. Use test card numbers provided above
3. Check Stripe Dashboard > Payments for test transactions
4. Verify webhooks are received (if backend is set up)

## 📱 Unified Database for Admin Panel

The Firebase setup creates a unified database that both the User app and Admin panel can access:

### Admin Panel Access

1. **Grant Admin Role:**
   ```javascript
   // In Firestore Console, manually update a user document:
   users/{userId}
     role: "admin"
     plan: "Enterprise"
   ```

2. **Admin Functions Available:**
   - `getAllUsers()` - View all users
   - `updateUserRole(userId, role)` - Change user permissions
   - View all subscriptions and payments
   - Access user libraries and bookmarks

3. **Sync Admin Panel:**
   - Copy `js/firebase-config.js` to Admin panel
   - Import and use the same Firebase functions
   - Real-time sync works automatically

## 🆘 Troubleshooting

### Firebase Issues

**Problem:** "Firebase not initialized"
- Check if Firebase CDN scripts are loaded
- Verify `firebase-config.js` is included before use
- Check browser console for errors

**Problem:** "Permission denied" in Firestore
- Review Firestore security rules
- Ensure user is authenticated
- Check if user UID matches document path

**Problem:** "Sign-in method not enabled"
- Enable the authentication method in Firebase Console
- Check Build > Authentication > Sign-in method

### Stripe Issues

**Problem:** "Invalid API key"
- Verify you're using the correct environment (test/live)
- Check if key starts with `pk_` (publishable key)
- Regenerate keys if compromised

**Problem:** "Payment fails in production"
- Ensure backend API is running
- Check CORS settings
- Verify webhook endpoints are configured
- Check Stripe Dashboard logs

**Problem:** "Subscription not updating in Firebase"
- Verify webhook is properly configured
- Check backend logs for errors
- Ensure Firebase Admin SDK is initialized

## 📚 Additional Resources

### Firebase Documentation
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Security Rules](https://firebase.google.com/docs/firestore/security/rules-structure)

### Stripe Documentation
- [Stripe Payments Integration](https://stripe.com/docs/payments)
- [Stripe Subscriptions](https://stripe.com/docs/billing/subscriptions/overview)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Test Cards](https://stripe.com/docs/testing)

### Support
- Firebase Support: [firebase.google.com/support](https://firebase.google.com/support)
- Stripe Support: [support.stripe.com](https://support.stripe.com)
- JusConsultus Support: support@jusconsultus.com

## ✅ Implementation Checklist

- [x] Create Firebase project
- [x] Enable Email/Password authentication
- [x] Enable Google Sign-In
- [x] Create Firestore database
- [x] Set up Firestore security rules
- [x] Update firebase-config.js with credentials
- [x] Create Stripe account
- [x] Get Stripe API keys
- [x] Create Stripe products and prices
- [x] Update stripe-integration.js with keys
- [ ] Test authentication flows
- [ ] Test document templates
- [ ] Test subscription payments (demo mode)
- [ ] Deploy backend API (for production)
- [ ] Test production payment flow
- [ ] Deploy to production

---

**Last Updated:** January 20, 2026

**Version:** 1.0.0

**Status:** ✅ Ready for Testing
