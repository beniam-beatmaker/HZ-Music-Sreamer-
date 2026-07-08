'use strict';

const Stripe = require('stripe');
const { recordEvent } = require('./_state');
const { getStripeSecretKey } = require('./_stripeConfig');

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', (err) => reject(err));
  });
}

function getSubscriptionFromEvent(event) {
  const object = (((event || {}).data || {}).object) || {};
  if (object.object === 'subscription') return object;
  if (object.object === 'invoice' && object.subscription) {
    return {
      id: object.subscription,
      customer: object.customer,
      status: object.status
    };
  }
  return {
    id: object.subscription || object.id || null,
    customer: object.customer || null,
    status: object.status || null
  };
}

function isTrackedStripeEvent(eventType) {
  const normalized = String(eventType || '').toLowerCase();
  return normalized === 'checkout.session.completed' ||
    normalized === 'customer.session.completed' ||
    normalized === 'customer.subscription.created' ||
    normalized === 'customer-subscription.deleted' ||
    normalized === 'customer.subscription.deleted' ||
    normalized === 'customer.subscription.updated' ||
    normalized === 'invoice.payment_failed' ||
    normalized === 'invoice.payment_succeeded' ||
    normalized === 'invoice.paid';
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Method not allowed.' }));
    return;
  }

  const stripeSecretKey = getStripeSecretKey();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeSecretKey || !webhookSecret) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Stripe webhook secrets are missing on server.' }));
    return;
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-06-20'
  });

  try {
    const rawBody = req.rawBody ? Buffer.from(req.rawBody) : await readRawBody(req);
    const signature = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    const eventType = String(event.type || '');
    const subscription = getSubscriptionFromEvent(event);

    if (isTrackedStripeEvent(eventType)) {
      recordEvent({
        type: eventType,
        subscriptionId: subscription.id,
        customerId: subscription.customer,
        status: subscription.status,
        data: { eventId: event.id }
      });
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ received: true }));
  } catch (error) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: error.message || 'Invalid webhook signature.' }));
  }
};

module.exports.config = {
  api: {
    bodyParser: false
  }
};
