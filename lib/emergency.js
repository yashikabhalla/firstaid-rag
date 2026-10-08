// lib/emergency.js

const EMERGENCY_KEYWORDS = [
  'heart attack',
  'cardiac arrest',
  'not breathing',
  'no pulse',
  'chest pain',
  'stroke',
  'unconscious',
  'unresponsive',
  'anaphylaxis',
  'anaphylactic reaction',
  'severe bleeding',
  'choking',
  'drowning',
  'overdose',
  'poisoning',
  'swallowed poison',
  'seizure',
  'stopped breathing',
  'no heartbeat',
  'collapsed',
]

const EDUCATIONAL_PATTERNS = [
  /how (do|can) (i|you) prevent/i,
  /how (do|can) (i|you) avoid/i,
  /what (are|is) .*symptoms/i,
  /what (are|is) .*signs/i,
  /what causes/i,
  /how to prevent/i,
  /how to avoid/i,
  /what should i (know|do|learn) about/i,
  /what is .*$/i,
  /what are .*$/i,
  /prevent(ion)?/i,
]

export function isEmergencyQuery(text) {
  if (!text || typeof text !== 'string') {
    return false
  }

  const lower = text.toLowerCase().trim()

  // Food poisoning questions are generally informational
  // and should not trigger an emergency alert by keyword alone.
  if (lower.includes('food poisoning')) {
    return false
  }

  // Educational questions should not trigger an emergency alert
  // simply because they contain an emergency-related keyword.
  const isEducational = EDUCATIONAL_PATTERNS.some((pattern) =>
    pattern.test(lower)
  )

  if (isEducational) {
    return false
  }

  return EMERGENCY_KEYWORDS.some((keyword) =>
    lower.includes(keyword)
  )
}