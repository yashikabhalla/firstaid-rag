// lib/emergency.js
//
// Decides whether a message describes a likely emergency (red banner + "call
// emergency services"). Rule of thumb: a false alarm is cheap, a missed
// emergency is not. So we only suppress the alert for messages that are
// clearly *general-knowledge questions*, and never when the message also
// describes a real person or an ongoing situation.

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

// A "general knowledge" question must START like one (anchored with ^) and be
// a single short question (no comma / full stop splitting it into two parts).
const EDUCATIONAL_PATTERNS = [
  // "How can I prevent choking?" / "What should I do to prevent a seizure?"
  /^\s*(how|what)\b[^,;.?]*\b(prevent|avoid)\b[^,;.?]*\??\s*$/i,
  // "What are the symptoms of a heart attack?" / "Signs of a heart attack"
  /^\s*(what\s+(are|is)\s+(the\s+)?)?(common\s+|early\s+|warning\s+)*(symptoms?|signs?)\s+of\b[^,;.?]*\??\s*$/i,
  // "What causes seizures?"
  /^\s*what\s+causes\b[^,;.?]*\??\s*$/i,
  // "What should I know about poisoning?"
  /^\s*what\s+should\s+i\s+(know|learn)\s+about\b[^,;.?]*\??\s*$/i,
  // "What is cardiac arrest?" (short definition question only)
  /^\s*what\s+(is|are)\s+(a\s+|an\s+|the\s+)?[a-z\s-]{3,40}\??\s*$/i,
]

// If the message mentions a person or an ongoing situation it is NOT a
// general question, even if it starts like one.
const PERSON_OR_SITUATION =
  /\b(he|she|they|him|her|his|their|someone|somebody|anyone|person|patient|baby|infant|toddler|child|kid|man|woman|dad|mom|mum|mother|father|friend|husband|wife|son|daughter|brother|sister|grandpa|grandma|grandfather|grandmother|colleague|coworker|my|now|currently|happening)\b/i

export function isEmergencyQuery(text) {
  if (!text || typeof text !== 'string') return false

  // "Food poisoning" alone is not an emergency. Strip it and check the rest,
  // so "food poisoning and now he is unconscious" still fires.
  const lower = text
    .toLowerCase()
    .replace(/\bfood poisoning\b/g, ' ')
    .trim()

  const isGeneralQuestion =
    EDUCATIONAL_PATTERNS.some((p) => p.test(lower)) && !PERSON_OR_SITUATION.test(lower)

  if (isGeneralQuestion) return false

  return EMERGENCY_KEYWORDS.some((keyword) => lower.includes(keyword))
}