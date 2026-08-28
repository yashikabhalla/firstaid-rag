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
];

export function isCrisisQuery(text) {
  return CRISIS_PATTERNS.some((pattern) => pattern.test(text));
}

export const CRISIS_RESPONSE = {
  answer:
    "This isn't something I'm able to help with, but real support is available right now:\n\n" +
    "• India — Tele-MANAS (Govt of India, 24/7): 14416 or 1-800-891-4416\n" +
    "• India — Vandrevala Foundation (24/7): +91-9999666555\n" +
    "• Outside India — findahelpline.com lists verified local helplines\n\n" +
    "If there's immediate danger, please call your local emergency number or go to the nearest hospital.",
  sources: [],
  isCrisisResponse: true,
};
