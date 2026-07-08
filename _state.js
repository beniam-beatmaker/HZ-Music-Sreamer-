'use strict';

// In-memory event state for lightweight webhook/status tracking.
// Swap this with a persistent DB in production.
const state = globalThis.__hertzSubscriptionState || {
  latestEvent: null,
  bySubscriptionId: {}
};

globalThis.__hertzSubscriptionState = state;

function recordEvent(event) {
  if (!event) return;

  const normalized = {
    type: String(event.type || ''),
    subscriptionId: event.subscriptionId ? String(event.subscriptionId) : null,
    customerId: event.customerId ? String(event.customerId) : null,
    status: event.status ? String(event.status) : null,
    createdAt: event.createdAt || new Date().toISOString(),
    data: event.data || null
  };

  state.latestEvent = normalized;
  if (normalized.subscriptionId) {
    state.bySubscriptionId[normalized.subscriptionId] = normalized;
  }
}

function getLatestEvent(subscriptionId) {
  if (subscriptionId && state.bySubscriptionId[String(subscriptionId)]) {
    return state.bySubscriptionId[String(subscriptionId)];
  }
  return state.latestEvent;
}

module.exports = {
  recordEvent,
  getLatestEvent
};
