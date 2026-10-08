import { isEmergencyQuery } from '../lib/emergency.js'

const shouldTrigger = [
  // Active emergencies
  "My dad is having a heart attack",
  "My mother has severe chest pain",
  "Someone is not breathing",
  "He has no pulse",
  "She is unconscious",
  "My friend is unresponsive",
  "Someone is choking right now",
  "My child is choking",
  "Someone is drowning",
  "He is having a seizure",
  "She has severe bleeding",
  "Someone collapsed and isn't responding",
  "My friend stopped breathing",
  "Someone has no heartbeat",
  "He is having an anaphylactic reaction",
  "Someone overdosed",
  "My child swallowed poison and is very sick",
  "I think my dad is having a stroke",
]

const shouldNotTrigger = [
  // Educational questions
  "What are the symptoms of a heart attack?",
  "What are the warning signs of a stroke?",
  "How can I prevent choking?",
  "How do I prevent drowning?",
  "How can I avoid severe bleeding?",
  "What causes seizures?",
  "What are the signs of anaphylaxis?",
  "How can I prevent anaphylaxis?",
  "What is cardiac arrest?",
  "What are the symptoms of food poisoning?",
  "What should I know about poisoning?",
  "How can I prevent food poisoning?",
  "What is the treatment for a minor burn?",
  "How do I help someone who fainted?",
  "What should I do to prevent a seizure?",
]

let passed = 0
let failed = 0

console.log('\n=== EMERGENCY DETECTION TESTS ===\n')

for (const text of shouldTrigger) {
  const result = isEmergencyQuery(text)

  if (result) {
    console.log(`✅ PASS: ${text}`)
    passed++
  } else {
    console.log(`❌ FAIL: ${text}`)
    failed++
  }
}

console.log('\n=== NON-EMERGENCY TESTS ===\n')

for (const text of shouldNotTrigger) {
  const result = isEmergencyQuery(text)

  if (!result) {
    console.log(`✅ PASS: ${text}`)
    passed++
  } else {
    console.log(`❌ FALSE POSITIVE: ${text}`)
    failed++
  }
}

console.log('\n==============================')
console.log(`Passed: ${passed}`)
console.log(`Failed: ${failed}`)
console.log('==============================\n')

if (failed > 0) {
  process.exit(1)
}