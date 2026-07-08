'use strict';

const fs = require('fs');
const path = require('path');

const STRIPE_SECRET_KEY_ENV_FILES = [
  path.resolve(__dirname, '..', '..', 'Stripe_secret_Key.env'),
  path.resolve(__dirname, '..', '..', 'Stripe_secret_key.env.env'),
  path.resolve(__dirname, '..', '..', '.env')
];
const STRIPE_SECRET_KEY_ENV_FILE = STRIPE_SECRET_KEY_ENV_FILES[0];

function parseEnvStyleValue(rawValue) {
  const trimmed = String(rawValue || '').trim();
  if (!trimmed) return '';
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function readStripeSecretKeyFromFile() {
  let fileText = '';
  for (let i = 0; i < STRIPE_SECRET_KEY_ENV_FILES.length; i++) {
    const candidateFile = STRIPE_SECRET_KEY_ENV_FILES[i];
    try {
      fileText = fs.readFileSync(candidateFile, 'utf8');
      if (String(fileText || '').trim()) break;
    } catch (error) {
      fileText = '';
    }
  }

  const trimmedFile = String(fileText || '').trim();
  if (!trimmedFile) return '';

  if (!trimmedFile.includes('=')) {
    return parseEnvStyleValue(trimmedFile);
  }

  const lines = trimmedFile.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = String(lines[i] || '').trim();
    if (!line || line.startsWith('#')) continue;

    const separatorIndex = line.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    if (key !== 'STRIPE_SECRET_KEY' && key !== 'envSTRIPE_SECRET_KEY') continue;

    return parseEnvStyleValue(line.slice(separatorIndex + 1));
  }

  return '';
}

function getStripeSecretKey() {
  return String(process.env.STRIPE_SECRET_KEY || '').trim() || readStripeSecretKeyFromFile();
}

module.exports = {
  getStripeSecretKey,
  STRIPE_SECRET_KEY_ENV_FILE
};