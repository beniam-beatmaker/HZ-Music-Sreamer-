'use strict';

const Stripe = require('stripe');
const { recordEvent } = require('./_state');
const { getStripeSecretKey, STRIPE_SECRET_KEY_ENV_FILE } = require('./_stripeConfig');
const ALLOWED_ORIGINS = new Set([
  'https://hz-streams.com',
  'https://www.hz-streams.com'
]);

// Keep Stripe Price IDs private on the backend only.
const STRIPE_PRICE_IDS_BY_CURRENCY = {
  USD: 'price_1ToLuFEEsNsUM0iCAavtGMxN',
  AUD: 'price_1Tp08sEEsNsUM0iCF3ZTh9dd',
  EUR: 'price_1Tp0H9EEsNsUM0iCjWoAT7oP',
  GBP: 'price_1Tp0GBEEsNsUM0iCzzMdxvam',
  NZD: 'price_1Tp0IeEEsNsUM0iCaL7cKOCR',
  INR: 'price_1Tp0KcEEsNsUM0iCdY6pUo7b',
  CNY: 'price_1Tp0JzEEsNsUM0iCRohjogKk',
  JPY: 'price_1Tp0JPEEsNsUM0iCWjyCmPrh',
  CAD: 'price_1Tp0HyEEsNsUM0iCgozJXKzd',
  SGD: 'price_1Tp0U8EEsNsUM0iCI4LKNSaz',
  HKD: 'price_1Tp0UbEEsNsUM0iC8l6jFwT9',
  CHF: 'price_1Tp0VWEEsNsUM0iCVsccvqwA',
  SEK: 'price_1Tp0W9EEsNsUM0iCCl00y4vF',
  NOK: 'price_1Tp0X2EEsNsUM0iCyVyvgbkV',
  DKK: 'price_1Tp0XdEEsNsUM0iCj65fH7wu',
  AED: 'price_1Tp0YeEEsNsUM0iC6F9lD4nJ',
  SAR: 'price_1Tp0ZKEEsNsUM0iCSbP7OYx0',
  ZAR: 'price_1Tp0bZEEsNsUM0iCL3OlITwt',
  NGN: 'price_1Tp0cJEEsNsUM0iCa6k7hszx',
  KES: 'price_1Tp0ctEEsNsUM0iChelEAzMf',
  EGP: 'price_1Tp0dzEEsNsUM0iC0LsuXOi9',
  BRL: 'price_1Tp0efEEsNsUM0iCaVC5k4yZ',
  MXN: 'price_1Tp0fMEEsNsUM0iCKjnuJGCY',
  ARS: 'price_1Tp0g0EEsNsUM0iCTOLUmbvS',
  CLP: 'price_1Tp0gcEEsNsUM0iCULqCHIxN',
  COP: 'price_1Tp0h5EEsNsUM0iCtXhxdo4n',
  PEN: 'price_1Tp0hUEEsNsUM0iCFed38qOg',
  TRY: 'price_1Tp0hyEEsNsUM0iCMQA7Q4wm',
  PLN: 'price_1Tp0iMEEsNsUM0iCwVtFmfqx',
  CZK: 'price_1Tp0itEEsNsUM0iCW88RMaP7',
  HUF: 'price_1Tp0jKEEsNsUM0iCqgFgi2uE',
  RON: 'price_1Tp0jzEEsNsUM0iCfWoZESlZ',
  THB: 'price_1Tp0kSEEsNsUM0iCCi7RMVkh',
  MYR: 'price_1Tp0kvEEsNsUM0iCrXHfpcNh',
  IDR: 'price_1Tp0lQEEsNsUM0iCImesciLC',
  PHP: 'price_1Tp0lvEEsNsUM0iCCfI7umeQ',
  VND: 'price_1Tp0oJEEsNsUM0iCi1GTCaAJ',
  KRW: 'price_1Tp0owEEsNsUM0iCsbULsTAe',
  TWD: 'price_1Tp0pjEEsNsUM0iCRRxAhI5U',
  PKR: 'price_1Tp0qIEEsNsUM0iCbSDxSK46',
  BDT: 'price_1Tp0r0EEsNsUM0iCm8J1VOs1'
};

// Duplicate PHP ID provided in request; kept as a private fallback if needed.
const FALLBACK_PRICE_IDS_BY_CURRENCY = {
  PHP: 'price_1Tp0n0EEsNsUM0iCknnsegMZ'
};

module.exports = async function handler(req, res) {
  const requestOrigin = String((req.headers && req.headers.origin) || '').trim();
  if (ALLOWED_ORIGINS.has(requestOrigin)) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  }

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

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

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-06-20'
  });

  const amountUsd = Number(body.amountUsd || 6.5);
  const safeAmount = Math.max(1, Math.round(amountUsd * 100));
  const selectedCurrency = String(body.currency || 'USD').toUpperCase();
  const mappedPriceId = STRIPE_PRICE_IDS_BY_CURRENCY[selectedCurrency]
    || FALLBACK_PRICE_IDS_BY_CURRENCY[selectedCurrency]
    || null;
  const paymentMethodId = (((body.paymentMethod || {}).stripePaymentMethodId) || '').trim();

  if (!paymentMethodId) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Tokenized Stripe payment method is required.' }));
    return;
  }

  try {
    const customer = await stripe.customers.create({
      name: (((body.customer || {}).cardholderName) || 'Hertz Subscriber').slice(0, 120),
      metadata: {
        source: String(body.source || 'hertz-web')
      }
    });

    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id
    });

    await stripe.customers.update(customer.id, {
      invoice_settings: {
        default_payment_method: paymentMethodId
      }
    });

    const items = mappedPriceId
      ? [{ price: mappedPriceId, quantity: 1 }]
      : [{
          price_data: {
            currency: selectedCurrency.toLowerCase(),
            unit_amount: safeAmount,
            recurring: { interval: 'month' },
            product_data: {
              name: 'Hertz Monthly Subscription'
            }
          },
          quantity: 1
        }];

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: items,
      collection_method: 'charge_automatically',
      billing_cycle_anchor: 'now',
      proration_behavior: 'none',
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription'
      },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        source: String(body.source || 'hertz-subscription-popup'),
        currency: selectedCurrency,
        mappedPriceId: mappedPriceId || ''
      }
    });

    const latestInvoice = subscription.latest_invoice || null;
    const latestInvoiceObject = latestInvoice && typeof latestInvoice === 'object' ? latestInvoice : null;
    const paymentIntent = latestInvoiceObject ? latestInvoiceObject.payment_intent : null;
    const paymentIntentObject = paymentIntent && typeof paymentIntent === 'object' ? paymentIntent : null;
    const eventType = 'customer.subscription.created';

    recordEvent({
      type: eventType,
      subscriptionId: subscription.id,
      customerId: customer.id,
      status: subscription.status,
      data: {
        paymentIntentId: paymentIntentObject ? paymentIntentObject.id : null
      }
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      subscriptionId: subscription.id,
      customerId: customer.id,
      eventType: eventType,
      status: subscription.status,
      requiresAction: paymentIntentObject
        ? paymentIntentObject.status === 'requires_action' || paymentIntentObject.status === 'requires_confirmation'
        : false,
      paymentIntentClientSecret: paymentIntentObject ? paymentIntentObject.client_secret : null
    }));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: error.message || 'Unable to start subscription.' }));
  }
};
