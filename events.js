'use strict';

const { getLatestEvent } = require('./_state');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Method not allowed.' }));
    return;
  }

  const subscriptionId = (req.query && req.query.subscriptionId) || null;
  const latestEvent = getLatestEvent(subscriptionId);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ latestEvent: latestEvent || null }));
};
