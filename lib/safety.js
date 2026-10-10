// lib/safety.js

import { getRegion } from './region.js'

// STRONG patterns: first-person intent. These ALWAYS trigger the crisis
// response and are never cancelled by the "educational" exclusions below.
const STRONG_CRISIS_PATTERNS = [
  // Direct English phrases
  /\bkill(ing)? myself\b/i,
  /\bend(ing)? (my (own )?life|it all)\b/i,
  /\btak(e|ing) my (own )?life\b/i,
  /\bwant(ed)? to die\b/i,
  /\bwanna die\b/i,
  /\bwish i (was|were) dead\b/i,
  /\bdon'?t want to (be here|be alive|live) anymore\b/i,
  /\bdon'?t want to wake up(?!\s+(early|for school|for class|for work|tomorrow morning))/i,
  /\bno reason to (live|go on|keep going)\b/i,
  /\blife (isn'?t|is not) worth living\b/i,
  /\bcan'?t go on (anymore|any more|any longer|like this)\b/i,
  /\bbetter off (without me|dead)\b/i,
  /\bi('?m| am) suicidal\b/i,
  /\b(thinking (about|of)|thoughts? (of|about)|considering|contemplating|planning)\s+(suicide|killing myself|ending (it|my life))/i,

  // Self-harm: INTENT or deliberateness required. A first-aid app must not
  // treat "I fell and hurt myself" or "I cut myself cooking" as a crisis.
  /\b(want|going|plan(ning)?|thinking|about|urge|need|decided|trying)\b.{0,15}\b(to )?(hurt|harm|cut|burn|injure) (my ?self|myself)\b(?!\s+(a|an|some|the|another)\b)/i,
  /\b(hurt|harm|cut|burn|injure)\w* (my ?self|myself) (on purpose|deliberately|intentionally)\b/i,

  // Hinglish / Hindi-English phrases
  /mujhe marna hai/i,
  /marna chahti hoon/i,
  /marna chahta hoon/i,
  /jeene ka mann nahi/i,
  /jeene ka man nahi/i,
  /jeena nahi hai/i,
  /zindagi khatam karna/i,
  /sab khatam karna hai/i,
  /sab kuch khatam karna/i,
  /khud ko maarna/i,
  /khud ko marna/i,
  /apni jaan lena/i,
  /jaan dena chahti/i,
  /jaan dena chahta/i,
  /mujhe apni jaan deni/i,
  /main sab khatam karna/i,
  /khud\s?kushi/i,
  /आत्महत्या/,
]

// WEAK patterns: the topic is mentioned, but intent is unclear. These can be
// cancelled by an educational exclusion ("what is suicide prevention?").
const WEAK_CRISIS_PATTERNS = [/suicid/i, /self.?harm/i, /self.?injur/i]

const CRISIS_EXCLUSIONS = [
  /suicide prevention/i,
  /warning signs of suicide/i,
  /signs of suicide/i,
  /what is suicide/i,
  /what are suicide/i,
  /how to prevent suicide/i,
]

export function isCrisisQuery(text) {
  if (!text || typeof text !== 'string') return false

  // 1. A direct first-person statement always wins.
  if (STRONG_CRISIS_PATTERNS.some((p) => p.test(text))) return true

  // 2. Educational questions are not a personal crisis.
  if (CRISIS_EXCLUSIONS.some((p) => p.test(text))) return false

  // 3. Otherwise a bare mention of the topic gets the supportive response.
  return WEAK_CRISIS_PATTERNS.some((p) => p.test(text))
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
  },

  UK: {
    primary:
      'UK — Samaritans (free, 24/7): 116 123',
  },
}

export function getCrisisResponse(regionCode = 'IN') {
  const region = getRegion(regionCode) // validates + normalises the code
  const resources = CRISIS_RESOURCES[region.code] ?? CRISIS_RESOURCES.IN

  return {
    answer:
      "I'm really sorry you're going through this. You don't have to face it alone.\n\n" +
      "Please reach out to someone who can support you right now:\n\n" +
        [resources.primary, resources.secondary].filter(Boolean).map(line => `• ${line}`).join('\n') + '\n\n' +
      "If you're worried about someone else, you can call the same numbers to ask how to support them.\n\n" +
      `If you're in immediate danger or have already hurt yourself, please call ${region.emergency} or go to the nearest hospital.`,

    sources: [],

    isCrisisResponse: true,
    emergencyNumber: region.emergency,
  }
}