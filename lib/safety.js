// lib/safety.js

const CRISIS_PATTERNS = [
  // Direct English phrases
  /suicid/i,
  /kill myself/i,
  /end my life/i,
  /end it all/i,
  /take my own life/i,
  /take my life/i,
  /self.?harm/i,
  /hurt myself/i,
  /want to die/i,
  /wish i (was|were) dead/i,
  /don't want to (be here|be alive|live) anymore/i,
  /dont want to (be here|be alive|live) anymore/i,
  /don't want to wake up(?!\s+(early|for school|for class|for work|tomorrow morning))/i,
  /dont want to wake up(?!\s+(early|for school|for class|for work|tomorrow morning))/i,
  /no reason to live/i,
  /life isn't worth living/i,
  /life is not worth living/i,
  /can't go on/i,
  /cant go on/i,
  /better off (without me|dead)/i,

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
]

const CRISIS_EXCLUSIONS = [
  /suicide prevention/i,
  /warning signs of suicide/i,
  /signs of suicide/i,
  /what is suicide/i,
  /what are suicide/i,
  /how to prevent suicide/i,
]

export function isCrisisQuery(text) {
  if (!text || typeof text !== 'string') {
    return false
  }

  // Educational questions about suicide should not be treated
  // as a personal crisis unless they contain a direct crisis phrase.
  const isExcluded = CRISIS_EXCLUSIONS.some((pattern) => pattern.test(text))

  if (isExcluded) {
    return false
  }

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
      "I'm really sorry you're going through this. You don't have to face it alone.\n\n" +
      "Please reach out to someone who can support you right now:\n\n" +
      `• ${resources.primary}\n` +
      `• ${resources.secondary}\n\n` +
      "If you're in immediate danger or have already hurt yourself, please call your local emergency number or go to the nearest hospital.",

    sources: [],

    isCrisisResponse: true,
  }
}