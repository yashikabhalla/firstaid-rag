// lib/safety.js

const CRISIS_PATTERNS = [
  /suicid/i,
  /kill myself/i,
  /end my life/i,
  /self.?harm/i,
  /hurt myself/i,
  /want to die/i,
  /no reason to live/i,
  /don'?t want to (be here|be alive|live) anymore/i,
  /don'?t want to (be here|be alive|live)\b/i,
  /wish i (was|were) dead/i,
  /better off (without me|dead)/i,
]

export function isCrisisQuery(text) {
  return CRISIS_PATTERNS.some((pattern) => pattern.test(text))
}

const CRISIS_RESOURCES = {
  IN: {
    primary:
      'India — Tele-MANAS (Govt of India, 24/7): 14416 or 1800-89-14416',
    secondary:
      'India — Vandrevala Foundation (24/7): +91-9999666555',
  },

  US: {
    primary:
      'United States — 988 Suicide & Crisis Lifeline (24/7): call or text 988',
    secondary:
      'United States — 988 also provides free, confidential crisis support by phone, text, and chat',
  },

  UK: {
    primary:
      'UK — Samaritans (free, 24/7): 116 123',
    secondary:
      'UK — Samaritans provides confidential emotional support day or night',
  },
}

export function getCrisisResponse(regionCode = 'IN') {
  const resources = CRISIS_RESOURCES[regionCode] ?? CRISIS_RESOURCES.IN

  return {
    answer:
      "This isn't something I'm able to help with, but real support is available right now:\n\n" +
      `• ${resources.primary}\n` +
      `• ${resources.secondary}\n\n` +
      "If there's immediate danger, please call your local emergency number or go to the nearest hospital.",

    sources: [],

    isCrisisResponse: true,
  }
}