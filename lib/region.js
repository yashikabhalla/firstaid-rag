// lib/region.js
// ONE place for every region-specific phone number.
// India numbers verified 2026-10-06 (Tele-MANAS, AIIMS NPIC, national emergency list).
// US/UK numbers are standard national lines but were NOT re-checked: verify them.

export const DEFAULT_REGION = 'IN'

export const REGIONS = {
  IN: {
    code: 'IN',
    label: 'India',
    emergency: '112',
    poisonLine: 'the AIIMS National Poisons Information Centre (1800 116 117)',
    crisisLine: 'Tele-MANAS 14416 or 1-800-891-4416 (free, 24/7)',
  },
  US: {
    code: 'US',
    label: 'United States',
    emergency: '911',
    poisonLine: 'Poison Control (1-800-222-1222)',
    crisisLine: '988 Suicide and Crisis Lifeline (call or text 988)',
  },
  UK: {
    code: 'UK',
    label: 'United Kingdom',
    emergency: '999',
    poisonLine: 'NHS 111',
    crisisLine: 'Samaritans 116 123 (free, 24/7)',
  },
}

// Accepts anything (the region comes from the browser, so it is untrusted)
// and always returns a valid region.
export function getRegion(code) {
  const key = typeof code === 'string' ? code.toUpperCase() : ''
  return REGIONS[key] ?? REGIONS[DEFAULT_REGION]
}

// Swap {{PLACEHOLDERS}} in knowledge-base text for the region's numbers.
export function applyRegion(text, region) {
  const r = typeof region === 'string' || !region ? getRegion(region) : region
  return String(text ?? '')
    .replaceAll('{{EMERGENCY}}', r.emergency)
    .replaceAll('{{POISON_LINE}}', r.poisonLine)
    .replaceAll('{{CRISIS_LINE}}', r.crisisLine)
}