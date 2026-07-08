'use strict';

const Stripe = require('stripe');
const { recordEvent } = require('./_state');
const { getStripeSecretKey } = require('./_stripeConfig');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Method not allowed.' }));
    return;
  }

  const stripeSecretKey = getStripeSecretKey();
  if (!stripeSecretKey) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Server Stripe secret key is missing. Set STRIPE_SECRET_KEY or add it to Stripe_secret_Key.env.' }));
    return;
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const subscriptionId = String(body.subscriptionId || '').trim();
  if (!subscriptionId) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'subscriptionId is required.' }));
    return;
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-06-20'
  });

  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true
    });

    recordEvent({
      type: 'customer.subscription.updated',
      subscriptionId: subscription.id,
      customerId: subscription.customer,
      status: subscription.status,
      data: {
        cancelAtPeriodEnd: subscription.cancel_at_period_end
      }
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      subscriptionId: subscription.id,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      eventType: 'customer.subscription.updated'
    }));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: error.message || 'Unable to cancel subscription.' }));
  }
};
