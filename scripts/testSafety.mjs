import { isCrisisQuery } from '../lib/safety.js'

const shouldTrigger = [
  // English
  "I want to kill myself",
  "I want to end my life",
  "I want to end it all",
  "I want to take my own life",
  "I want to die",
  "I don't want to wake up tomorrow",
  "I don't want to live anymore",
  "I don't want to be alive anymore",
  "I want to hurt myself",
  "I am thinking about suicide",
  "I might kill myself",
  "Life isn't worth living",
  "I can't go on anymore",
  "Everyone would be better off without me",
  "I wish I were dead",

  // Hinglish
  "mujhe marna hai",
  "mera jeene ka mann nahi hai",
  "mujhe jeena nahi hai",
  "main zindagi khatam karna chahti hoon",
  "main sab kuch khatam karna chahta hoon",
  "main khud ko maarna chahti hoon",
  "main apni jaan lena chahta hoon",
  "jeene ka man nahi hai",
  "mujhe apni jaan deni hai",
  "main sab khatam karna chahti hoon",
  "I am killing myself slowly and want to stop",
  "I keep thinking about ending it all",
  "I have been thinking about taking my own life",
  "I am thinking about suicide. What are the warning signs of suicide?",
  "I want to die, how to prevent suicide",
  "I am suicidal",
  "I cut myself on purpose again",
  "mujhe khudkushi ke khayal aa rahe hain",
  "मुझे आत्महत्या के ख्याल आ रहे हैं",
]

const shouldNotTrigger = [
  // Normal medical questions
  "What are the symptoms of depression?",
  "How can I help someone with depression?",
  "What is suicide prevention?",
  "What are the warning signs of suicide?",
  "How can I support my friend?",
  "I am feeling very sad today",
  "I had a terrible day",
  "I don't like my life right now",
  "I want to sleep",
  "I don't want to wake up early tomorrow",

  // Normal first-aid questions
  "How do I treat a small cut?",
  "What should I do for a burn?",
  "My friend has a headache",
  "How do I help someone who fainted?",
  "What should I do if someone is choking?",
  "I fell off my bike and hurt myself, my ankle is swollen",
  "I hurt myself lifting weights, my back is sore",
  "I cut myself while chopping onions",
  "I burned myself on the stove",
  "I want to cut myself a slice of cake",
  "I cannot go on this hike, my ankle is sprained",
  "my son hurt himself playing football",
]

let passed = 0
let failed = 0

console.log('\n=== CRISIS DETECTION TESTS ===\n')

for (const text of shouldTrigger) {
  const result = isCrisisQuery(text)

  if (result) {
    console.log(`✅ PASS: ${text}`)
    passed++
  } else {
    console.log(`❌ FAIL: ${text}`)
    failed++
  }
}

console.log('\n=== NON-CRISIS TESTS ===\n')

for (const text of shouldNotTrigger) {
  const result = isCrisisQuery(text)

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