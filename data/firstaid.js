const firstAidData = [
  // ─── BLEEDING & WOUNDS ───────────────────────────────────────────
  {
    id: "bleed-001",
    topic: "Bleeding - How to stop bleeding",
    source: "Red Cross",
    sourceUrl: "https://www.redcross.org/take-a-class/resources/learn-first-aid/bleeding",
    keywords: ["bleeding", "blood", "cut", "wound", "laceration", "stop bleeding"],
    content: `To stop bleeding:
1. Apply firm direct pressure using a clean cloth, bandage, or your hand.
2. Do NOT remove the cloth if it soaks through — add more on top and keep pressing.
3. Maintain pressure for at least 15 minutes without peeking.
4. If possible, elevate the injured area above the heart level.
5. Once bleeding stops, secure with a bandage.
6. Do NOT use a tourniquet unless bleeding is life-threatening and uncontrollable.
Call 911 if: bleeding doesn't stop after 15 minutes, wound is deep or gaping, caused by a puncture, or involves the head/chest/abdomen.`
  },
  {
    id: "bleed-002",
    topic: "Bleeding - Deep or severe wound",
    source: "Red Cross",
    sourceUrl: "https://www.redcross.org/take-a-class/resources/learn-first-aid/bleeding",
    keywords: ["deep wound", "severe bleeding", "gaping wound", "heavy bleeding", "arterial bleeding"],
    content: `For deep or severely bleeding wounds:
1. Call 911 immediately.
2. Apply the hardest pressure you can with both hands using a thick cloth or clothing.
3. If trained, pack the wound tightly with gauze and maintain pressure.
4. Do NOT remove embedded objects — apply pressure around them.
5. Tourniquet (last resort only): apply 2-3 inches above wound, tighten until bleeding stops, note the time applied.
6. Keep person still and lying down.
7. Monitor for shock: pale/cold/clammy skin, rapid weak pulse, confusion.
8. Keep them warm with a blanket until help arrives.`
  },
  {
    id: "bleed-003",
    topic: "Nosebleed",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/nosebleed/",
    keywords: ["nosebleed", "nose bleed", "nose bleeding", "blood from nose"],
    content: `To treat a nosebleed:
1. Sit upright and lean slightly forward (not backward — prevents swallowing blood).
2. Pinch the soft part of the nose (just below the bony bridge) firmly.
3. Breathe through your mouth.
4. Hold for 10-15 minutes without releasing.
5. Do NOT stuff tissue up the nostril — use gentle outside pressure only.
6. Apply a cold compress to the bridge of the nose.
7. After bleeding stops, avoid blowing nose for several hours.
Seek medical help if: bleeding lasts more than 20 minutes, caused by a head injury, or person is on blood thinners.`
  },
  {
    id: "bleed-004",
    topic: "Knocked out tooth",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/knocked-out-tooth/",
    keywords: ["knocked out tooth", "tooth knocked out", "dental emergency", "lost tooth", "avulsed tooth"],
    content: `For a knocked-out adult tooth:
1. Pick up tooth by the crown (white part) — never touch the root.
2. If dirty, rinse gently with milk or saline — do NOT scrub.
3. Try to reinsert the tooth into the socket and hold it in place.
4. If reinsertion isn't possible, store in milk, saliva, or saline — NOT water.
5. See a dentist within 30 minutes — the sooner the better for reattachment.
6. Apply gentle pressure with gauze to control bleeding.
Note: Do NOT try to reinsert baby teeth — it can damage the permanent tooth underneath.`
  },
  {
    id: "bleed-005",
    topic: "Eye injury",
    source: "Mayo Clinic",
    sourceUrl: "https://www.mayoclinic.org/first-aid/first-aid-eye-emergency/basics/art-20056600",
    keywords: ["eye injury", "eye bleeding", "something in eye", "eye cut", "scratched eye", "eye trauma"],
    content: `For eye injuries:
For a cut or puncture to the eye:
1. Do NOT wash the eye or remove any object stuck in it.
2. Cover loosely with a clean cloth — do NOT apply pressure.
3. Go to emergency room immediately.
For a chemical splash:
1. Flush immediately with large amounts of cool water for 15-20 minutes.
2. Hold eye open under gentle stream of water.
3. Call Poison Control: 1-800-222-1222.
4. Seek emergency care.
For a black eye (blunt trauma):
1. Apply ice pack wrapped in cloth for 15-20 minutes.
2. Seek care if: vision changes, severe pain, blood visible in the eye.`
  },
  {
    id: "bleed-006",
    topic: "Object in eye",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/foreign-object-in-the-eye/",
    keywords: ["object in eye", "something in eye", "dirt in eye", "particle in eye", "foreign body eye"],
    content: `For a small object (dust, eyelash) in the eye:
1. Do NOT rub the eye.
2. Blink several times to let tears wash the object out.
3. Wash hands, then gently pull upper eyelid over lower eyelid.
4. Rinse with clean water or sterile saline using a clean cup or dropper.
5. If the object is visible on the white of the eye, try gently wiping with a damp cotton bud.
Do NOT attempt to remove objects that are: on the cornea (colored part), stuck, or penetrating the eye.
Seek immediate medical help if object cannot be removed or pain/vision problems persist.`
  },

  // ─── BURNS ──────────────────────────────────────────────────────
  {
    id: "burn-001",
    topic: "Burns - Minor (1st degree)",
    source: "Mayo Clinic",
    sourceUrl: "https://www.mayoclinic.org/first-aid/first-aid-burns/basics/art-20056649",
    keywords: ["burn", "burning", "scald", "hot water", "fire", "minor burn"],
    content: `For minor burns (redness, no blisters):
1. Cool under cool (not cold) running water for 10-20 minutes immediately.
2. Do NOT use ice, butter, or toothpaste — these cause more damage.
3. Remove rings or tight items near the burn before swelling starts.
4. Cover loosely with a sterile non-stick bandage or clean cloth.
5. Take over-the-counter pain relief like ibuprofen or paracetamol if needed.
6. Do NOT pop any blisters that form — this risks infection.
Seek medical help if: burn is larger than 3 inches, on face/hands/feet/genitals/joints, or person is under 5 or over 70.`
  },
  {
    id: "burn-002",
    topic: "Burns - Severe (2nd and 3rd degree)",
    source: "Red Cross",
    sourceUrl: "https://www.redcross.org/take-a-class/resources/learn-first-aid/burns",
    keywords: ["severe burn", "deep burn", "third degree burn", "large burn", "serious burn"],
    content: `For severe burns (blisters, charred or white skin, large area):
1. CALL 911 immediately.
2. Do NOT remove burned clothing stuck to skin.
3. Do NOT immerse large severe burns in cold water — can cause shock.
4. Cover with a cool moist bandage or clean cloth.
5. Elevate the burned area above heart level if possible.
6. Watch for shock: pale skin, weakness, shallow breathing.
7. Do NOT apply creams, butter, or home remedies.`
  },
  {
    id: "burn-003",
    topic: "Chemical burn",
    source: "Mayo Clinic",
    sourceUrl: "https://www.mayoclinic.org/first-aid/first-aid-chemical-burns/basics/art-20056667",
    keywords: ["chemical burn", "acid burn", "bleach burn", "chemical on skin", "corrosive burn"],
    content: `For a chemical burn to skin:
1. Call 911 for large or severe chemical burns.
2. Remove contaminated clothing and jewelry — protect your own hands with gloves.
3. Brush off any dry chemical powder before adding water.
4. Flush skin with large amounts of cool running water for at least 20 minutes.
5. Do NOT use neutralizing agents (vinegar, baking soda) — they can worsen the reaction.
6. Cover loosely with a clean bandage.
7. If chemical entered the eye: flush immediately with water for 20 minutes and seek emergency care.`
  },
  {
    id: "burn-004",
    topic: "Electrical burn",
    source: "Red Cross",
    sourceUrl: "https://www.redcross.org/take-a-class/resources/learn-first-aid/burns",
    keywords: ["electrical burn", "electric shock", "electrocution", "lightning strike"],
    content: `For an electrical burn or electric shock:
1. Do NOT touch the person if they are still in contact with the electrical source.
2. Turn off the power source if safely possible, or use a non-conductive object (wooden broom) to push the source away.
3. Call 911 immediately — electrical burns are often more severe internally than they appear.
4. Check for breathing and pulse — be prepared to perform CPR.
5. Do NOT move person if spinal injury is suspected.
6. Cover burns with a dry sterile bandage.
7. Watch for shock, confusion, irregular heartbeat, and muscle pain.`
  },
  {
    id: "burn-005",
    topic: "Sunburn",
    source: "Mayo Clinic",
    sourceUrl: "https://www.mayoclinic.org/diseases-conditions/sunburn/symptoms-causes/syc-20355922",
    keywords: ["sunburn", "sun burn", "too much sun", "skin burn sun", "UV burn"],
    content: `For sunburn:
1. Get out of the sun and into shade or indoors immediately.
2. Cool the skin with cool (not cold) water or damp cloth — do NOT apply ice.
3. Apply aloe vera gel or moisturizing lotion (avoid petroleum-based products initially).
4. Take ibuprofen or aspirin to reduce pain and inflammation.
5. Drink extra water to stay hydrated — sunburn draws fluid to skin.
6. Do NOT pop blisters if they form.
7. Cover burned areas when going back outside.
Seek medical care if: blistering over large area, fever, chills, severe pain, confusion, or signs of dehydration.`
  },

  // ─── BREATHING & AIRWAY ─────────────────────────────────────────
  {
    id: "choke-001",
    topic: "Choking - Adult",
    source: "Red Cross",
    sourceUrl: "https://www.redcross.org/take-a-class/resources/learn-first-aid/choking",
    keywords: ["choking", "choke", "heimlich", "cant breathe", "airway blocked", "stuck in throat"],
    content: `For a choking adult who cannot speak, cough, or breathe:
1. Ask "Are you choking?" — if they cannot speak, act immediately.
2. Call 911 or have someone call while you help.
3. Give 5 firm back blows: lean them forward, strike between shoulder blades with heel of hand.
4. Give 5 abdominal thrusts (Heimlich): stand behind, make fist above navel, grab with other hand, thrust sharply inward and upward.
5. Alternate 5 back blows and 5 abdominal thrusts until object is dislodged or person loses consciousness.
6. If unconscious, lower to floor and begin CPR.
Do NOT do blind finger sweeps — only remove visible objects.`
  },
  {
    id: "choke-002",
    topic: "Choking - Child (1-12 years)",
    source: "Red Cross",
    sourceUrl: "https://www.redcross.org/take-a-class/resources/learn-first-aid/choking",
    keywords: ["child choking", "kid choking", "choking child", "toddler choking"],
    content: `For a choking child aged 1-12:
1. Call 911 or have someone call.
2. Encourage coughing if the child can still cough forcefully.
3. If coughing is ineffective: kneel or stand behind the child.
4. Give 5 back blows between shoulder blades with the heel of your hand.
5. Give 5 abdominal thrusts — use less force than for an adult.
6. Alternate back blows and abdominal thrusts.
7. If child becomes unconscious, begin child CPR and look for the object each time you open the airway.`
  },
  {
    id: "choke-003",
    topic: "Choking - Infant (under 1 year)",
    source: "Red Cross",
    sourceUrl: "https://www.redcross.org/take-a-class/resources/learn-first-aid/choking",
    keywords: ["baby choking", "infant choking", "choking baby", "choking infant", "newborn choking"],
    content: `For a choking infant under 1 year:
1. Call 911 immediately or have someone else call.
2. Hold infant face-down on your forearm, head lower than chest, supporting head.
3. Give 5 gentle back blows between shoulder blades with 2 fingers.
4. Turn infant face-up on your forearm.
5. Give 5 chest thrusts using 2 fingers on center of chest just below nipple line.
6. Alternate 5 back blows and 5 chest thrusts until object dislodges or infant loses consciousness.
7. If unconscious, begin infant CPR.
NEVER do abdominal thrusts on an infant — chest thrusts only.`
  },
  {
    id: "asthma-001",
    topic: "Asthma attack",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/asthma/",
    keywords: ["asthma", "asthma attack", "wheezing", "inhaler", "cant breathe asthma", "breathing difficulty"],
    content: `For an asthma attack:
1. Stay calm and help the person sit upright — do NOT lay them down.
2. Help them use their reliever inhaler (usually blue) immediately — up to 10 puffs.
3. Use a spacer if available — it makes the inhaler more effective.
4. If no improvement after 5-10 minutes, use inhaler again.
5. Call 911 if: no inhaler available, no improvement after 10 minutes, lips or fingernails turn blue, person is exhausted from breathing effort, or confusion develops.
6. Stay with them and keep them calm — anxiety worsens attacks.
7. After attack: always follow up with a doctor even if it resolves.`
  },
  {
    id: "drowning-001",
    topic: "Drowning",
    source: "Red Cross",
    sourceUrl: "https://www.redcross.org/take-a-class/resources/learn-first-aid/drowning",
    keywords: ["drowning", "water", "swimming", "pool", "ocean", "lake", "submerged", "near drowning"],
    content: `For drowning:
1. Call 911 immediately.
2. Do NOT enter water unless trained — throw a rope, ring buoy, or flotation device instead.
3. Once person is safely out of water, check for breathing and responsiveness.
4. If not breathing: begin CPR immediately — start with 5 rescue breaths, then 30 compressions.
5. Even if person appears to recover, take to hospital — secondary drowning can occur hours later.
6. Keep person warm — drowning victims lose body heat rapidly.
7. Do NOT hold upside down to drain water — this delays CPR.`
  },

  // ─── CARDIAC ────────────────────────────────────────────────────
  {
    id: "cpr-001",
    topic: "CPR - Adult",
    source: "Red Cross",
    sourceUrl: "https://www.redcross.org/take-a-class/cpr",
    keywords: ["cpr", "cardiac arrest", "not breathing", "unconscious", "no pulse", "resuscitation adult"],
    content: `Adult CPR (unresponsive and not breathing normally):
1. CALL 911 immediately. Send someone for an AED if available.
2. Place person on back on a firm flat surface.
3. Tilt head back, lift chin to open airway. Check for breathing up to 10 seconds.
4. Place heel of hand on center of chest (lower half of breastbone). Place other hand on top, interlace fingers.
5. Push down at least 2 inches, 100-120 times per minute (beat of "Staying Alive").
6. Allow full chest recoil between compressions.
7. If trained: after 30 compressions, give 2 rescue breaths (1 second each).
8. Continue 30:2 ratio until AED arrives, help takes over, or person recovers.`
  },
  {
    id: "cpr-002",
    topic: "CPR - Child (1-12 years)",
    source: "Red Cross",
    sourceUrl: "https://www.redcross.org/take-a-class/cpr",
    keywords: ["child cpr", "kid cpr", "cpr child", "child not breathing", "child unconscious"],
    content: `Child CPR (ages 1-12):
1. Call 911 immediately.
2. Tap shoulders and shout — if no response, begin CPR.
3. Use one or two hands (based on child size) on center of chest.
4. Push down about 2 inches at 100-120 compressions per minute.
5. If trained: give 2 rescue breaths after every 30 compressions.
6. Use an AED as soon as available — use pediatric pads if possible.
7. Continue until help arrives or child recovers.`
  },
  {
    id: "cpr-003",
    topic: "CPR - Infant (under 1 year)",
    source: "Red Cross",
    sourceUrl: "https://www.redcross.org/take-a-class/cpr",
    keywords: ["infant cpr", "baby cpr", "cpr infant", "baby not breathing", "newborn cpr"],
    content: `Infant CPR (under 1 year):
1. Check responsiveness by flicking foot — call 911 if no response.
2. Place infant on firm flat surface on their back.
3. Tilt head back gently (neutral position — not as far as adults).
4. Use 2 fingers on center of chest just below nipple line.
5. Push down about 1.5 inches, 100-120 times per minute.
6. If trained: cover infant's mouth AND nose with your mouth, give 2 small gentle breaths.
7. Continue 30:2 until help arrives.
Never shake an infant — even in an emergency.`
  },
  {
    id: "heart-001",
    topic: "Heart attack",
    source: "Mayo Clinic",
    sourceUrl: "https://www.mayoclinic.org/diseases-conditions/heart-attack/symptoms-causes/syc-20373106",
    keywords: ["heart attack", "chest pain", "chest tightness", "cardiac", "arm pain", "jaw pain", "myocardial infarction"],
    content: `EMERGENCY — Signs of a heart attack:
- Chest pain, pressure, tightness, squeezing (may spread to arm, neck, jaw)
- Shortness of breath
- Cold sweat, nausea, lightheadedness
- Pain in left arm, shoulder, neck, back, or jaw
CALL 911 IMMEDIATELY — do not drive yourself.
While waiting for help:
1. Sit or lie in a comfortable position.
2. Loosen tight clothing.
3. If not allergic and conscious: give aspirin (325mg) to chew slowly.
4. Be ready to perform CPR if they become unresponsive.
5. Do NOT leave them alone.`
  },
  {
    id: "aed-001",
    topic: "AED - How to use a defibrillator",
    source: "Red Cross",
    sourceUrl: "https://www.redcross.org/take-a-class/aed",
    keywords: ["aed", "defibrillator", "automated defibrillator", "shock heart", "aed use"],
    content: `How to use an AED (Automated External Defibrillator):
1. Turn on the AED — it will give voice instructions.
2. Expose the person's bare chest — cut clothing if necessary.
3. Dry the chest if wet.
4. Attach pads: one below right collarbone, one on left side below armpit.
5. Plug in the connector if required.
6. Let AED analyze — make sure nobody is touching the person.
7. If shock advised: shout "Clear!", ensure nobody is touching, press shock button.
8. Immediately resume CPR starting with compressions.
9. Follow AED prompts every 2 minutes.
Use pediatric pads for children under 8 if available. AEDs are designed for non-medical people — follow the voice instructions.`
  },

  // ─── BONE & MUSCLE ──────────────────────────────────────────────
  {
    id: "fracture-001",
    topic: "Fractures and broken bones",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/broken-arm-or-wrist/",
    keywords: ["broken bone", "fracture", "broken arm", "broken leg", "broken wrist", "crack bone"],
    content: `For a suspected fracture or broken bone:
1. Call 911 for serious fractures or if bone is visible.
2. Do NOT try to straighten the bone.
3. Immobilize the injured area in the position you found it.
4. Apply a splint if available: pad well, secure above and below the injury.
5. Apply an ice pack wrapped in cloth to reduce swelling (20 min on, 20 off).
6. Elevate the injured limb if possible.
7. Watch for shock: pale, cold, clammy skin, rapid breathing.
Call 911 immediately if: bone is visible, limb is deformed, severe swelling, numbness/tingling, or suspected spine/hip/pelvis fracture.`
  },
  {
    id: "sprain-001",
    topic: "Sprains and strains",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/sprains-and-strains/",
    keywords: ["sprain", "strain", "twisted ankle", "pulled muscle", "rolled ankle", "ligament"],
    content: `For sprains and strains — use RICE method:
R — Rest: Stop activity, avoid putting weight on injured area.
I — Ice: Apply ice pack wrapped in cloth for 20 minutes every 2-3 hours for first 48 hours.
C — Compression: Wrap with bandage firmly but not too tight — check circulation.
E — Elevate: Keep injured area raised above heart level as much as possible.
Also:
- Take ibuprofen to reduce pain and swelling.
- Avoid HARM for 72 hours: Heat, Alcohol, Running, Massage.
Seek medical care if: cannot bear weight, severe swelling or bruising, numbness, or no improvement in 2-3 days.`
  },
  {
    id: "dislocation-001",
    topic: "Dislocation",
    source: "Mayo Clinic",
    sourceUrl: "https://www.mayoclinic.org/diseases-conditions/dislocations/symptoms-causes/syc-20371715",
    keywords: ["dislocation", "dislocated shoulder", "dislocated joint", "joint out of place", "popped joint"],
    content: `For a suspected joint dislocation:
1. Do NOT try to push the joint back in — you can cause nerve/blood vessel damage.
2. Immobilize the joint in the position it's in using a splint or sling.
3. Apply ice wrapped in cloth to reduce swelling and pain.
4. Go to emergency room immediately.
5. Do NOT move the joint unnecessarily.
6. Watch for numbness, tingling, or loss of circulation below the injury.
Dislocations must be treated by a medical professional — attempting to relocate yourself can cause serious damage.`
  },
  {
    id: "spine-001",
    topic: "Spinal injury",
    source: "Red Cross",
    sourceUrl: "https://www.redcross.org/take-a-class/resources/learn-first-aid/head-neck-and-back-injuries",
    keywords: ["spinal injury", "neck injury", "back injury", "spine", "paralysis risk", "do not move"],
    content: `For suspected spinal injury:
1. Call 911 immediately — do NOT move the person.
2. Tell them to stay completely still.
3. If they must be moved (fire, drowning), support the head and neck and keep spine aligned.
4. Do NOT bend, twist, or flex the neck or back.
5. If person is wearing a helmet, do NOT remove it.
6. Monitor breathing — if not breathing, carefully tilt head (airway takes priority over spinal concerns in cardiac arrest).
Suspect spinal injury if: fall from height, vehicle accident, diving injury, direct blow to spine, or person reports neck/back pain with tingling or weakness in limbs.`
  },

  // ─── HEAD INJURIES ──────────────────────────────────────────────
  {
    id: "head-001",
    topic: "Concussion",
    source: "Mayo Clinic",
    sourceUrl: "https://www.mayoclinic.org/diseases-conditions/concussion/symptoms-causes/syc-20355594",
    keywords: ["concussion", "head injury", "hit on head", "head trauma", "brain injury", "knocked head"],
    content: `Signs of a concussion: headache, confusion, dizziness, nausea, vomiting, memory loss, blurred vision, sensitivity to light or noise.
Immediate steps:
1. Have person stop all activity and rest.
2. Apply ice to any external swelling.
3. Do NOT give aspirin or ibuprofen (may increase bleeding) — paracetamol is safer.
4. Do NOT leave them alone for the first few hours.
Call 911 immediately if: unconsciousness, repeated vomiting, seizure, one pupil larger than other, severe headache, slurred speech, or weakness in limbs.
Rest is the primary treatment — avoid screens, physical exertion, and alcohol until cleared by a doctor.`
  },
  {
    id: "head-002",
    topic: "Skull fracture",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/skull-fractures/",
    keywords: ["skull fracture", "cracked skull", "head fracture", "skull injury", "depressed skull"],
    content: `Signs of skull fracture: severe headache, unconsciousness, clear fluid from nose or ears, bruising behind ears or around eyes, unequal pupils, slurred speech, seizures.
1. Call 911 immediately.
2. Keep person still — suspect spinal injury too.
3. Do NOT apply direct pressure to the wound.
4. Cover wound loosely with sterile gauze — do NOT remove any embedded objects.
5. Control bleeding from nearby scalp wounds with pressure, avoiding the fracture site.
6. If vomiting, carefully turn on side maintaining head/neck alignment.
7. Monitor breathing and be ready for CPR.`
  },

  // ─── TEMPERATURE EMERGENCIES ────────────────────────────────────
  {
    id: "heat-001",
    topic: "Heat stroke and heat exhaustion",
    source: "Mayo Clinic",
    sourceUrl: "https://www.mayoclinic.org/diseases-conditions/heat-stroke/symptoms-causes/syc-20353581",
    keywords: ["heat stroke", "heat exhaustion", "overheating", "sunstroke", "hot weather", "hyperthermia"],
    content: `Heat exhaustion (heavy sweating, weakness, cold/pale/clammy skin, nausea):
1. Move to a cool place immediately.
2. Loosen clothing, apply cool wet cloths.
3. Sip cool water slowly if conscious.
4. Lie down with legs elevated.

Heat stroke — EMERGENCY (body temp above 103°F/39.4°C, hot/red/dry skin, confusion, unconsciousness):
1. CALL 911 immediately.
2. Move to cool area. Cool rapidly: cold water immersion, ice packs on neck/armpits/groin, wet sheets.
3. Do NOT give fluids to unconscious person.
4. Continue cooling until help arrives.`
  },
  {
    id: "hypothermia-001",
    topic: "Hypothermia",
    source: "Mayo Clinic",
    sourceUrl: "https://www.mayoclinic.org/diseases-conditions/hypothermia/symptoms-causes/syc-20352682",
    keywords: ["hypothermia", "too cold", "freezing", "cold exposure", "low body temperature", "shivering"],
    content: `For hypothermia (body temperature dangerously low):
Signs: intense shivering, slurred speech, slow breathing, weak pulse, clumsiness, confusion, in severe cases — no shivering (very dangerous).
1. Call 911 for moderate to severe hypothermia.
2. Move person to a warm, dry place.
3. Remove wet clothing.
4. Cover with blankets including head — leave face uncovered.
5. Apply warm compresses to neck, armpits, and groin — NOT hot water bottles directly on skin.
6. Give warm (not hot) beverages if conscious and alert.
7. Do NOT rub or massage limbs — can trigger cardiac arrest.
8. Handle gently — cold heart is prone to irregular rhythm.`
  },
  {
    id: "frostbite-001",
    topic: "Frostbite",
    source: "Mayo Clinic",
    sourceUrl: "https://www.mayoclinic.org/diseases-conditions/frostbite/symptoms-causes/syc-20372656",
    keywords: ["frostbite", "frozen skin", "frost bite", "frozen fingers", "frozen toes", "cold injury"],
    content: `For frostbite (skin appears white/gray, hard, numb):
1. Get to a warm environment.
2. Remove wet clothing and jewelry from affected area.
3. Do NOT walk on frostbitten feet if avoidable.
4. Do NOT rub frostbitten skin — causes further damage.
5. Do NOT use direct heat (fire, heating pad, hot water) — causes burns.
6. Rewarm ONLY if there is no risk of refreezing — immerse in warm water (99-104°F / 37-40°C) for 20-30 minutes.
7. The area will become red and painful during rewarming — this is normal.
8. Cover with loose sterile bandage. Keep toes/fingers separated with gauze.
Seek medical care for anything beyond very mild frostbite.`
  },

  // ─── POISONING & OVERDOSE ────────────────────────────────────────
  {
    id: "poison-001",
    topic: "Poisoning - swallowed substance",
    source: "CDC",
    sourceUrl: "https://www.cdc.gov/niosh/topics/emres/chemagent.html",
    keywords: ["poisoning", "swallowed poison", "toxic", "ingested chemicals", "swallowed bleach"],
    content: `For swallowed poison:
1. Call Poison Control immediately: 1-800-222-1222 (US).
2. Call 911 if: person is unconscious, not breathing, or having seizures.
3. Do NOT induce vomiting unless specifically instructed by Poison Control.
4. Have the container or substance name ready.
5. Do NOT give food or drink unless instructed.
6. If person vomits, turn on their side to prevent choking.
7. Collect any vomited material for medical staff.
Keep Poison Control saved: 1-800-222-1222`
  },
  {
    id: "co-001",
    topic: "Carbon monoxide poisoning",
    source: "CDC",
    sourceUrl: "https://www.cdc.gov/co/faqs.htm",
    keywords: ["carbon monoxide", "co poisoning", "gas poisoning", "smoke inhalation", "generator fumes"],
    content: `EMERGENCY — Carbon monoxide poisoning:
Signs: headache, dizziness, weakness, nausea, confusion, chest pain (CO is odorless — you may not smell it).
1. Get everyone out of the building immediately — do NOT re-enter.
2. Call 911 from outside.
3. Do NOT go back in for pets or belongings.
4. If person is unconscious outside, begin CPR if not breathing.
5. Everyone exposed needs medical evaluation even if feeling okay — CO binds to blood for hours.
6. Do NOT use generators, grills, or gas-powered tools indoors or in garages.`
  },
  {
    id: "overdose-001",
    topic: "Drug overdose",
    source: "CDC",
    sourceUrl: "https://www.cdc.gov/drugoverdose/index.html",
    keywords: ["overdose", "drug overdose", "opioid overdose", "unconscious drugs", "narcan", "naloxone"],
    content: `For a suspected drug overdose:
1. Call 911 immediately — do not wait to see if it gets better.
2. Do NOT leave the person alone.
3. Check for breathing — if not breathing, begin CPR.
4. If opioid overdose is suspected and naloxone (Narcan) is available: administer as directed (nasal spray or injection). Repeat every 2-3 minutes if no response.
5. If breathing but unconscious, place in recovery position (on their side).
6. Do NOT give coffee, water, or try to walk them around.
7. Do NOT leave them to "sleep it off."
8. Collect any substances or containers for emergency responders.
Signs of opioid overdose: blue lips, slow/stopped breathing, unresponsive, pinpoint pupils.`
  },
  {
    id: "alcohol-001",
    topic: "Alcohol poisoning",
    source: "Mayo Clinic",
    sourceUrl: "https://www.mayoclinic.org/diseases-conditions/alcohol-poisoning/symptoms-causes/syc-20354386",
    keywords: ["alcohol poisoning", "drunk unconscious", "too much alcohol", "alcohol overdose", "ethanol poisoning"],
    content: `For alcohol poisoning:
Signs: confusion, vomiting, seizures, slow/irregular breathing, blue-tinged or pale skin, unconsciousness.
1. Call 911 immediately — alcohol poisoning can be fatal.
2. Do NOT leave them alone — they can choke on vomit.
3. Keep them sitting up or on their side (recovery position) to prevent choking.
4. Do NOT give coffee, water, or food.
5. Do NOT let them "sleep it off" if showing danger signs.
6. Keep them warm with a blanket.
7. If not breathing, begin CPR.
You cannot speed up how quickly the body processes alcohol — medical care is the only treatment.`
  },

  // ─── BITES & STINGS ──────────────────────────────────────────────
  {
    id: "sting-001",
    topic: "Insect sting (bee, wasp)",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/insect-bites-and-stings/",
    keywords: ["bee sting", "wasp sting", "insect sting", "hornet sting", "stung"],
    content: `For an insect sting:
1. Remove the stinger if visible: scrape out with a card edge or fingernail — do NOT squeeze with tweezers (injects more venom).
2. Wash the area with soap and water.
3. Apply cold compress for 10 minutes to reduce swelling.
4. Take antihistamine (Benadryl) to reduce itching and swelling.
5. Apply hydrocortisone cream if available.
6. Avoid scratching — can cause infection.
Call 911 immediately for signs of severe allergic reaction (anaphylaxis): throat swelling, difficulty breathing, dizziness, hives spreading rapidly.`
  },
  {
    id: "snakebite-001",
    topic: "Snake bite",
    source: "Red Cross",
    sourceUrl: "https://www.redcross.org/take-a-class/resources/learn-first-aid/bites-and-stings",
    keywords: ["snake bite", "snakebite", "snake", "venomous snake", "bitten by snake"],
    content: `For a snake bite:
1. Call 911 or Poison Control immediately: 1-800-222-1222.
2. Get away from the snake — do NOT try to catch or kill it (take a photo from a safe distance if possible).
3. Keep the person calm and still — movement speeds venom absorption.
4. Keep the bitten limb below heart level.
5. Remove tight clothing, watches, rings near the bite before swelling starts.
6. Mark the edge of swelling with a pen and note the time.
Do NOT: cut and suck the venom, apply ice, use tourniquet, give aspirin or ibuprofen. These cause more harm.
Note the snake's appearance for the hospital — it helps identify the right antivenom.`
  },
  {
    id: "animalbite-001",
    topic: "Animal bite",
    source: "Mayo Clinic",
    sourceUrl: "https://www.mayoclinic.org/first-aid/first-aid-animal-bites/basics/art-20056591",
    keywords: ["animal bite", "dog bite", "cat bite", "bite wound", "rabies", "bitten by animal"],
    content: `For an animal bite:
1. If bleeding heavily, apply firm pressure with clean cloth.
2. Wash the wound thoroughly with soap and water for at least 5 minutes.
3. Apply antibiotic cream and cover with a clean bandage.
4. Seek medical care — animal bites carry high infection risk and may need antibiotics or rabies evaluation.
5. Report the bite to local animal control especially if the animal was wild or acting strangely.
Call 911 or go to ER if: bite is deep, on face/neck/hands, involves a wild animal, or bleeding won't stop.
Rabies concern: bites from bats, raccoons, foxes, or unknown dogs/cats require urgent medical evaluation.`
  },
  {
    id: "tickbite-001",
    topic: "Tick bite",
    source: "CDC",
    sourceUrl: "https://www.cdc.gov/ticks/removing_a_tick.html",
    keywords: ["tick bite", "tick removal", "lyme disease", "tick", "deer tick"],
    content: `For a tick bite:
1. Use fine-tipped tweezers to grasp tick as close to skin as possible.
2. Pull upward with steady, even pressure — do NOT twist or jerk.
3. Do NOT crush the tick with fingers.
4. After removal, clean bite area with rubbing alcohol or soap and water.
5. Dispose of tick in sealed bag, flush down toilet, or in alcohol — do NOT crush with bare fingers.
6. Monitor the site for 30 days.
Seek medical care if: rash develops (especially bull's-eye rash), flu-like symptoms, fever, fatigue, or joint pain appear within weeks. These may indicate Lyme disease or other tick-borne illnesses.
Do NOT: apply petroleum jelly, nail polish, or heat to the tick.`
  },
  {
    id: "spiderbite-001",
    topic: "Spider bite",
    source: "Mayo Clinic",
    sourceUrl: "https://www.mayoclinic.org/diseases-conditions/spider-bites/symptoms-causes/syc-20377190",
    keywords: ["spider bite", "black widow", "brown recluse", "spider", "bitten by spider"],
    content: `For most spider bites:
1. Wash with soap and water.
2. Apply cold compress to reduce swelling and pain.
3. Elevate the bitten area.
4. Take over-the-counter pain medication if needed.
Call Poison Control (1-800-222-1222) or 911 for bites from black widow or brown recluse.
Black widow signs: muscle cramps and pain spreading from bite, sweating, fever, chills, nausea within hours.
Brown recluse signs: growing skin ulcer at bite site, fever, chills, body aches within hours to days.
Try to identify/photograph the spider for medical staff if it can be done safely.`
  },

  // ─── ALLERGIC REACTIONS ──────────────────────────────────────────
  {
    id: "allergy-001",
    topic: "Anaphylaxis - severe allergic reaction",
    source: "Mayo Clinic",
    sourceUrl: "https://www.mayoclinic.org/diseases-conditions/anaphylaxis/symptoms-causes/syc-20351468",
    keywords: ["allergic reaction", "anaphylaxis", "epipen", "allergy attack", "throat swelling", "bee allergy", "food allergy severe"],
    content: `EMERGENCY — Severe allergic reaction (anaphylaxis):
Signs: hives, throat/tongue swelling, difficulty breathing, rapid heartbeat, drop in blood pressure, dizziness, nausea.
1. CALL 911 immediately.
2. Use epinephrine auto-injector (EpiPen) if available — inject into outer thigh.
3. Have person lie down with legs elevated (unless breathing is difficult — then sit upright).
4. A second EpiPen dose can be given after 5-15 minutes if no improvement.
5. Even if symptoms improve, go to hospital — reactions can return hours later.
6. If person stops breathing, begin CPR.
Do NOT give antihistamines alone — they are too slow for anaphylaxis. EpiPen first, antihistamines are supplementary only.`
  },

  // ─── DIABETIC & SEIZURE ──────────────────────────────────────────
  {
    id: "diabetic-001",
    topic: "Low blood sugar - hypoglycemia",
    source: "Mayo Clinic",
    sourceUrl: "https://www.mayoclinic.org/diseases-conditions/hypoglycemia/symptoms-causes/syc-20373685",
    keywords: ["low blood sugar", "hypoglycemia", "diabetes emergency", "sugar crash", "diabetic shaking", "insulin reaction"],
    content: `For low blood sugar (hypoglycemia):
Signs: shakiness, sweating, confusion, pale skin, fast heartbeat, sudden hunger, irritability.
If conscious and can swallow:
1. Give 15-20g of fast-acting sugar: 4 glucose tablets, 4oz orange juice, or regular soda.
2. Wait 15 minutes and recheck symptoms.
3. If improved, give a small snack (crackers, cheese).
4. If no improvement, repeat sugar intake.
If unconscious or unable to swallow:
1. Call 911 immediately.
2. Do NOT give anything by mouth.
3. If glucagon kit available and trained, administer it.`
  },
  {
    id: "diabetic-002",
    topic: "High blood sugar - hyperglycemia",
    source: "Mayo Clinic",
    sourceUrl: "https://www.mayoclinic.org/diseases-conditions/hyperglycemia/symptoms-causes/syc-20373631",
    keywords: ["high blood sugar", "hyperglycemia", "diabetic ketoacidosis", "too much sugar", "diabetic crisis"],
    content: `For high blood sugar (hyperglycemia):
Signs: frequent urination, increased thirst, blurred vision, headache, fatigue, fruity-smelling breath (severe).
For mild hyperglycemia:
1. Have the person drink water.
2. Encourage light activity if not feeling ill.
3. Check blood sugar if meter available.
4. Take prescribed medication if available.
Call 911 if: blood sugar is very high (above 300 mg/dL), person is vomiting, has fruity breath, is confused, or losing consciousness — this may indicate diabetic ketoacidosis (DKA), which is life-threatening.`
  },
  {
    id: "seizure-001",
    topic: "Seizure",
    source: "Mayo Clinic",
    sourceUrl: "https://www.mayoclinic.org/diseases-conditions/seizure/symptoms-causes/syc-20365711",
    keywords: ["seizure", "epilepsy", "convulsion", "fit", "epileptic", "shaking uncontrollably"],
    content: `During a seizure:
1. Stay calm. Time the seizure.
2. Clear hard or sharp objects away from the person.
3. Cushion their head with something soft.
4. Gently roll them onto their side (recovery position) to keep airway clear.
5. Do NOT hold them down or restrain movement.
6. Do NOT put anything in their mouth — you cannot swallow your tongue.
7. Stay with them until fully conscious.
After the seizure: person will be confused and tired — stay and reassure.
Call 911 if: seizure lasts more than 5 minutes, person doesn't regain consciousness, has another seizure, is injured, pregnant, diabetic, or it is their first seizure.`
  },

  // ─── STROKE ─────────────────────────────────────────────────────
  {
    id: "stroke-001",
    topic: "Stroke - FAST method",
    source: "CDC",
    sourceUrl: "https://www.cdc.gov/stroke/signs_symptoms.htm",
    keywords: ["stroke", "face drooping", "arm weakness", "speech", "FAST", "brain attack", "stroke symptoms"],
    content: `EMERGENCY — Recognize a stroke using FAST:
F — Face drooping: Ask them to smile. Is one side drooping?
A — Arm weakness: Ask them to raise both arms. Does one drift down?
S — Speech difficulty: Ask to repeat a phrase. Is speech slurred or strange?
T — Time to call 911 immediately if ANY of these signs appear.
While waiting:
1. Do NOT give food, water, or medication.
2. If unconscious and breathing, place in recovery position (on side).
3. If not breathing, begin CPR.
4. Note the time symptoms started — doctors need this.
5. Keep them calm and do NOT let them "sleep it off."`
  },

  // ─── MENTAL HEALTH EMERGENCIES ──────────────────────────────────
  {
    id: "panic-001",
    topic: "Panic attack",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/mental-health/conditions/panic-disorder/",
    keywords: ["panic attack", "anxiety attack", "panic", "hyperventilating", "heart racing anxiety", "cant breathe anxiety"],
    content: `For a panic attack:
A panic attack is very frightening but not physically dangerous. It usually peaks within 10 minutes.
1. Stay with the person and stay calm yourself.
2. Speak in a slow, calm voice: "You are safe. This will pass."
3. Encourage slow, controlled breathing: breathe in for 4 counts, hold 2, out for 6.
4. Do NOT tell them to "just calm down" or dismiss their feelings.
5. Move to a quieter space if possible.
6. Do NOT have them breathe into a paper bag — this is outdated and can be harmful.
7. After it passes, encourage them to speak with a doctor if recurring.
Call 911 if: this is their first episode, you are unsure if it is a panic attack, or symptoms include chest pain, numbness, or difficulty breathing that does not improve.`
  },
  {
    id: "hyperventilation-001",
    topic: "Hyperventilation",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/hyperventilation/",
    keywords: ["hyperventilation", "breathing too fast", "overbreathing", "tingling hands", "dizzy breathing"],
    content: `For hyperventilation (breathing too fast):
Signs: rapid breathing, dizziness, tingling in hands/lips, chest tightness, lightheadedness.
1. Stay calm and reassure the person — anxiety worsens it.
2. Ask them to breathe slowly — in through nose for 4 counts, out through mouth for 6 counts.
3. Encourage them to breathe with you — model the pace.
4. Encourage them to sit or lie down.
5. Remove from any stressful trigger if possible.
Do NOT use a paper bag — it can lower oxygen dangerously.
Seek medical attention if: hyperventilation doesn't resolve, is associated with chest pain, or is a new symptom — it can occasionally signal a medical problem.`
  },

  // ─── EAR & NOSE ─────────────────────────────────────────────────
  {
    id: "ear-001",
    topic: "Object in ear",
    source: "Mayo Clinic",
    sourceUrl: "https://www.mayoclinic.org/first-aid/first-aid-foreign-object-in-ear/basics/art-20056709",
    keywords: ["object in ear", "something in ear", "foreign body ear", "stuck in ear", "insect in ear"],
    content: `For an object in the ear:
1. Do NOT probe with a cotton swab, finger, or tool — can push it deeper.
2. If object is visible and easy to grasp with fingers, carefully remove it.
3. Tilt head to the affected side — gravity may help dislodge it.
4. For a live insect: tilt ear upward and pour a small amount of warm (not hot) mineral oil or olive oil in to suffocate it. Do NOT do this if ear tubes are present or eardrum may be damaged.
5. Seek medical care if object cannot be removed — ENT can remove safely.
Go to ER if: object is deeply embedded, pain is severe, any loss of hearing, or signs of infection.`
  },

  // ─── CHILDBIRTH EMERGENCY ────────────────────────────────────────
  {
    id: "birth-001",
    topic: "Emergency childbirth",
    source: "Red Cross",
    sourceUrl: "https://www.redcross.org/take-a-class/resources/learn-first-aid/childbirth",
    keywords: ["emergency birth", "delivering baby", "baby coming", "childbirth", "labor emergency", "baby being born"],
    content: `For emergency childbirth when medical help is unavailable:
1. Call 911 immediately — keep them on the line for guidance.
2. Help the mother lie down somewhere clean.
3. Do NOT try to stop or delay delivery.
4. Encourage the mother to breathe through contractions and push when she feels the urge.
5. When baby's head appears, support it gently — do NOT pull.
6. After delivery, keep baby warm — dry and wrap in clean cloth immediately.
7. Keep baby at the level of the mother until cord stops pulsing.
8. Do NOT cut the cord unless instructed by 911 — and only with clean sharp instrument.
9. Deliver placenta by having mother push gently — expect 5-30 minutes after birth.
10. Encourage skin-to-skin contact and breastfeeding to help mother's uterus contract.`
  },

  // ─── RECOVERY POSITION ───────────────────────────────────────────
  {
    id: "recovery-001",
    topic: "Recovery position",
    source: "Red Cross",
    sourceUrl: "https://www.redcross.org/take-a-class/resources/learn-first-aid",
    keywords: ["recovery position", "unconscious breathing", "coma position", "side position", "unconscious first aid"],
    content: `The recovery position is for someone unconscious but breathing:
1. Kneel beside the person.
2. Place the arm nearest to you at a right angle to their body, elbow bent, palm facing up.
3. Bring their far arm across their chest and hold the back of their hand against their near cheek.
4. With your other hand, pull up their far knee so the foot is flat on the floor.
5. Keeping their hand against cheek, pull on the bent knee to roll them toward you onto their side.
6. Adjust top knee so hip and knee are at right angles.
7. Tilt head back slightly to keep airway open.
8. Monitor breathing until help arrives.
Use this whenever someone is unconscious but breathing — it prevents choking on vomit.`
  },

  // ─── GENERAL ────────────────────────────────────────────────────
  {
    id: "shock-001",
    topic: "Shock",
    source: "Red Cross",
    sourceUrl: "https://www.redcross.org/take-a-class/resources/learn-first-aid/shock",
    keywords: ["shock", "medical shock", "pale skin", "cold clammy", "rapid pulse", "fainting", "low blood pressure"],
    content: `For medical shock (not emotional shock):
Signs: pale, cold, clammy skin; rapid weak pulse; rapid shallow breathing; dizziness; confusion; nausea; blue lips.
1. Call 911 immediately.
2. Lay the person down on their back.
3. Elevate legs about 12 inches (unless head, neck, spine, or leg injury suspected).
4. Keep person warm with a blanket.
5. Do NOT give anything to eat or drink.
6. Loosen tight clothing.
7. If vomiting or unconscious, place in recovery position.
8. Monitor breathing — begin CPR if needed.
Causes include severe bleeding, allergic reaction, heart attack, infection, or dehydration. Treating the cause is critical.`
  },
  {
    id: "faint-001",
    topic: "Fainting",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/fainting/",
    keywords: ["fainting", "fainted", "passed out", "blacked out", "syncope", "collapsed", "fell unconscious"],
    content: `For fainting:
If someone feels faint:
1. Help them lie down and raise their legs 12 inches above heart level.
2. Loosen tight clothing around neck and waist.
3. Ensure fresh air — open windows, fan them.
After fainting:
1. Check for breathing — if not breathing, begin CPR.
2. If breathing, place in recovery position.
3. Raise legs above heart level.
4. Loosen tight clothing.
5. Do NOT give water until fully conscious.
6. Stay with them — most recover within a minute.
Seek medical care if: doesn't recover within 1-2 minutes, faints repeatedly, was injured in the fall, is pregnant, or has heart disease.`
  },
  {
    id: "blister-001",
    topic: "Blisters",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/blisters/",
    keywords: ["blister", "blisters", "fluid bubble skin", "rubbing blister", "friction blister"],
    content: `For blisters:
1. Do NOT pop the blister if possible — the skin protects against infection.
2. Cover with a padded bandage or blister plaster.
3. Wear comfortable footwear to reduce friction.
If a blister bursts on its own:
1. Do NOT remove the skin flap.
2. Clean gently with mild soap and water.
3. Apply antibiotic ointment.
4. Cover with a bandage.
5. Change bandage daily and watch for infection.
Seek medical care if: signs of infection (increasing pain, redness, swelling, pus, warmth), fever, or blisters in unusual places (not related to friction).`
  },
  {
    id: "splinter-001",
    topic: "Splinter removal",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/wounds-and-injuries/splinters/",
    keywords: ["splinter", "wood splinter", "splinter in skin", "remove splinter", "thorn in skin"],
    content: `To remove a splinter:
1. Wash hands and clean the area with soap and water.
2. Sterilize tweezers and a needle with rubbing alcohol.
3. If the splinter is sticking out: grip firmly with tweezers as close to the skin as possible and pull out at the same angle it entered.
4. If the splinter is under the skin: use the needle to gently break the skin at one end to expose the splinter, then remove with tweezers.
5. Clean the area again after removal. Apply antibiotic ointment and cover with a bandage.
Seek medical care if: splinter is deep, in the eye or near a joint, glass or metal, or shows signs of infection (redness, swelling, pus).`
  },
  // ─── COMMON ILLNESSES ────────────────────────────────────────────
  {
    id: "cold-001",
    topic: "Common cold",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/common-cold/",
    keywords: ["cold", "common cold", "runny nose", "sore throat", "sneezing", "congestion", "cough cold"],
    content: `For the common cold:
Symptoms: runny or blocked nose, sore throat, sneezing, cough, mild fever, headache, muscle aches.
There is no cure — treatment focuses on relieving symptoms:
1. Rest as much as possible.
2. Stay hydrated — drink plenty of water, warm drinks, and clear broths.
3. Gargle warm salt water for sore throat relief.
4. Use saline nasal drops or spray to relieve congestion.
5. Take paracetamol or ibuprofen to reduce fever and relieve aches.
6. Use decongestant nasal sprays for short-term relief (max 3 days).
7. Honey and lemon in warm water can soothe sore throat (not for children under 1).
Colds usually resolve in 7-10 days. Antibiotics do NOT work for colds — they are caused by viruses.
See a doctor if: symptoms worsen after 3 weeks, high fever, chest pain, or difficulty breathing.`
  },
  {
    id: "flu-001",
    topic: "Flu (Influenza)",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/flu/",
    keywords: ["flu", "influenza", "fever", "body ache", "chills", "fatigue flu", "high temperature flu"],
    content: `For flu (influenza):
Symptoms: sudden high fever (above 38°C/100.4°F), chills, severe muscle aches, headache, extreme fatigue, dry cough, sore throat, runny nose.
Flu comes on suddenly and feels much worse than a cold.
1. Rest at home and avoid contact with others to prevent spreading.
2. Drink plenty of fluids to stay hydrated.
3. Take paracetamol or ibuprofen to reduce fever and relieve aches.
4. Eat light, easily digestible foods.
5. Keep warm.
Most people recover in 1-2 weeks without medical treatment.
See a doctor immediately if: difficulty breathing, chest pain, confusion, severe vomiting, symptoms improve then return with fever and worsening cough, or if in a high-risk group (elderly, pregnant, young children, chronic illness).`
  },
  {
    id: "fever-001",
    topic: "Fever in adults",
    source: "Mayo Clinic",
    sourceUrl: "https://www.mayoclinic.org/diseases-conditions/fever/symptoms-causes/syc-20352759",
    keywords: ["fever", "high temperature", "temperature", "high fever adult", "38 degrees", "39 degrees"],
    content: `For fever in adults (temperature above 38°C / 100.4°F):
Mild to moderate fever (38-39°C):
1. Rest and drink plenty of fluids — water, juice, broth.
2. Take paracetamol or ibuprofen as directed to reduce fever.
3. Apply a cool damp cloth to forehead, wrists, and neck.
4. Wear light clothing and use a light blanket.
5. Keep the room cool and well ventilated.
6. Do NOT use cold baths or ice — can cause shivering which raises temperature.
Seek medical care if: fever above 39.4°C (103°F), fever lasts more than 3 days, severe headache, stiff neck, rash, confusion, difficulty breathing, or chest pain.
Call 911 if: fever with stiff neck and rash (could be meningitis), confusion, or seizures.`
  },
  {
    id: "fever-002",
    topic: "Fever in children",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/fever-in-children/",
    keywords: ["child fever", "baby fever", "fever child", "high temperature child", "infant fever", "toddler fever"],
    content: `For fever in children:
Normal temperature: 36-36.8°C. Fever: 38°C (100.4°F) or above.
1. Give paracetamol or ibuprofen (follow age/weight dosing on packaging).
2. Do NOT give aspirin to children under 16.
3. Offer plenty of cold fluids — water, diluted juice, breast milk.
4. Dress in light clothing — do NOT bundle up.
5. Keep room comfortably cool.
6. Cool damp cloth on forehead if child is comfortable with it.
7. Check on child regularly through the night.
Call 999/911 immediately if child: is under 3 months with fever above 38°C, under 6 months above 39°C, has a febrile seizure, has a purple/red rash that doesn't fade when pressed, is difficult to wake, has stiff neck, or is having difficulty breathing.`
  },
  {
    id: "stomach-001",
    topic: "Stomach ache and abdominal pain",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/stomach-ache/",
   keywords: ["stomach ache", "stomach pain", "abdominal pain", "tummy ache", "belly pain", "cramps stomach", "nausea", "stomach cramps", "stomach discomfort"],
    content: `For stomach ache and abdominal pain:
For mild stomach ache:
1. Rest and avoid solid food for a few hours.
2. Sip clear fluids — water, diluted squash, or clear broth.
3. Apply a warm heat pad or hot water bottle to the abdomen.
4. Take paracetamol for pain (avoid ibuprofen and aspirin — can irritate stomach).
5. Slowly reintroduce bland foods: toast, rice, bananas, crackers.
6. Avoid dairy, fatty, or spicy foods until recovered.
Seek medical care if: pain is severe or getting worse, lasts more than a few hours, pain in lower right abdomen (could be appendicitis), accompanied by high fever, or blood in stool or vomit.
Call 911 if: sudden severe abdominal pain, rigid/hard abdomen, or pain with signs of shock.`
  },
  {
    id: "vomiting-001",
    topic: "Vomiting and nausea",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/vomiting-adults/",
   keywords: ["vomiting", "nausea", "feeling sick", "throwing up", "queasy", "gastroenteritis", "nauseous", "sick stomach", "how to treat nausea", "nausea treatment", "upset stomach"],
    content: `For vomiting and nausea:
1. Stop eating solid food temporarily.
2. Sip small amounts of clear fluid every 5-10 minutes — water, diluted juice, oral rehydration solution.
3. Rest in a comfortable position — lying on your side reduces choking risk.
4. Gradually reintroduce bland foods after vomiting stops: crackers, toast, rice.
5. Avoid dairy, alcohol, caffeine, fatty or spicy foods.
6. Take anti-nausea medication if available (follow instructions).
For dehydration signs: dry mouth, dark urine, dizziness — increase fluid intake.
Seek medical care if: vomiting blood or dark material, vomiting lasts more than 2 days, signs of severe dehydration, severe abdominal pain, or head injury preceded vomiting.`
  },
  {
    id: "headache-001",
    topic: "Headache",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/headaches/",
    keywords: ["headache", "head pain", "migraine", "tension headache", "head ache", "throbbing head"],
    content: `For a headache:
1. Take paracetamol or ibuprofen at the first sign of headache — follow dosing instructions.
2. Rest in a quiet, dark room if sensitive to light or sound.
3. Apply a cold or warm compress to forehead or neck.
4. Stay hydrated — dehydration is a common cause.
5. Massage temples and neck gently.
6. Avoid screens if they worsen the pain.
7. Sleep if possible.
For tension headaches: neck and shoulder stretches help.
For migraines: lie in a dark quiet room, use prescribed medication if available.
Seek medical care immediately if headache: is sudden and severe ("thunderclap"), follows a head injury, comes with fever and stiff neck, with vision changes, weakness, confusion, or is the worst headache of your life — this could indicate a serious condition.`
  },
  {
    id: "diarrhea-001",
    topic: "Diarrhea",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/diarrhoea-and-vomiting/",
    keywords: ["diarrhea", "diarrhoea", "loose stools", "watery stool", "stomach bug", "gastroenteritis"],
    content: `For diarrhea:
1. Stay hydrated — this is the most important step. Drink water, clear broth, or oral rehydration solution (ORS).
2. Drink small amounts frequently rather than large amounts at once.
3. Eat bland foods when able: bananas, rice, applesauce, toast (BRAT diet).
4. Avoid dairy, fatty foods, high-fiber foods, caffeine, and alcohol.
5. Wash hands thoroughly after every bathroom visit.
6. Take over-the-counter loperamide (Imodium) for short-term relief in adults.
Seek medical care if: diarrhea lasts more than 2 days in adults (24 hours in children), blood or mucus in stool, high fever, signs of dehydration (dry mouth, no urination, dizziness), or recent travel abroad.`
  },
  {
    id: "toothache-001",
    topic: "Toothache",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/toothache/",
    keywords: ["toothache", "tooth pain", "tooth ache", "dental pain", "sore tooth"],
    content: `For toothache:
1. Take paracetamol or ibuprofen to manage pain — follow dosing instructions.
2. Rinse mouth with warm salt water to reduce inflammation.
3. Apply a cold compress to the outside of your cheek for 20 minutes.
4. Avoid very hot, cold, or sweet foods and drinks.
5. Clove oil applied to the affected area can provide temporary numbing relief.
6. Keep your head elevated when sleeping to reduce throbbing.
See a dentist as soon as possible — toothache rarely resolves on its own.
Go to emergency dentist or ER if: severe swelling in face or jaw, difficulty swallowing or breathing, high fever with tooth pain — these signs suggest a dental abscess which can be dangerous.`
  },
  {
    id: "backpain-001",
    topic: "Back pain",
    source: "NHS",
    sourceUrl: "https://www.nhs.uk/conditions/back-pain/",
    keywords: ["back pain", "lower back pain", "back ache", "backache", "spine pain", "lumbar pain"],
    content: `For back pain:
1. Stay as active as possible — bed rest for long periods worsens back pain.
2. Take paracetamol or ibuprofen to reduce pain and inflammation.
3. Apply a heat pack or ice pack (whichever feels better) for 15-20 minutes.
4. Gentle stretching and movement helps recovery.
5. Sleep on a medium-firm mattress. Try lying on your side with a pillow between knees.
6. Avoid lifting heavy objects — if you must lift, bend at the knees not the waist.
Seek medical care if: pain follows an injury, numbness or tingling in legs, weakness in legs, pain is severe and not improving after a few weeks, or loss of bladder/bowel control (go to ER immediately — this is a medical emergency).`
  }
]

module.exports = firstAidData