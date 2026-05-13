import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  // In development, we might not always have keys injected before building types,
  // so we won't throw an error immediately, but we can log a warning.
  console.warn('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2026-04-22.dahlia', // Best practice: lock API version to what you used to build
  appInfo: {
    name: 'FlozenAI',
    version: '0.1.0',
  },
  typescript: true,
});
