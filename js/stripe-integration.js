// Stripe Payment Integration
// JusConsultus AI - Subscription Payment Processing

// Stripe Configuration
const STRIPE_PUBLIC_KEY = 'YOUR_STRIPE_PUBLISHABLE_KEY'; // Replace with your Stripe publishable key

// Price IDs for subscription plans (create these in Stripe Dashboard)
const STRIPE_PRICES = {
  pro_monthly: 'price_XXXXXXXXXXXXX', // Replace with your Stripe price ID
  pro_yearly: 'price_XXXXXXXXXXXXX'   // Replace with your Stripe price ID
};

let stripe;

// Initialize Stripe
function initializeStripe() {
  if (typeof Stripe === 'undefined') {
    console.error('Stripe.js not loaded. Please include Stripe.js in HTML.');
    return false;
  }
  
  try {
    stripe = Stripe(STRIPE_PUBLIC_KEY);
    console.log('Stripe initialized successfully');
    return true;
  } catch (error) {
    console.error('Stripe initialization error:', error);
    return false;
  }
}

// Create checkout session for subscription
async function createCheckoutSession(priceId, userId, userEmail) {
  try {
    // Call your backend to create a Checkout Session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: priceId,
        userId: userId,
        userEmail: userEmail,
        successUrl: window.location.origin + '/subscription.html?success=true',
        cancelUrl: window.location.origin + '/subscription.html?canceled=true'
      }),
    });
    
    const session = await response.json();
    
    if (session.error) {
      throw new Error(session.error);
    }
    
    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    
    if (result.error) {
      throw new Error(result.error.message);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return { success: false, error: error.message };
  }
}

// Handle subscription upgrade
async function handleSubscriptionUpgrade(plan, billingCycle) {
  const user = auth?.currentUser;
  if (!user) {
    showToast('Please sign in to upgrade your subscription', 'error');
    return;
  }
  
  const priceId = billingCycle === 'yearly' ? STRIPE_PRICES.pro_yearly : STRIPE_PRICES.pro_monthly;
  
  showToast('Redirecting to secure payment...', 'info');
  
  const result = await createCheckoutSession(priceId, user.uid, user.email);
  
  if (!result.success) {
    showToast('Payment setup failed: ' + result.error, 'error');
  }
}

// Create payment element for card details (for custom checkout)
async function setupPaymentElement(elementId) {
  try {
    // Create Payment Intent on your backend
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 149900, // Amount in cents (₱1,499.00)
        currency: 'php'
      }),
    });
    
    const { clientSecret } = await response.json();
    
    // Create and mount the Payment Element
    const elements = stripe.elements({ clientSecret });
    const paymentElement = elements.create('payment');
    paymentElement.mount('#' + elementId);
    
    return { elements, paymentElement };
  } catch (error) {
    console.error('Error setting up payment element:', error);
    return null;
  }
}

// Process payment with card details
async function processPayment(elements, userDetails) {
  try {
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/subscription.html?success=true',
        receipt_email: userDetails.email,
      },
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Payment processing error:', error);
    return { success: false, error: error.message };
  }
}

// Verify payment and update subscription in Firebase
async function verifyAndUpdateSubscription(sessionId) {
  try {
    // Call your backend to verify the session
    const response = await fetch('/api/verify-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Update subscription in Firebase
      const subscriptionData = {
        status: 'active',
        plan: 'pro',
        stripeSubscriptionId: data.subscriptionId,
        stripeCustomerId: data.customerId,
        startDate: firebase.firestore.FieldValue.serverTimestamp(),
        currentPeriodEnd: new Date(data.currentPeriodEnd * 1000),
        cancelAtPeriodEnd: false
      };
      
      await updateSubscription(subscriptionData);
      
      return { success: true };
    } else {
      throw new Error(data.error || 'Payment verification failed');
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return { success: false, error: error.message };
  }
}

// Cancel subscription
async function cancelSubscription(subscriptionId) {
  try {
    const response = await fetch('/api/cancel-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subscriptionId }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Update subscription in Firebase
      const user = auth.currentUser;
      await db.collection('users').doc(user.uid).update({
        'subscription.cancelAtPeriodEnd': true,
        'subscription.status': 'canceling'
      });
      
      return { success: true };
    } else {
      throw new Error(data.error || 'Cancellation failed');
    }
  } catch (error) {
    console.error('Error canceling subscription:', error);
    return { success: false, error: error.message };
  }
}

// Reactivate canceled subscription
async function reactivateSubscription(subscriptionId) {
  try {
    const response = await fetch('/api/reactivate-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subscriptionId }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Update subscription in Firebase
      const user = auth.currentUser;
      await db.collection('users').doc(user.uid).update({
        'subscription.cancelAtPeriodEnd': false,
        'subscription.status': 'active'
      });
      
      return { success: true };
    } else {
      throw new Error(data.error || 'Reactivation failed');
    }
  } catch (error) {
    console.error('Error reactivating subscription:', error);
    return { success: false, error: error.message };
  }
}

// Demo/Testing mode (for development without actual Stripe charges)
const DEMO_MODE = true; // Set to false in production

async function handleDemoPayment(plan, billingCycle) {
  if (!DEMO_MODE) {
    return handleSubscriptionUpgrade(plan, billingCycle);
  }
  
  // Simulate payment processing
  showToast('Processing demo payment...', 'info');
  
  setTimeout(async () => {
    const user = auth?.currentUser;
    if (!user) return;
    
    const subscriptionData = {
      status: 'active',
      plan: 'pro',
      stripeSubscriptionId: 'demo_sub_' + Date.now(),
      stripeCustomerId: 'demo_cus_' + Date.now(),
      startDate: firebase.firestore.FieldValue.serverTimestamp(),
      currentPeriodEnd: new Date(Date.now() + (billingCycle === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000),
      cancelAtPeriodEnd: false
    };
    
    try {
      if (typeof updateSubscription === 'function') {
        await updateSubscription(subscriptionData);
      } else {
        // Fallback to direct Firestore update
        await db.collection('users').doc(user.uid).update({
          'subscription': subscriptionData,
          'role': 'pro',
          'plan': 'Professional',
          'queryUsage.limit': 999999
        });
      }
      
      showToast('Demo payment successful! Pro features activated.', 'success');
      
      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 2000);
    } catch (error) {
      console.error('Demo payment error:', error);
      showToast('Demo payment failed: ' + error.message, 'error');
    }
  }, 2000);
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeStripe,
    createCheckoutSession,
    handleSubscriptionUpgrade,
    setupPaymentElement,
    processPayment,
    verifyAndUpdateSubscription,
    cancelSubscription,
    reactivateSubscription,
    handleDemoPayment
  };
}
